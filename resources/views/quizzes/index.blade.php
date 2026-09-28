@extends('layouts.app')
@section('title','Викторины — Зеленодольский судостроительный колледж')
@section('description','Инженерные и образовательные викторины Зеленодольского судостроительного колледжа.')
@section('content')
<section class="page-hero compact activity-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">QUIZ LAB</span>
  <h1>Викторины</h1>
  <p>Проверь знания, набери проходной балл и получи персональный онлайн-сертификат.</p>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="quiz-grid">
   @forelse($quizzes as $quiz)
    <article class="quiz-card">
     <span class="eyebrow">{{ count($quiz->questions_json ?? []) }} вопросов · проходной {{ $quiz->pass_score }}%</span>
     <h2>{{ $quiz->title }}</h2>
     <p>{{ $quiz->description }}</p>
     <a class="btn-tech" href="{{ route('quizzes.show',$quiz) }}">Начать викторину</a>
    </article>
   @empty
    <div class="feedback-empty">Доступных викторин пока нет.</div>
   @endforelse
  </div>
 </div>
</section>
@endsection