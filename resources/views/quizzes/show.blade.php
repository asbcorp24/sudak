@extends('layouts.app')
@section('title',$quiz->title.' — Викторина')
@section('content')
<section class="page-hero compact activity-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative"><span class="eyebrow">QUIZ</span><h1>{{ $quiz->title }}</h1><p>{{ $quiz->description }}</p></div>
</section>
<section class="section-space"><div class="container-xxl">
 @if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach</div>@endif
 <form method="post" action="{{ route('quizzes.submit',$quiz) }}" class="quiz-shell">@csrf
  <div class="feedback-form mb-4">
   <div class="row g-3">
    <div class="col-md-6"><label>Ваше имя *</label><input class="form-control" name="participant_name" value="{{ old('participant_name') }}" required></div>
    <div class="col-md-6"><label>Email</label><input type="email" class="form-control" name="participant_email" value="{{ old('participant_email') }}"></div>
   </div>
  </div>
  @foreach($quiz->questions_json ?? [] as $i=>$q)
   <article class="quiz-question">
    <span class="eyebrow">ВОПРОС {{ str_pad($i+1,2,'0',STR_PAD_LEFT) }}</span>
    <h3>{{ $q['question'] ?? '' }}</h3>
    <div class="quiz-options">
     @foreach(($q['options'] ?? []) as $key=>$label)
      @php($optionId='quiz-'.$quiz->id.'-q'.$i.'-'.preg_replace('/[^a-zA-Z0-9_-]/','-',strval($key)))
      <label class="quiz-option" for="{{ $optionId }}">
       <input id="{{ $optionId }}" type="radio" name="answers[{{ $i }}]" value="{{ $key }}" @checked((string)old('answers.'.$i)===(string)$key) required>
       <span class="quiz-option-mark" aria-hidden="true">{{ strtoupper($key) }}</span>
       <span class="quiz-option-text">{{ $label }}</span>
       <span class="quiz-option-check" aria-hidden="true">✓</span>
      </label>
     @endforeach
    </div>
   </article>
  @endforeach
  <div class="text-center"><button class="btn-tech">Завершить викторину</button></div>
 </form>
</div></section>
@endsection