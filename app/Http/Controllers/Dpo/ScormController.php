<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoGroup;
use App\Models\DpoLessonProgress;
use App\Models\DpoScormAttempt;
use App\Models\DpoScormPackage;
use App\Models\DpoScormValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScormController extends Controller
{
    public function launch(Request $request,DpoScormPackage $package)
    {
        abort_unless($package->is_active,404);

        $group=DpoGroup::findOrFail($request->integer('group'));
        $this->authorizeGroup($request,$group);

        $lesson=$package->lesson()->with('module')->firstOrFail();
        abort_unless($lesson->module->program_id===$group->program_id,403);

        $user=$request->user();

        $attempt=DpoScormAttempt::where([
            'package_id'=>$package->id,
            'group_id'=>$group->id,
            'user_id'=>$user->id,
        ])->orderByDesc('attempt_no')->first();

        $finished=$attempt && (
            in_array($attempt->lesson_status,['completed','passed','failed'],true)
            || $attempt->completion_status==='completed'
        );

        if(!$attempt || ($request->boolean('restart') && $finished)){
            $next=(int)DpoScormAttempt::where([
                'package_id'=>$package->id,
                'group_id'=>$group->id,
                'user_id'=>$user->id,
            ])->max('attempt_no')+1;

            if($package->max_attempts && $next>$package->max_attempts){
                return redirect()->route('dpo.lessons.show',[$group,$lesson])
                    ->withErrors(['scorm'=>'Достигнуто максимальное количество попыток.']);
            }

            $attempt=DpoScormAttempt::create([
                'package_id'=>$package->id,
                'group_id'=>$group->id,
                'user_id'=>$user->id,
                'attempt_no'=>$next,
                'lesson_status'=>$package->scorm_version==='1.2'?'not attempted':null,
                'completion_status'=>$package->scorm_version==='2004'?'not attempted':null,
                'success_status'=>$package->scorm_version==='2004'?'unknown':null,
                'started_at'=>now(),
                'last_accessed_at'=>now(),
            ]);
        }else{
            $attempt->update(['last_accessed_at'=>now()]);
        }

        $values=$attempt->values()->pluck('value','key')->all();

        if($package->scorm_version==='1.2'){
            $values=array_merge([
                'cmi.core.student_id'=>(string)$user->id,
                'cmi.core.student_name'=>$user->name,
                'cmi.core.lesson_status'=>$attempt->lesson_status ?: 'not attempted',
                'cmi.core.lesson_location'=>$attempt->location ?: '',
                'cmi.suspend_data'=>$attempt->suspend_data ?: '',
                'cmi.core.score.raw'=>$attempt->score_raw!==null?(string)$attempt->score_raw:'',
                'cmi.core.entry'=>$attempt->location || $attempt->suspend_data ? 'resume' : 'ab-initio',
            ],$values);
        }else{
            $values=array_merge([
                'cmi.learner_id'=>(string)$user->id,
                'cmi.learner_name'=>$user->name,
                'cmi.completion_status'=>$attempt->completion_status ?: 'not attempted',
                'cmi.success_status'=>$attempt->success_status ?: 'unknown',
                'cmi.location'=>$attempt->location ?: '',
                'cmi.suspend_data'=>$attempt->suspend_data ?: '',
                'cmi.score.raw'=>$attempt->score_raw!==null?(string)$attempt->score_raw:'',
                'cmi.score.scaled'=>$attempt->score_scaled!==null?(string)$attempt->score_scaled:'',
                'cmi.entry'=>$attempt->location || $attempt->suspend_data ? 'resume' : 'ab-initio',
            ],$values);
        }

        DpoLessonProgress::updateOrCreate(
            ['lesson_id'=>$lesson->id,'group_id'=>$group->id,'user_id'=>$user->id],
            ['status'=>'in_progress','started_at'=>now(),'last_seen_at'=>now()]
        );

        $launchUrl='/storage/'.trim($package->storage_path,'/').'/'.ltrim($package->launch_path,'/');

        return view('dpo.scorm-player',compact('package','attempt','group','lesson','values','launchUrl'));
    }

    public function runtime(Request $request,DpoScormAttempt $attempt)
    {
        abort_unless(($request->user()->is_admin && $request->user()->canAdmin('dpo')) || $attempt->user_id===$request->user()->id,403);

        $data=$request->validate([
            'values'=>['nullable','array','max:500'],
            'values.*'=>['nullable'],
            'finish'=>['nullable','boolean'],
        ]);

        $values=$data['values']??[];

        DB::transaction(function() use($attempt,$values,$data){
            foreach($values as $key=>$value){
                if(!is_string($key) || mb_strlen($key)>191) continue;
                if(is_array($value) || is_object($value)) continue;

                $string=(string)($value??'');
                if(mb_strlen($string)>200000) $string=mb_substr($string,0,200000);

                DpoScormValue::updateOrCreate(
                    ['attempt_id'=>$attempt->id,'key'=>$key],
                    ['value'=>$string]
                );
            }

            $package=$attempt->package;

            if($package->scorm_version==='1.2'){
                $attempt->lesson_status=$values['cmi.core.lesson_status']??$attempt->lesson_status;
                $attempt->score_raw=$this->numeric($values['cmi.core.score.raw']??null,$attempt->score_raw);
                $attempt->location=$values['cmi.core.lesson_location']??$attempt->location;
                $attempt->suspend_data=$values['cmi.suspend_data']??$attempt->suspend_data;
                $attempt->session_time=$values['cmi.core.session_time']??$attempt->session_time;
                $attempt->total_time=$values['cmi.core.total_time']??$attempt->total_time;
            }else{
                $attempt->completion_status=$values['cmi.completion_status']??$attempt->completion_status;
                $attempt->success_status=$values['cmi.success_status']??$attempt->success_status;
                $attempt->score_raw=$this->numeric($values['cmi.score.raw']??null,$attempt->score_raw);
                $attempt->score_scaled=$this->numeric($values['cmi.score.scaled']??null,$attempt->score_scaled);
                $attempt->location=$values['cmi.location']??$attempt->location;
                $attempt->suspend_data=$values['cmi.suspend_data']??$attempt->suspend_data;
                $attempt->session_time=$values['cmi.session_time']??$attempt->session_time;
                $attempt->total_time=$values['cmi.total_time']??$attempt->total_time;
            }

            $attempt->last_accessed_at=now();

            $completed=in_array($attempt->lesson_status,['completed','passed'],true)
                || $attempt->completion_status==='completed';

            if($completed && !$attempt->completed_at) $attempt->completed_at=now();
            if(!empty($data['finish']) && !$attempt->completed_at && $completed) $attempt->completed_at=now();

            $attempt->save();

            if($completed){
                DpoLessonProgress::updateOrCreate(
                    [
                        'lesson_id'=>$package->lesson_id,
                        'group_id'=>$attempt->group_id,
                        'user_id'=>$attempt->user_id,
                    ],
                    [
                        'status'=>'completed',
                        'started_at'=>$attempt->started_at ?: now(),
                        'completed_at'=>now(),
                        'last_seen_at'=>now(),
                    ]
                );
            }
        });

        return response()->json(['ok'=>true]);
    }

    private function authorizeGroup(Request $request,DpoGroup $group): void
    {
        if($request->user()->is_admin && $request->user()->canAdmin('dpo')) return;
        abort_unless(
            $group->enrollments()->where('user_id',$request->user()->id)->where('status','active')->exists(),
            403
        );
    }

    private function numeric($value,$fallback)
    {
        return is_numeric($value)?$value:$fallback;
    }
}
