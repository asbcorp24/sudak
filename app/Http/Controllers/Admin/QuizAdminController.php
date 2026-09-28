<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;

class QuizAdminController extends Controller
{
    public function index()
    {
        return view('admin.quizzes.index',[
            'quizzes'=>Quiz::withCount('attempts')->latest()->get(),
            'attempts'=>QuizAttempt::with('quiz')->latest('completed_at')->take(150)->get(),
        ]);
    }

    public function store(Request $request)
    {
        return $this->save($request,new Quiz());
    }

    public function update(Request $request,Quiz $quiz)
    {
        return $this->save($request,$quiz);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return back()->with('ok','Викторина удалена');
    }

    private function save(Request $request,Quiz $quiz)
    {
        $data=$request->validate([
            'title'=>['required','string','max:220'],
            'description'=>['nullable','string','max:5000'],
            'pass_score'=>['required','integer','min:1','max:100'],
            'questions_json'=>['required','json'],
            'is_published'=>['nullable','boolean'],
        ]);

        $questions=json_decode($data['questions_json'],true);
        if(!is_array($questions)||!count($questions)){
            return back()->withErrors(['questions_json'=>'Добавьте хотя бы один вопрос.'])->withInput();
        }
        foreach($questions as $i=>$q){
            if(empty($q['question'])||empty($q['options'])||!is_array($q['options'])||!array_key_exists('correct',$q)){
                return back()->withErrors(['questions_json'=>'Ошибка в вопросе №'.($i+1).'. Нужны question, options и correct.'])->withInput();
            }
            if(!array_key_exists((string)$q['correct'],$q['options'])){
                return back()->withErrors(['questions_json'=>'В вопросе №'.($i+1).' правильный ответ отсутствует среди options.'])->withInput();
            }
        }

        $quiz->fill([
            'title'=>$data['title'],
            'description'=>$data['description']??null,
            'pass_score'=>$data['pass_score'],
            'questions_json'=>$questions,
            'is_published'=>$request->boolean('is_published'),
        ])->save();

        return back()->with('ok','Викторина сохранена');
    }
}
