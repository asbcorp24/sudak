<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DpoAnnouncement;
use App\Models\DpoAssignment;
use App\Models\DpoEnrollment;
use App\Models\DpoGroup;
use App\Models\DpoLesson;
use App\Models\DpoLessonResource;
use App\Models\DpoModule;
use App\Models\DpoProfile;
use App\Models\DpoProgram;
use App\Models\DpoScheduleEntry;
use App\Models\DpoScormPackage;
use App\Models\DpoSubmission;
use App\Models\MediaAsset;
use App\Models\User;
use App\Services\DpoScormImporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'submissionsToReview'=>DpoSubmission::where('status','submitted')->count(),
        ]);
    }

    public function storeProgram(Request $request)
    {
        $data=$this->programData($request);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        DpoProgram::create($data);
        return back()->with('ok','Программа ДПО создана');
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

    public function updateProgram(Request $request,DpoProgram $program)
    {
        $data=$this->programData($request,$program->id);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $program->update($data);
        return back()->with('ok','Программа обновлена');
    }

    public function destroyProgram(DpoProgram $program)
    {
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

    public function showGroup(DpoGroup $group)
    {
        $group->load([
            'program.modules.lessons',
            'enrollments.user.dpoProfile',
            'scheduleEntries'=>fn($q)=>$q->with(['lesson','teacher'])->orderBy('starts_at'),
        ]);

        $submissions=DpoSubmission::with(['assignment.lesson','user','media'])
            ->where('group_id',$group->id)
            ->latest('submitted_at')
            ->get();

        return view('admin.dpo.group',[
            'group'=>$group,
            'users'=>User::with('dpoProfile')
                ->whereHas('dpoProfile',fn($q)=>$q->where('is_active',true))
                ->orderBy('name')->get(),
            'teachers'=>User::whereHas('dpoProfile',fn($q)=>$q->where('role','teacher')->where('is_active',true))->orderBy('name')->get(),
            'submissions'=>$submissions,
        ]);
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

        return redirect()->route('admin.dpo.lessons.edit',$lesson)->with('ok','Урок создан');
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

        $group->scheduleEntries()->create($data);
        return back()->with('ok','Занятие добавлено в расписание');
    }

    public function destroySchedule(DpoScheduleEntry $entry)
    {
        $entry->delete();
        return back()->with('ok','Занятие удалено из расписания');
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

        return back()->with('ok','Результат проверки сохранён');
    }

    private function programData(Request $request,?int $id=null): array
    {
        $data=$request->validate([
            'code'=>['nullable','string','max:80'],
            'title'=>['required','string','max:255'],
            'slug'=>['nullable','string','max:191',Rule::unique('dpo_programs','slug')->ignore($id)],
            'hours'=>['required','integer','min:0','max:100000'],
            'description'=>['nullable','string','max:20000'],
            'learning_outcomes'=>['nullable','string','max:20000'],
            'sort'=>['nullable','integer','min:0','max:9999'],
            'is_published'=>['nullable','boolean'],
        ]);
        $data['sort']=(int)$request->input('sort',0);
        $data['is_published']=$request->boolean('is_published');
        return $data;
    }
}
