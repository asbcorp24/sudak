<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionAdminController extends Controller
{
    public function index(Request $request)
    {
        $query=Question::latest();
        if($status=$request->string('status')->toString()){
            if(in_array($status,['new','processing','answered','closed'],true))$query->where('status',$status);
        }
        return view('admin.questions.index',[
            'questions'=>$query->paginate(30)->withQueryString(),
            'activeStatus'=>$request->input('status'),
        ]);
    }

    public function update(Request $request,Question $question)
    {
        $data=$request->validate([
            'status'=>['required','in:new,processing,answered,closed'],
            'answer'=>['nullable','string','max:20000'],
        ]);
        if($data['status']==='answered' && blank($data['answer']??null)){
            return back()->withErrors(['answer'=>'Для статуса «Отвечено» укажите текст ответа.']);
        }
        $data['answered_at']=$data['status']==='answered'?now():$question->answered_at;
        $question->update($data);
        return back()->with('ok','Обращение обновлено');
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return back()->with('ok','Обращение удалено');
    }
}
