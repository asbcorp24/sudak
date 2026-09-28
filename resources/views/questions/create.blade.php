@extends('layouts.app')
@section('title','Задать вопрос — Зеленодольский судостроительный колледж')
@section('content')
<section class="page-hero compact feedback-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative"><span class="eyebrow">QUESTION / FEEDBACK</span><h1>Задать вопрос</h1><p>Напишите нам по вопросам поступления, обучения, расписания, документов, практики и работы колледжа.</p></div>
</section>
<section class="feedback-section"><div class="container-xxl">
 @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
 @if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach</div>@endif
 <div class="row g-4">
  <div class="col-lg-7">
   <form method="post" action="{{ route('questions.store') }}" class="feedback-form">@csrf
    <div class="row g-3">
     <div class="col-md-6"><label>Ваше имя *</label><input class="form-control" name="name" value="{{ old('name') }}" required></div>
     <div class="col-md-6"><label>Тема</label><input class="form-control" name="subject" value="{{ old('subject') }}" placeholder="Например: поступление"></div>
     <div class="col-md-6"><label>Email</label><input type="email" class="form-control" name="email" value="{{ old('email') }}"></div>
     <div class="col-md-6"><label>Телефон</label><input class="form-control" name="phone" value="{{ old('phone') }}"></div>
     <div class="col-12"><label>Ваш вопрос *</label><textarea class="form-control" rows="8" name="question" required>{{ old('question') }}</textarea></div>
     <div class="col-12"><label class="check"><input type="checkbox" name="consent" value="1" required> Я согласен(а) на обработку персональных данных.</label></div>
     <div class="col-12"><button class="btn-tech">Отправить вопрос</button></div>
    </div>
   </form>
  </div>
  <div class="col-lg-5">
   <div class="feedback-contact-card h-100">
    <span class="eyebrow">КОНТАКТЫ</span>
    <h2>Зеленодольский судостроительный колледж</h2>
    <p class="text-secondary">422542, Республика Татарстан, г. Зеленодольск, ул. Гастелло, 4</p>
    <p><a href="tel:+78437142617">+7 (84371) 4-26-17</a></p>
    <p><a href="mailto:GAPOU.ZSK@tatar.ru">GAPOU.ZSK@tatar.ru</a></p>
    <a class="btn-ghost" href="{{ route('contacts.index') }}">Все контакты и карта →</a>
   </div>
  </div>
 </div>
</div></section>
@endsection