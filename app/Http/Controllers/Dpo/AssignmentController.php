<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoAssignment;
use App\Models\DpoGroup;
use App\Models\DpoSubmission;
use App\Models\MediaAsset;
use App\Services\MediaImageProcessor;
use App\Services\StorageQuota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AssignmentController extends Controller
{
    public function review(Request $request,DpoGroup $group,DpoSubmission $submission)
    {
        $user=$request->user();
        abort_unless($submission->group_id===$group->id,404);
        abort_unless(
            $user->is_admin || $group->enrollments()->where('user_id',$user->id)->where('role','teacher')->where('status','active')->exists(),
            403
        );

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
            'reviewed_by'=>$user->id,
            'reviewed_at'=>now(),
        ]);

        return back()->with('ok','Проверка домашней работы сохранена');
    }

    public function submit(Request $request,DpoGroup $group,DpoAssignment $assignment,MediaImageProcessor $images)
    {
        $user=$request->user();
        abort_unless(
            $user->is_admin || $group->enrollments()->where('user_id',$user->id)->where('role','student')->where('status','active')->exists(),
            403
        );
        abort_unless($assignment->lesson->module()->where('program_id',$group->program_id)->exists(),404);

        $data=$request->validate([
            'answer_text'=>['nullable','string','max:50000'],
            'answer_file'=>['nullable','file','max:51200'],
        ]);

        if(!$assignment->allow_text) $data['answer_text']=null;
        if(!$assignment->allow_file && $request->hasFile('answer_file')){
            throw ValidationException::withMessages(['answer_file'=>'Для этого задания загрузка файла отключена.']);
        }

        if(empty(trim((string)($data['answer_text']??''))) && !$request->hasFile('answer_file')){
            throw ValidationException::withMessages(['answer_text'=>'Добавьте текст ответа или файл.']);
        }

        $mediaId=null;
        if($request->hasFile('answer_file')){
            $file=$request->file('answer_file');
            if(!StorageQuota::canStore((int)$file->getSize())){
                throw ValidationException::withMessages(['answer_file'=>'Недостаточно свободного места в хранилище.']);
            }

            $ext=strtolower($file->getClientOriginalExtension());
            $imageExt=['jpg','jpeg','png','webp'];

            if(in_array($ext,$imageExt,true)){
                $stored=$images->store($file);
                $type='image';
            }else{
                $allowed=['pdf','doc','docx','xls','xlsx','ppt','pptx','txt','rtf','csv','zip','rar','7z'];
                if(!in_array($ext,$allowed,true)){
                    throw ValidationException::withMessages(['answer_file'=>'Недопустимый формат файла ответа.']);
                }
                $dir='media/dpo/submissions/'.now()->format('Y/m');
                $name=(string)Str::uuid().'.'.$ext;
                $path=$file->storeAs($dir,$name,'public');
                $stored=['path'=>$path,'mime_type'=>$file->getMimeType(),'width'=>null,'height'=>null,'size'=>Storage::disk('public')->size($path)];
                $type='document';
            }

            $asset=MediaAsset::create([
                'name'=>pathinfo($file->getClientOriginalName(),PATHINFO_FILENAME),
                'original_name'=>$file->getClientOriginalName(),
                'disk'=>'public','path'=>$stored['path'],'mime_type'=>$stored['mime_type'],
                'extension'=>$ext,'type'=>$type,'size'=>$stored['size'],
                'width'=>$stored['width'],'height'=>$stored['height'],
                'title'=>$file->getClientOriginalName(),
            ]);
            $mediaId=$asset->id;
        }

        $submission=DpoSubmission::firstOrNew([
            'assignment_id'=>$assignment->id,
            'group_id'=>$group->id,
            'user_id'=>$user->id,
        ]);

        if($mediaId && $submission->media_asset_id && $submission->media_asset_id!==$mediaId){
            // Старый файл остаётся в медиатеке, чтобы не удалять потенциально используемый объект.
        }

        $submission->fill([
            'answer_text'=>$data['answer_text']??null,
            'media_asset_id'=>$mediaId ?: $submission->media_asset_id,
            'status'=>'submitted',
            'score'=>null,
            'feedback'=>null,
            'reviewed_by'=>null,
            'submitted_at'=>now(),
            'reviewed_at'=>null,
        ])->save();

        return back()->with('ok','Домашняя работа отправлена преподавателю');
    }
}
