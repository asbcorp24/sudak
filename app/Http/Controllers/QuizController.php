<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuizController extends Controller
{
    public function index()
    {
        return view('quizzes.index',['quizzes'=>Quiz::where('is_published',true)->latest()->get()]);
    }

    public function show(Quiz $quiz)
    {
        abort_unless($quiz->is_published,404);
        return view('quizzes.show',compact('quiz'));
    }

    public function submit(Request $request,Quiz $quiz)
    {
        abort_unless($quiz->is_published,404);
        $questions=$quiz->questions_json?:[];
        abort_if(!count($questions),422,'В викторине нет вопросов.');

        $data=$request->validate([
            'participant_name'=>['required','string','max:180'],
            'participant_email'=>['nullable','email','max:255'],
            'answers'=>['required','array'],
        ]);

        $correct=0;
        foreach($questions as $i=>$q){
            $expected=(string)($q['correct']??'');
            $given=(string)($data['answers'][$i]??'');
            if($expected!=='' && hash_equals($expected,$given))$correct++;
        }

        $score=(int)round(($correct/count($questions))*100);
        $passed=$score >= $quiz->pass_score;

        $attempt=QuizAttempt::create([
            'quiz_id'=>$quiz->id,
            'participant_name'=>$data['participant_name'],
            'participant_email'=>$data['participant_email']??null,
            'score'=>$score,
            'passed'=>$passed,
            'answers_json'=>$data['answers'],
            'result_token'=>Str::random(40),
            'certificate_code'=>$passed?strtoupper(Str::random(12)):null,
            'completed_at'=>now(),
        ]);

        return redirect()->route('quizzes.result',$attempt->result_token);
    }

    public function result(string $token)
    {
        $attempt=QuizAttempt::with('quiz')->where('result_token',$token)->firstOrFail();
        return view('quizzes.result',compact('attempt'));
    }

    public function certificate(string $code)
    {
        $attempt=QuizAttempt::with('quiz')->where('certificate_code',$code)->where('passed',true)->firstOrFail();
        return view('quizzes.certificate',compact('attempt'));
    }
}
