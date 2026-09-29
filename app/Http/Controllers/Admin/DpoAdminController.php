<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DpoAnnouncement;
use App\Models\DpoApplication;
use App\Models\DpoAttestation;
use App\Models\DpoIssuedDocument;
use App\Models\DpoAssignment;
use App\Models\DpoAttendance;
use App\Models\DpoEnrollment;
use App\Models\DpoGroup;
use App\Models\DpoLesson;
use App\Models\DpoLessonResource;
use App\Models\DpoModule;
use App\Models\DpoProfile;
use App\Models\DpoProgram;
use App\Models\DpoScheduleEntry;
use App\Models\DpoScormPackage;
use App\Models\DpoScormAttempt;
use App\Models\DpoSubmission;
use App\Models\MediaAsset;
use App\Models\User;
use App\Services\DpoScormImporter;
use App\Services\DpoCompletionService;
use App\Services\DpoExcelService;
use App\Services\StudentNotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class DpoAdminController extends Controller
{
    public function index()
    {
        return view('admin.dpo.index',[
            'programs'=>DpoProgram::withCount(['groups','modules'])->orderBy('sort')->orderBy('title')->get(),
            'students'=>DpoProfile::where('role','student')->count(),
            'teachers'=>DpoProfile::where('role','teacher')->count(),
            'activeGroups'=>DpoGroup::where('status','active')->count(),
            'importGroups'=>DpoGroup::with('program')->whereIn('status',['draft','active'])->orderByDesc('starts_on')->get(),
            'submissionsToReview'=>DpoSubmission::where('status','submitted')->count(),
            'pendingApplications'=>DpoApplication::where('status','pending')->count(),
            'issuedDocuments'=>DpoIssuedDocument::where('status','issued')->count(),
        ]);
    }

    public function importStudents(Request $request,DpoExcelService $excel)
    {
        $data=$request->validate([
            'file'=>['required','file','max:20480'],
            'group_id'=>['nullable','exists:dpo_groups,id'],
        ]);

        $file=$data['file'];
        $rows=$excel->read($file->getRealPath(),strtolower($file->getClientOriginalExtension()));
        if(!$rows) return back()->withErrors(['file'=>'В файле не найдено строк слушателей. Проверьте заголовки: ФИО, Email, Телефон, Организация, Должность, Группа.']);

        $defaultGroup=!empty($data['group_id'])?DpoGroup::find($data['group_id']):null;
        $created=0; $existing=0; $enrolled=0; $errors=[]; $credentials=[];

        foreach($rows as $line=>$row){
            try{
                $group=$defaultGroup;
                if(!$group && !empty($row['group'])){
                    $group=DpoGroup::where('name',$row['group'])->first();
                }
                if(!$group) throw new \RuntimeException('не найдена учебная группа');

                $email=trim((string)($row['email']??''));
                if(!$email){
                    $base=Str::slug($row['name']??'student','.');
                    if(!$base) $base='student';
                    $email=$base.'.'.Str::lower(Str::random(5)).'@dpo.local';
                }

                $user=User::where('email',$email)->first();
                $password=null;
                if(!$user){
                    $password=trim((string)($row['password']??'')) ?: Str::random(10);
                    $user=User::create([
                        'name'=>$row['name'],
                        'email'=>$email,
                        'password'=>Hash::make($password),
                        'is_admin'=>false,
                    ]);
                    $created++;
                }else{
                    $existing++;
                    if(trim((string)$user->name)==='') $user->update(['name'=>$row['name']]);
                }

                DpoProfile::updateOrCreate(
                    ['user_id'=>$user->id],
                    [
                        'role'=>'student',
                        'phone'=>$row['phone']??null,
                        'organization'=>$row['organization']??null,
                        'position'=>$row['position']??null,
                        'is_active'=>true,
                    ]
                );

                DpoEnrollment::updateOrCreate(
                    ['group_id'=>$group->id,'user_id'=>$user->id,'role'=>'student'],
                    ['status'=>'active','enrolled_at'=>now(),'completed_at'=>null]
                );
                $enrolled++;

                if($password) $credentials[]=[
                    'name'=>$user->name,'email'=>$email,'password'=>$password,'group'=>$group->name,
                ];
            }catch(\Throwable $e){
                $errors[]='Строка '.($line+2).': '.$e->getMessage();
            }
        }

        return back()->with('ok',"Импорт завершён: создано {$created}, существующих {$existing}, зачислено {$enrolled}.")
            ->with('dpo_import_credentials',$credentials)
            ->with('dpo_import_errors',$errors);
    }

    public function groupReportExcel(DpoGroup $group,DpoCompletionService $completion,DpoExcelService $excel)
    {
        $group->load(['program','enrollments.user']);
        $rows=[];
        foreach($group->enrollments->where('role','student') as $enrollment){
            $m=$completion->metrics($enrollment);
            $rows[]=[
                $enrollment->user->name,
                $enrollment->user->email,
                $m['progress_percent'],
                $m['attendance_percent'],
                $m['homework_percent']??'',
                $m['scorm_percent']??'',
                $m['final_score']??'',
                $m['ready']?'Выполнены':'Не выполнены',
                $enrollment->status,
            ];
        }
        $xml=$excel->spreadsheetXml('Ведомость',[
            'ФИО','Email','Уроки, %','Посещаемость, %','ДЗ, %','SCORM, %','Итог, %','Критерии','Статус'
        ],$rows);
        $name='dpo_'.$group->id.'_'.now()->format('Ymd').'.xls';
        return response($xml,200,[
            'Content-Type'=>'application/vnd.ms-excel; charset=UTF-8',
            'Content-Disposition'=>'attachment; filename="'.$name.'"',
        ]);
    }

    public function groupReportPrint(DpoGroup $group,DpoCompletionService $completion)
    {
        $group->load(['program','enrollments.user']);
        $rows=$group->enrollments->where('role','student')->map(function($enrollment) use($completion){
            return ['enrollment'=>$enrollment,'metrics'=>$completion->metrics($enrollment)];
        });
        return view('admin.dpo.group-report-print',compact('group','rows'));
    }

    public function scormAnalytics(DpoGroup $group)
    {
        $group->load('program');
        $attempts=DpoScormAttempt::with(['user','package.lesson','values'])
            ->where('group_id',$group->id)
            ->latest('last_accessed_at')
            ->paginate(100);
        return view('admin.dpo.scorm-analytics',compact('group','attempts'));
    }

    public function storeProgram(Request $request)
    {
        $data=$this->programData($request);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $program=DpoProgram::create($data);
        return redirect()->route('admin.dpo.builder',$program)->with('ok','Программа создана. Теперь соберите структуру курса.');
    }

    public function showProgram(DpoProgram $program)
    {
        $program->load([
            'groups'=>fn($q)=>$q->orderByDesc('starts_on')->orderBy('name'),
            'modules'=>fn($q)=>$q->orderBy('sort')->orderBy('id'),
            'modules.lessons'=>fn($q)=>$q->orderBy('sort')->orderBy('id'),
        ]);

        return view('admin.dpo.program',[
            'program'=>$program,
        ]);
    }

    public function builder(Request $request,DpoProgram $program)
    {
        $program->load([
            'groups'=>fn($q)=>$q->orderByDesc('starts_on')->orderBy('name'),
            'modules'=>fn($q)=>$q->orderBy('sort')->orderBy('id'),
            'modules.lessons'=>fn($q)=>$q->orderBy('sort')->orderBy('id'),
            'modules.lessons.resources.media',
            'modules.lessons.assignments.groups',
            'modules.lessons.assignments.submissions',
            'modules.lessons.scormPackages'=>fn($q)=>$q->withCount('attempts')->orderBy('id'),
        ]);

        $lessonId=(int)$request->query('lesson',0);
        $selectedLesson=$program->modules->flatMap->lessons->firstWhere('id',$lessonId)
            ?: $program->modules->flatMap->lessons->first();

        return view('admin.dpo.builder',[
            'program'=>$program,
            'selectedLesson'=>$selectedLesson,
            'media'=>MediaAsset::latest()->take(200)->get(),
        ]);
    }

    public function updateModule(Request $request,DpoModule $module)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'is_published'=>['nullable','boolean'],
        ]);
        $data['is_published']=$request->boolean('is_published');
        $module->update($data);
        return back()->with('ok','Модуль сохранён');
    }

    public function destroyModule(DpoModule $module)
    {
        $program=$module->program;
        $module->delete();
        return redirect()->route('admin.dpo.builder',$program)->with('ok','Модуль удалён');
    }

    public function reorderBuilder(Request $request,DpoProgram $program)
    {
        $data=$request->validate([
            'modules'=>['required','array'],
            'modules.*.id'=>['required','integer'],
            'modules.*.lessons'=>['present','array'],
            'modules.*.lessons.*'=>['integer'],
        ]);

        $moduleIds=$program->modules()->pluck('id')->map(fn($id)=>(int)$id)->all();
        $submittedModuleIds=collect($data['modules'])->pluck('id')->map(fn($id)=>(int)$id)->all();

        if(count($moduleIds)!==count($submittedModuleIds) || array_diff($moduleIds,$submittedModuleIds) || array_diff($submittedModuleIds,$moduleIds)){
            return response()->json(['message'=>'Структура курса изменилась. Обновите страницу.'],422);
        }

        $lessonIds=DpoLesson::whereIn('module_id',$moduleIds)->pluck('id')->map(fn($id)=>(int)$id)->all();
        $submittedLessonIds=collect($data['modules'])->flatMap(fn($module)=>$module['lessons'])->map(fn($id)=>(int)$id)->all();

        if(count($lessonIds)!==count($submittedLessonIds) || array_diff($lessonIds,$submittedLessonIds) || array_diff($submittedLessonIds,$lessonIds)){
            return response()->json(['message'=>'Список уроков изменился. Обновите страницу.'],422);
        }

        DB::transaction(function() use($data){
            foreach($data['modules'] as $moduleIndex=>$moduleData){
                DpoModule::whereKey($moduleData['id'])->update(['sort'=>($moduleIndex+1)*10]);
                foreach($moduleData['lessons'] as $lessonIndex=>$lessonId){
                    DpoLesson::whereKey($lessonId)->update([
                        'module_id'=>$moduleData['id'],
                        'sort'=>($lessonIndex+1)*10,
                    ]);
                }
            }
        });

        return response()->json(['ok'=>true]);
    }

    public function updateProgram(Request $request,DpoProgram $program)
    {
        $data=$this->programData($request,$program->id);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $program->update($data);
        return back()->with('ok','Программа обновлена');
    }

    public function destroyProgram(DpoProgram $program)
    {
        if($program->issuedDocuments()->exists()){
            return back()->withErrors(['program'=>'Нельзя удалить программу, по которой уже выданы документы. Переведите программу в архивный режим, сняв её с публикации.']);
        }
        $program->delete();
        return redirect()->route('admin.dpo.index')->with('ok','Программа удалена');
    }

    public function storeGroup(Request $request,DpoProgram $program)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'starts_on'=>['nullable','date'],
            'ends_on'=>['nullable','date','after_or_equal:starts_on'],
            'status'=>['required','in:draft,active,completed,archived'],
            'description'=>['nullable','string','max:5000'],
        ]);
        $program->groups()->create($data);
        return back()->with('ok','Группа создана');
    }

    public function showGroup(DpoGroup $group,DpoCompletionService $completion)
    {
        $group->load([
            'program.modules.lessons',
            'enrollments.user.dpoProfile',
            'enrollments.attestation.document',
            'scheduleEntries'=>fn($q)=>$q->with(['lesson','teacher','attendance'])->orderBy('starts_at'),
        ]);

        $completionMetrics=$group->enrollments
            ->where('role','student')
            ->mapWithKeys(fn($enrollment)=>[$enrollment->id=>$completion->metrics($enrollment)]);

        $submissions=DpoSubmission::with(['assignment.lesson','user','media'])
            ->where('group_id',$group->id)
            ->latest('submitted_at')
            ->get();

        $scormAttempts=DpoScormAttempt::with(['package.lesson','user'])
            ->where('group_id',$group->id)
            ->latest('last_accessed_at')
            ->get();

        return view('admin.dpo.group',[
            'group'=>$group,
            'users'=>User::with('dpoProfile')
                ->whereHas('dpoProfile',fn($q)=>$q->where('is_active',true))
                ->orderBy('name')->get(),
            'teachers'=>User::whereHas('dpoProfile',fn($q)=>$q->where('role','teacher')->where('is_active',true))->orderBy('name')->get(),
            'submissions'=>$submissions,
            'scormAttempts'=>$scormAttempts,
            'attendanceSummary'=>DpoAttendance::query()
                ->selectRaw("user_id, COUNT(*) as marked_count, SUM(CASE WHEN status IN ('present','late') THEN 1 ELSE 0 END) as attended_count, SUM(CASE WHEN status='absent' THEN 1 ELSE 0 END) as absent_count, SUM(CASE WHEN status='excused' THEN 1 ELSE 0 END) as excused_count")
                ->whereHas('scheduleEntry',fn($q)=>$q->where('group_id',$group->id))
                ->groupBy('user_id')
                ->get()
                ->keyBy('user_id'),
            'completionMetrics'=>$completionMetrics,
        ]);
    }

    public function journal(DpoGroup $group)
    {
        $group->load([
            'program.modules.lessons'=>fn($q)=>$q->where('is_published',true),
            'enrollments.user',
            'scheduleEntries',
        ]);

        $students=$group->enrollments
            ->where('role','student')
            ->where('status','active')
            ->sortBy(fn($enrollment)=>mb_strtolower($enrollment->user->name))
            ->values();

        $studentIds=$students->pluck('user_id');
        $lessonIds=$group->program->modules->flatMap->lessons->pluck('id');
        $totalLessons=$lessonIds->count();

        $attendance=DpoAttendance::query()
            ->selectRaw("user_id, COUNT(*) as marked_count, SUM(CASE WHEN status IN ('present','late') THEN 1 ELSE 0 END) as attended_count, SUM(CASE WHEN status='absent' THEN 1 ELSE 0 END) as absent_count, SUM(CASE WHEN status='excused' THEN 1 ELSE 0 END) as excused_count")
            ->whereHas('scheduleEntry',fn($q)=>$q->where('group_id',$group->id))
            ->whereIn('user_id',$studentIds)
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $progress=\App\Models\DpoLessonProgress::query()
            ->selectRaw("user_id, SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_count")
            ->where('group_id',$group->id)
            ->whereIn('user_id',$studentIds)
            ->whereIn('lesson_id',$lessonIds)
            ->groupBy('user_id')
            ->get()
            ->keyBy('user_id');

        $submissions=DpoSubmission::with('assignment')
            ->where('group_id',$group->id)
            ->whereIn('user_id',$studentIds)
            ->where('status','reviewed')
            ->get()
            ->groupBy('user_id');

        $scorm=DpoScormAttempt::with('package')
            ->where('group_id',$group->id)
            ->whereIn('user_id',$studentIds)
            ->orderBy('attempt_no')
            ->get()
            ->groupBy('user_id');

        $rows=$students->map(function($enrollment) use($attendance,$progress,$submissions,$scorm,$totalLessons){
            $userId=$enrollment->user_id;
            $a=$attendance->get($userId);
            $marked=(int)($a?->marked_count ?? 0);
            $attended=(int)($a?->attended_count ?? 0);

            $homework=$submissions->get($userId,collect());
            $homeworkMax=(float)$homework->sum(fn($submission)=>(float)$submission->assignment->max_score);
            $homeworkScore=(float)$homework->sum(fn($submission)=>(float)($submission->score ?? 0));

            $latestScorm=$scorm->get($userId,collect())
                ->groupBy('package_id')
                ->map(fn($attempts)=>$attempts->sortByDesc('attempt_no')->first());

            $scormPercents=$latestScorm->map(function($attempt){
                if($attempt->score_scaled!==null) return max(0,min(100,(float)$attempt->score_scaled*100));
                if($attempt->score_raw!==null && (float)$attempt->package->max_score>0){
                    return max(0,min(100,(float)$attempt->score_raw/(float)$attempt->package->max_score*100));
                }
                return null;
            })->filter(fn($value)=>$value!==null);

            $completed=(int)($progress->get($userId)?->completed_count ?? 0);

            return [
                'enrollment'=>$enrollment,
                'marked'=>$marked,
                'attended'=>$attended,
                'absent'=>(int)($a?->absent_count ?? 0),
                'excused'=>(int)($a?->excused_count ?? 0),
                'attendance_percent'=>$marked?round($attended/$marked*100):0,
                'completed_lessons'=>$completed,
                'total_lessons'=>$totalLessons,
                'progress_percent'=>$totalLessons?round($completed/$totalLessons*100):0,
                'homework_count'=>$homework->count(),
                'homework_percent'=>$homeworkMax>0?round($homeworkScore/$homeworkMax*100):null,
                'scorm_count'=>$latestScorm->count(),
                'scorm_percent'=>$scormPercents->count()?round($scormPercents->avg()):null,
            ];
        });

        return view('admin.dpo.journal',compact('group','rows','totalLessons'));
    }

    public function updateGroup(Request $request,DpoGroup $group)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'starts_on'=>['nullable','date'],
            'ends_on'=>['nullable','date','after_or_equal:starts_on'],
            'status'=>['required','in:draft,active,completed,archived'],
            'description'=>['nullable','string','max:5000'],
        ]);
        $group->update($data);
        return back()->with('ok','Группа обновлена');
    }

    public function users(Request $request)
    {
        $query=User::with('dpoProfile')
            ->whereHas('dpoProfile')
            ->orderBy('name');

        if($role=$request->string('role')->toString()){
            if(in_array($role,['student','teacher','manager'],true)){
                $query->whereHas('dpoProfile',fn($q)=>$q->where('role',$role));
            }
        }

        if($search=trim($request->string('q')->toString())){
            $query->where(function($q) use($search){
                $q->where('name','like','%'.$search.'%')->orWhere('email','like','%'.$search.'%');
            });
        }

        return view('admin.dpo.users',[
            'users'=>$query->paginate(40)->withQueryString(),
            'role'=>$role??null,
        ]);
    }

    public function updateUser(Request $request,User $user)
    {
        abort_unless($user->dpoProfile,404);

        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255',Rule::unique('users','email')->ignore($user->id)],
            'role'=>['required','in:student,teacher,manager'],
            'phone'=>['nullable','string','max:80'],
            'organization'=>['nullable','string','max:255'],
            'position'=>['nullable','string','max:255'],
            'password'=>['nullable','string','min:6','max:255'],
            'is_active'=>['nullable','boolean'],
        ]);

        $user->update([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>!empty($data['password'])?Hash::make($data['password']):$user->password,
        ]);

        $user->dpoProfile->update([
            'role'=>$data['role'],
            'phone'=>$data['phone']??null,
            'organization'=>$data['organization']??null,
            'position'=>$data['position']??null,
            'is_active'=>$request->boolean('is_active'),
        ]);

        return back()->with('ok','Пользователь ДПО обновлён');
    }

    public function storeUser(Request $request)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255','unique:users,email'],
            'password'=>['required','string','min:6','max:255'],
            'role'=>['required','in:student,teacher,manager'],
            'phone'=>['nullable','string','max:80'],
            'organization'=>['nullable','string','max:255'],
            'position'=>['nullable','string','max:255'],
        ]);

        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'is_admin'=>false,
        ]);

        DpoProfile::create([
            'user_id'=>$user->id,
            'role'=>$data['role'],
            'phone'=>$data['phone']??null,
            'organization'=>$data['organization']??null,
            'position'=>$data['position']??null,
            'is_active'=>true,
        ]);

        return back()->with('ok','Пользователь ДПО создан');
    }

    public function enroll(Request $request,DpoGroup $group)
    {
        $data=$request->validate([
            'user_id'=>['required','exists:users,id'],
            'role'=>['required','in:student,teacher'],
        ]);

        $profile=DpoProfile::where('user_id',$data['user_id'])->where('is_active',true)->first();
        if(!$profile){
            throw ValidationException::withMessages(['user_id'=>'У пользователя нет активного профиля ДПО.']);
        }

        DpoEnrollment::updateOrCreate(
            ['group_id'=>$group->id,'user_id'=>$data['user_id'],'role'=>$data['role']],
            ['status'=>'active','enrolled_at'=>now(),'completed_at'=>null]
        );

        return back()->with('ok','Пользователь добавлен в группу');
    }

    public function destroyEnrollment(DpoEnrollment $enrollment)
    {
        $enrollment->delete();
        return back()->with('ok','Пользователь удалён из группы');
    }

    public function storeModule(Request $request,DpoProgram $program)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'sort'=>['nullable','integer','min:0','max:9999'],
        ]);
        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=true;
        $program->modules()->create($data);
        return back()->with('ok','Учебный модуль добавлен');
    }

    public function storeLesson(Request $request,DpoModule $module)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'duration_minutes'=>['nullable','integer','min:0','max:10000'],
            'completion_mode'=>['required','in:manual,view,resources,scorm'],
            'sort'=>['nullable','integer','min:0','max:9999'],
        ]);
        $data['duration_minutes']=(int)($data['duration_minutes']??0);
        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=true;
        $lesson=$module->lessons()->create($data);

        if($request->boolean('builder')){
            return redirect()->route('admin.dpo.builder',['program'=>$module->program_id,'lesson'=>$lesson->id])->with('ok','Урок создан');
        }

        return redirect()->route('admin.dpo.lessons.edit',$lesson)->with('ok','Урок создан');
    }

    public function duplicateLesson(DpoLesson $lesson)
    {
        $lesson->load(['resources','assignments']);
        $copy=$lesson->replicate();
        $copy->title=$lesson->title.' — копия';
        $copy->sort=$lesson->module->lessons()->max('sort')+10;
        $copy->is_published=false;
        $copy->save();

        foreach($lesson->resources as $resource){
            $resourceCopy=$resource->replicate();
            $resourceCopy->lesson_id=$copy->id;
            $resourceCopy->save();
        }

        foreach($lesson->assignments as $assignment){
            $assignmentCopy=$assignment->replicate();
            $assignmentCopy->lesson_id=$copy->id;
            $assignmentCopy->is_published=false;
            $assignmentCopy->save();

            foreach($lesson->module->program->groups as $group){
                $assignmentCopy->groups()->attach($group->id);
            }
        }

        return redirect()->route('admin.dpo.builder',[
            'program'=>$lesson->module->program_id,
            'lesson'=>$copy->id,
        ])->with('ok','Урок скопирован. SCORM-пакеты не копируются — загрузите отдельный ZIP при необходимости.');
    }

    public function editLesson(DpoLesson $lesson)
    {
        $lesson->load([
            'module.program.groups',
            'resources.media',
            'assignments.groups',
            'assignments.submissions',
            'scormPackages'=>fn($q)=>$q->withCount('attempts')->latest(),
        ]);

        return view('admin.dpo.lesson',[
            'lesson'=>$lesson,
            'media'=>MediaAsset::latest()->get(),
        ]);
    }

    public function updateLesson(Request $request,DpoLesson $lesson)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'content'=>['nullable','string'],
            'duration_minutes'=>['nullable','integer','min:0','max:10000'],
            'completion_mode'=>['required','in:manual,view,resources,scorm'],
            'sort'=>['nullable','integer','min:0','max:9999'],
            'is_published'=>['nullable','boolean'],
        ]);
        $data['duration_minutes']=(int)($data['duration_minutes']??0);
        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=$request->boolean('is_published');
        $lesson->update($data);

        return back()->with('ok','Урок сохранён');
    }

    public function destroyLesson(DpoLesson $lesson)
    {
        foreach($lesson->scormPackages as $package){
            Storage::disk('public')->deleteDirectory($package->storage_path);
        }
        $program=$lesson->module->program;
        $lesson->delete();

        if(request()->boolean('builder')){
            return redirect()->route('admin.dpo.builder',$program)->with('ok','Урок удалён');
        }

        return redirect()->route('admin.dpo.programs.show',$program)->with('ok','Урок удалён');
    }

    public function storeResource(Request $request,DpoLesson $lesson)
    {
        $data=$request->validate([
            'type'=>['required','in:file,video,link'],
            'title'=>['required','string','max:255'],
            'media_asset_id'=>['nullable','exists:media_assets,id'],
            'url'=>['nullable','url','max:2000'],
            'description'=>['nullable','string','max:5000'],
            'sort'=>['nullable','integer','min:0','max:9999'],
            'is_required'=>['nullable','boolean'],
        ]);

        if($data['type']==='file' && empty($data['media_asset_id'])){
            throw ValidationException::withMessages(['media_asset_id'=>'Для типа «Файл» выберите файл из медиатеки.']);
        }
        if(in_array($data['type'],['video','link'],true) && empty($data['url'])){
            throw ValidationException::withMessages(['url'=>'Укажите ссылку.']);
        }

        $data['media_asset_id']=$data['type']==='file'?($data['media_asset_id']??null):null;
        $data['url']=$data['type']==='file'?null:($data['url']??null);
        $data['sort']=(int)($data['sort']??0);
        $data['is_required']=$request->boolean('is_required');

        $lesson->resources()->create($data);
        return back()->with('ok','Материал добавлен в урок');
    }

    public function destroyResource(DpoLessonResource $resource)
    {
        $resource->delete();
        return back()->with('ok','Материал удалён из урока');
    }

    public function storeAssignment(Request $request,DpoLesson $lesson)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string'],
            'max_score'=>['required','numeric','min:0','max:10000'],
            'allow_text'=>['nullable','boolean'],
            'allow_file'=>['nullable','boolean'],
        ]);
        $data['allow_text']=$request->boolean('allow_text');
        $data['allow_file']=$request->boolean('allow_file');
        $data['is_published']=true;

        $assignment=$lesson->assignments()->create($data);

        foreach($lesson->module->program->groups as $group){
            $assignment->groups()->attach($group->id);
        }

        $users=User::whereIn('id',DpoEnrollment::whereIn('group_id',$lesson->module->program->groups->pluck('id'))->where('role','student')->where('status','active')->pluck('user_id'))->get();
        app(StudentNotificationService::class)->notifyUsers($users,'dpo_assignment','Новое задание',$assignment->title,route('dpo.dashboard'),'dpo-assignment-'.$assignment->id);

        return back()->with('ok','Домашнее задание добавлено');
    }

    public function updateAssignmentGroup(Request $request,DpoAssignment $assignment,DpoGroup $group)
    {
        abort_unless($assignment->lesson->module->program_id===$group->program_id,404);

        $data=$request->validate([
            'available_from'=>['nullable','date'],
            'due_at'=>['nullable','date','after_or_equal:available_from'],
        ]);

        $assignment->groups()->syncWithoutDetaching([
            $group->id=>[
                'available_from'=>$data['available_from']??null,
                'due_at'=>$data['due_at']??null,
            ]
        ]);

        return back()->with('ok','Срок задания для группы сохранён');
    }

    public function storeSchedule(Request $request,DpoGroup $group)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'lesson_id'=>[
                'nullable',
                Rule::exists('dpo_lessons','id')->where(function($q) use($group){
                    $q->whereIn('module_id',DpoModule::where('program_id',$group->program_id)->pluck('id'));
                })
            ],
            'teacher_user_id'=>['nullable','exists:users,id'],
            'starts_at'=>['required','date'],
            'ends_at'=>['required','date','after:starts_at'],
            'room'=>['nullable','string','max:255'],
            'online_url'=>['nullable','url','max:2000'],
            'notes'=>['nullable','string','max:5000'],
        ]);

        $entry=$group->scheduleEntries()->create($data);
        $users=User::whereIn('id',$group->enrollments()->where('role','student')->where('status','active')->pluck('user_id'))->get();
        app(StudentNotificationService::class)->notifyUsers($users,'dpo_schedule','Новое занятие',$entry->title.' · '.$entry->starts_at->format('d.m.Y H:i'),route('dpo.calendar'),'dpo-schedule-'.$entry->id);
        return back()->with('ok','Занятие добавлено в расписание');
    }

    public function destroySchedule(DpoScheduleEntry $entry)
    {
        $entry->delete();
        return back()->with('ok','Занятие удалено из расписания');
    }

    public function attendance(DpoScheduleEntry $entry)
    {
        $entry->load(['group.program','lesson','teacher','attendance.user','attendance.marker']);

        $students=$entry->group->enrollments()
            ->with('user.dpoProfile')
            ->where('role','student')
            ->where('status','active')
            ->orderBy('id')
            ->get()
            ->sortBy(fn($enrollment)=>mb_strtolower($enrollment->user->name))
            ->values();

        return view('admin.dpo.attendance',[
            'entry'=>$entry,
            'students'=>$students,
            'attendance'=>$entry->attendance->keyBy('user_id'),
        ]);
    }

    public function updateAttendance(Request $request,DpoScheduleEntry $entry)
    {
        $studentIds=$entry->group->enrollments()
            ->where('role','student')
            ->where('status','active')
            ->pluck('user_id')
            ->map(fn($id)=>(int)$id);

        $data=$request->validate([
            'status'=>['required','array'],
            'status.*'=>['required','in:present,absent,excused,late'],
            'note'=>['nullable','array'],
            'note.*'=>['nullable','string','max:500'],
        ]);

        foreach($studentIds as $userId){
            $status=$data['status'][$userId]??null;
            if(!$status) continue;

            DpoAttendance::updateOrCreate(
                ['schedule_entry_id'=>$entry->id,'user_id'=>$userId],
                [
                    'status'=>$status,
                    'note'=>trim((string)($data['note'][$userId]??''))?:null,
                    'marked_by'=>$request->user()->id,
                    'marked_at'=>now(),
                ]
            );
        }

        foreach($entry->group->enrollments()->where('role','student')->where('status','active')->get() as $enrollment){
            app(DpoCompletionService::class)->sync($enrollment);
        }

        return back()->with('ok','Посещаемость сохранена');
    }

    public function storeAnnouncement(Request $request,DpoGroup $group)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'body'=>['nullable','string'],
        ]);

        DpoAnnouncement::create([
            'group_id'=>$group->id,
            'program_id'=>$group->program_id,
            'title'=>$data['title'],
            'body'=>$data['body']??null,
            'published_at'=>now(),
        ]);

        return back()->with('ok','Объявление опубликовано');
    }

    public function uploadScorm(Request $request,DpoLesson $lesson,DpoScormImporter $importer)
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'package'=>['required','file','max:204800'],
            'max_score'=>['nullable','numeric','min:0','max:10000'],
            'max_attempts'=>['nullable','integer','min:1','max:1000'],
        ]);

        try{
            $meta=$importer->import($data['package']);
        }catch(\Throwable $e){
            return back()->withErrors(['package'=>'Не удалось импортировать SCORM: '.$e->getMessage()]);
        }

        $lesson->scormPackages()->create([
            'title'=>$data['title'],
            'scorm_version'=>$meta['scorm_version'],
            'manifest_identifier'=>$meta['manifest_identifier'],
            'launch_path'=>$meta['launch_path'],
            'storage_path'=>$meta['storage_path'],
            'package_hash'=>$meta['package_hash'],
            'max_score'=>$data['max_score']??100,
            'max_attempts'=>$data['max_attempts']??null,
            'is_active'=>true,
        ]);

        if($lesson->completion_mode!=='scorm'){
            $lesson->update(['completion_mode'=>'scorm']);
        }

        return back()->with('ok','SCORM-пакет загружен и готов к запуску');
    }

    public function destroyScorm(DpoScormPackage $package)
    {
        Storage::disk('public')->deleteDirectory($package->storage_path);
        $package->delete();
        return back()->with('ok','SCORM-пакет удалён');
    }

    public function reviewSubmission(Request $request,DpoSubmission $submission)
    {
        $data=$request->validate([
            'status'=>['required','in:reviewed,returned'],
            'score'=>['nullable','numeric','min:0'],
            'feedback'=>['nullable','string','max:10000'],
        ]);

        if(isset($data['score']) && $data['score']>$submission->assignment->max_score){
            throw ValidationException::withMessages(['score'=>'Оценка не может быть выше максимального балла задания.']);
        }

        $submission->update([
            'status'=>$data['status'],
            'score'=>$data['score']??null,
            'feedback'=>$data['feedback']??null,
            'reviewed_by'=>$request->user()->id,
            'reviewed_at'=>now(),
        ]);

        app(StudentNotificationService::class)->notifyUsers(
            collect([$submission->user]),
            'dpo_homework',
            $data['status']==='reviewed'?'Работа проверена':'Работа возвращена',
            $submission->assignment->title.($data['score']!==null?' · '.$data['score'].' балл.':''),
            route('dpo.dashboard'),
            'dpo-review-'.$submission->id.'-'.$submission->updated_at->timestamp
        );

        $enrollment=DpoEnrollment::where('group_id',$submission->group_id)->where('user_id',$submission->user_id)->where('role','student')->where('status','active')->first();
        if($enrollment) app(DpoCompletionService::class)->sync($enrollment);

        return back()->with('ok','Результат проверки сохранён');
    }

    public function applications(Request $request)
    {
        $query=DpoApplication::with(['program','group','user','processor'])->latest();
        if($status=$request->string('status')->toString()){
            if(in_array($status,['pending','approved','rejected','enrolled','completed','archived'],true)) $query->where('status',$status);
        }
        if($search=trim($request->string('q')->toString())){
            $query->where(fn($q)=>$q->where('name','like','%'.$search.'%')->orWhere('email','like','%'.$search.'%')->orWhere('phone','like','%'.$search.'%'));
        }
        return view('admin.dpo.applications',[
            'applications'=>$query->paginate(40)->withQueryString(),
            'groups'=>DpoGroup::with('program')->whereIn('status',['draft','active'])->orderByDesc('starts_on')->get(),
            'status'=>$status??null,
        ]);
    }

    public function approveApplication(Request $request,DpoApplication $application)
    {
        abort_unless(in_array($application->status,['pending','approved'],true),422);

        $data=$request->validate([
            'group_id'=>['required','exists:dpo_groups,id'],
            'initial_password'=>['nullable','string','min:6','max:255'],
            'admin_note'=>['nullable','string','max:3000'],
        ]);

        $group=DpoGroup::findOrFail($data['group_id']);
        if($group->program_id!==$application->program_id){
            throw ValidationException::withMessages(['group_id'=>'Выбранная группа относится к другой программе.']);
        }

        $generatedPassword=null;

        DB::transaction(function() use($request,$application,$group,$data,&$generatedPassword){
            $user=User::where('email',$application->email)->first();

            if(!$user){
                $generatedPassword=$data['initial_password'] ?: Str::random(10);
                $user=User::create([
                    'name'=>$application->name,
                    'email'=>$application->email,
                    'password'=>Hash::make($generatedPassword),
                    'is_admin'=>false,
                ]);
            }

            $profile=DpoProfile::firstOrNew(['user_id'=>$user->id]);
            if(!$profile->exists) $profile->role='student';
            $profile->phone=$application->phone;
            $profile->organization=$application->organization;
            $profile->is_active=true;
            $profile->save();

            DpoEnrollment::updateOrCreate(
                ['group_id'=>$group->id,'user_id'=>$user->id,'role'=>'student'],
                ['status'=>'active','enrolled_at'=>now(),'completed_at'=>null]
            );

            $application->update([
                'group_id'=>$group->id,
                'user_id'=>$user->id,
                'status'=>'enrolled',
                'admin_note'=>$data['admin_note']??null,
                'processed_by'=>$request->user()->id,
                'processed_at'=>now(),
                'enrolled_at'=>now(),
            ]);
        });

        $response=back()->with('ok','Заявка подтверждена, слушатель зачислен в группу.');
        if($generatedPassword){
            $response->with('dpo_credentials',[
                'name'=>$application->name,
                'email'=>$application->email,
                'password'=>$generatedPassword,
            ]);
        }
        return $response;
    }

    public function rejectApplication(Request $request,DpoApplication $application)
    {
        $data=$request->validate(['admin_note'=>['nullable','string','max:3000']]);
        $application->update([
            'status'=>'rejected',
            'admin_note'=>$data['admin_note']??null,
            'processed_by'=>$request->user()->id,
            'processed_at'=>now(),
        ]);
        return back()->with('ok','Заявка отклонена.');
    }

    public function attest(Request $request,DpoEnrollment $enrollment,DpoCompletionService $completion)
    {
        abort_unless($enrollment->role==='student',404);
        $data=$request->validate([
            'status'=>['required','in:passed,failed'],
            'result_text'=>['nullable','string','max:255'],
            'notes'=>['nullable','string','max:3000'],
        ]);
        $metrics=$completion->metrics($enrollment);

        if($data['status']==='passed' && !$metrics['ready']){
            throw ValidationException::withMessages(['status'=>'Нельзя завершить аттестацию: не выполнены установленные критерии программы.']);
        }

        $attestation=DpoAttestation::updateOrCreate(
            ['enrollment_id'=>$enrollment->id],
            [
                'progress_percent'=>$metrics['progress_percent'],
                'attendance_percent'=>$metrics['attendance_percent'],
                'homework_percent'=>$metrics['homework_percent'],
                'scorm_percent'=>$metrics['scorm_percent'],
                'final_score'=>$metrics['final_score'],
                'status'=>$data['status'],
                'result_text'=>$data['result_text']??($data['status']==='passed'?'Зачтено':'Не зачтено'),
                'notes'=>$data['notes']??null,
                'assessed_by'=>$request->user()->id,
                'assessed_at'=>now(),
            ]
        );

        if($attestation->status==='passed'){
            $enrollment->update(['status'=>'completed','completed_at'=>now()]);
            DpoApplication::where('user_id',$enrollment->user_id)
                ->where('program_id',$enrollment->group->program_id)
                ->whereIn('status',['approved','enrolled'])
                ->update(['status'=>'completed']);

            if(!$enrollment->group->enrollments()->where('role','student')->where('status','active')->exists()){
                $enrollment->group->update(['status'=>'completed']);
            }
        }

        return back()->with('ok',$attestation->status==='passed'?'Аттестация пройдена. Можно выдать документ.':'Результат аттестации сохранён.');
    }

    public function issueDocument(Request $request,DpoAttestation $attestation)
    {
        $attestation->load('enrollment.group.program','enrollment.user','document');
        abort_unless($attestation->status==='passed',422);
        if($attestation->document) return back()->withErrors(['document'=>'Документ по этой аттестации уже выдан.']);

        $data=$request->validate([
            'series'=>['nullable','string','max:40'],
            'number'=>['nullable','string','max:80',Rule::unique('dpo_issued_documents','number')],
            'issued_at'=>['required','date'],
            'note'=>['nullable','string','max:3000'],
        ]);

        $enrollment=$attestation->enrollment;
        $program=$enrollment->group->program;
        $number=($data['number']??null) ?: 'ДПО-'.now()->format('Y').'-'.str_pad((string)$attestation->id,6,'0',STR_PAD_LEFT);

        $document=DpoIssuedDocument::create([
            'attestation_id'=>$attestation->id,
            'enrollment_id'=>$enrollment->id,
            'user_id'=>$enrollment->user_id,
            'program_id'=>$program->id,
            'group_id'=>$enrollment->group_id,
            'document_type'=>$program->document_type,
            'series'=>$data['series']??null,
            'number'=>$number,
            'issued_at'=>$data['issued_at'],
            'hours'=>$program->hours,
            'qualification'=>$program->qualification,
            'verification_code'=>Str::upper(Str::random(12)),
            'status'=>'issued',
            'note'=>$data['note']??null,
        ]);

        DpoApplication::where('user_id',$enrollment->user_id)
            ->where('program_id',$program->id)
            ->where('status','completed')
            ->update(['status'=>'archived']);

        $group=$enrollment->group;
        $hasActive=$group->enrollments()->where('role','student')->where('status','active')->exists();
        $missingDocuments=$group->enrollments()->where('role','student')->where('status','completed')->whereDoesntHave('issuedDocument')->exists();
        if(!$hasActive && !$missingDocuments){
            $group->update(['status'=>'archived']);
        }

        return back()->with('ok','Документ выдан. Код проверки: '.$document->verification_code);
    }

    public function documents(Request $request)
    {
        $query=DpoIssuedDocument::with(['user','program','group'])->latest('issued_at');
        if($search=trim($request->string('q')->toString())){
            $query->where(function($q) use($search){
                $q->where('number','like','%'.$search.'%')
                    ->orWhere('verification_code','like','%'.$search.'%')
                    ->orWhereHas('user',fn($u)=>$u->where('name','like','%'.$search.'%')->orWhere('email','like','%'.$search.'%'));
            });
        }
        return view('admin.dpo.documents',['documents'=>$query->paginate(50)->withQueryString()]);
    }

    public function archiveGroup(DpoGroup $group)
    {
        if($group->enrollments()->where('role','student')->where('status','active')->exists()){
            return back()->withErrors(['group'=>'В группе ещё есть активные слушатели. Сначала завершите их обучение.']);
        }
        $group->update(['status'=>'archived']);
        return back()->with('ok','Группа перенесена в архив.');
    }

    private function programData(Request $request,?int $id=null): array
    {
        $data=$request->validate([
            'code'=>['nullable','string','max:80'],
            'title'=>['required','string','max:255'],
            'slug'=>['nullable','string','max:191',Rule::unique('dpo_programs','slug')->ignore($id)],
            'hours'=>['required','integer','min:0','max:100000'],
            'qualification'=>['nullable','string','max:255'],
            'document_type'=>['nullable','string','max:255'],
            'description'=>['nullable','string','max:20000'],
            'learning_outcomes'=>['nullable','string','max:20000'],
            'sort'=>['nullable','integer','min:0','max:9999'],
            'is_published'=>['nullable','boolean'],
            'applications_open'=>['nullable','boolean'],
            'min_progress_percent'=>['nullable','integer','min:0','max:100'],
            'min_attendance_percent'=>['nullable','integer','min:0','max:100'],
            'min_homework_percent'=>['nullable','integer','min:0','max:100'],
            'min_scorm_percent'=>['nullable','integer','min:0','max:100'],
        ]);
        $data['sort']=(int)$request->input('sort',0);
        $data['is_published']=$request->boolean('is_published');
        $data['applications_open']=$request->boolean('applications_open');
        $data['document_type']=($data['document_type']??null) ?: 'Удостоверение о повышении квалификации';
        $data['min_progress_percent']=(int)$request->input('min_progress_percent',100);
        $data['min_attendance_percent']=(int)$request->input('min_attendance_percent',0);
        $data['min_homework_percent']=(int)$request->input('min_homework_percent',0);
        $data['min_scorm_percent']=(int)$request->input('min_scorm_percent',70);
        return $data;
    }
}
