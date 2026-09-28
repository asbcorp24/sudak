@extends('layouts.app')
@section('title','Результат — '.$attempt->quiz->title)
@section('content')
<section class="page-hero compact activity-hero">
 <div id="three-hero" class="three-layer" data-scene="{{ $attempt->passed ? 'quality' : 'blueprint' }}"></div>
 <div class="container-xxl position-relative text-center">
  <span class="eyebrow">QUIZ RESULT</span>
  <h1>{{ $attempt->score }}%</h1>
  <p>{{ $attempt->passed ? 'Поздравляем! Викторина пройдена.' : 'Проходной балл пока не набран.' }}</p>
  <p class="text-secondary">{{ $attempt->participant_name }} · {{ $attempt->quiz->title }} · проходной балл {{ $attempt->quiz->pass_score }}%</p>
  <div class="d-flex justify-content-center gap-3 flex-wrap mt-4">
   <a class="btn-ghost" href="{{ route('quizzes.show',$attempt->quiz) }}">Пройти ещё раз</a>
   @if($attempt->passed && $attempt->certificate_code)<a class="btn-tech" href="{{ route('quizzes.certificate',$attempt->certificate_code) }}">Открыть сертификат</a>@endif
  </div>
 </div>
</section>
@endsection