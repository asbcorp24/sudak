<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoApplication;
use App\Models\DpoIssuedDocument;
use App\Models\DpoProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PublicController extends Controller
{
    public function index()
    {
        $programs=DpoProgram::published()
            ->with(['groups'=>fn($q)=>$q->whereIn('status',['draft','active'])->orderBy('starts_on')])
            ->orderBy('sort')->orderBy('title')->get();

        return view('dpo-public.index',compact('programs'));
    }

    public function show(DpoProgram $program)
    {
        abort_unless($program->is_published,404);
        $program->load([
            'groups'=>fn($q)=>$q->whereIn('status',['draft','active'])->orderBy('starts_on'),
            'modules'=>fn($q)=>$q->where('is_published',true)->with(['lessons'=>fn($l)=>$l->where('is_published',true)->orderBy('sort')])->orderBy('sort'),
        ]);
        return view('dpo-public.show',compact('program'));
    }

    public function apply(Request $request,DpoProgram $program)
    {
        abort_unless($program->is_published && $program->applications_open,404);

        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255'],
            'phone'=>['required','string','max:80'],
            'birth_date'=>['nullable','date','before:today'],
            'education'=>['nullable','string','max:255'],
            'organization'=>['nullable','string','max:255'],
            'comment'=>['nullable','string','max:3000'],
            'consent'=>['accepted'],
        ]);

        $duplicate=DpoApplication::where('program_id',$program->id)
            ->where('email',$data['email'])
            ->whereIn('status',['pending','approved','enrolled'])
            ->first();

        if($duplicate){
            throw ValidationException::withMessages(['email'=>'Заявка на эту программу уже зарегистрирована.']);
        }

        $application=DpoApplication::create([
            'program_id'=>$program->id,
            'public_token'=>(string)Str::uuid(),
            'name'=>$data['name'],
            'email'=>$data['email'],
            'phone'=>$data['phone'],
            'birth_date'=>$data['birth_date']??null,
            'education'=>$data['education']??null,
            'organization'=>$data['organization']??null,
            'comment'=>$data['comment']??null,
            'status'=>'pending',
        ]);

        return redirect()->route('dpo.application.status',$application->public_token);
    }

    public function applicationStatus(string $token)
    {
        $application=DpoApplication::with(['program','group'])->where('public_token',$token)->firstOrFail();
        $document=$application->user_id
            ? DpoIssuedDocument::where('user_id',$application->user_id)->where('program_id',$application->program_id)->latest('issued_at')->first()
            : null;
        return view('dpo-public.application-status',compact('application','document'));
    }

    public function verifyDocument(string $code)
    {
        $document=DpoIssuedDocument::with(['user','program','group','attestation'])
            ->where('verification_code',$code)->firstOrFail();
        return view('dpo-public.document',compact('document'));
    }

    public function printDocument(string $code)
    {
        $document=DpoIssuedDocument::with(['user','program','group'])
            ->where('verification_code',$code)->where('status','issued')->firstOrFail();
        return view('dpo-public.document-print',compact('document'));
    }
}
