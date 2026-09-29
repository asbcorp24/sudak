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
            'quizzes'=>Quiz::withCount('attempts')->latest()->paginate(20),
            'attempts'=>QuizAttempt::with('quiz')->latest('completed_at')->take(50)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'title'=>['required','string','max:220'],
        ]);

        $quiz=Quiz::create([
            'title'=>$data['title'],
            'description'=>null,
            'pass_score'=>70,
            'questions_json'=>[
                [
                    'question'=>'Новый вопрос',
                    'options'=>[
                        'a'=>'Вариант ответа 1',
                        'b'=>'Вариант ответа 2',
                    ],
                    'correct'=>'a',
                ],
            ],
            'is_published'=>false,
        ]);

        return redirect()->route('admin.quizzes.builder',$quiz)->with('ok','Викторина создана. Добавьте вопросы и настройте публикацию.');
    }

    public function builder(Quiz $quiz)
    {
        $quiz->loadCount('attempts');

        return view('admin.quizzes.builder',[
            'quiz'=>$quiz,
            'recentAttempts'=>$quiz->attempts()->latest('completed_at')->take(10)->get(),
        ]);
    }

    public function update(Request $request,Quiz $quiz)
    {
        return $this->save($request,$quiz);
    }

    public function duplicate(Quiz $quiz)
    {
        $copy=$quiz->replicate(['is_published']);
        $copy->title=$quiz->title.' — копия';
        $copy->is_published=false;
        $copy->save();

        return redirect()->route('admin.quizzes.builder',$copy)->with('ok','Создана копия викторины.');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->route('admin.quizzes.index')->with('ok','Викторина и её результаты удалены');
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

        $normalized=[];
        foreach($questions as $i=>$q){
            $number=$i+1;
            $question=trim((string)($q['question']??''));
            $options=$q['options']??[];
            $correct=(string)($q['correct']??'');

            if($question===''){
                return back()->withErrors(['questions_json'=>'Заполните текст вопроса №'.$number.'.'])->withInput();
            }
            if(!is_array($options)||count($options)<2){
                return back()->withErrors(['questions_json'=>'В вопросе №'.$number.' должно быть минимум два варианта ответа.'])->withInput();
            }

            $cleanOptions=[];
            foreach($options as $key=>$label){
                $key=(string)$key;
                $label=trim((string)$label);
                if($label===''){
                    return back()->withErrors(['questions_json'=>'В вопросе №'.$number.' есть пустой вариант ответа.'])->withInput();
                }
                $cleanOptions[$key]=$label;
            }

            if(!array_key_exists($correct,$cleanOptions)){
                return back()->withErrors(['questions_json'=>'Выберите правильный ответ в вопросе №'.$number.'.'])->withInput();
            }

            $normalized[]=[
                'question'=>$question,
                'options'=>$cleanOptions,
                'correct'=>$correct,
            ];
        }

        $quiz->fill([
            'title'=>$data['title'],
            'description'=>$data['description']??null,
            'pass_score'=>$data['pass_score'],
            'questions_json'=>$normalized,
            'is_published'=>$request->boolean('is_published'),
        ])->save();

        return redirect()->route('admin.quizzes.builder',$quiz)->with('ok','Викторина сохранена');
    }
}
