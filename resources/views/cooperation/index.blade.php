@extends('layouts.app')
@section('title','Сотрудничество — Зеленодольский судостроительный колледж')
@section('description','Партнёрство, практика, работодатели, совместные проекты и участие специалистов в развитии Зеленодольского судостроительного колледжа.')
@section('content')
<section class="page-hero compact feedback-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">COOPERATION / INDUSTRY</span>
  <h1>Сотрудничество</h1>
  <p>Партнёрства с предприятиями, работодателями, экспертами и образовательными организациями. Совместные проекты, практика и профессиональная подготовка студентов.</p>
 </div>
</section>

<section class="feedback-section">
 <div class="container-xxl">
  @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
  @if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $error)<div>{{ $error }}</div>@endforeach</div>@endif

  <div class="cooperation-layout">
   <aside class="cooperation-tabs">
    <a href="#offers">Предложения</a>
    <a href="#partners">Партнёры</a>
    <a href="#projects">Совместные проекты</a>
    <a href="#form">Предложить сотрудничество</a>
   </aside>

   <div class="cooperation-main">
    <section id="offers" class="cooperation-section">
     <span class="eyebrow">01 / ПРЕДЛОЖЕНИЯ</span>
     <h2>Варианты сотрудничества</h2>
     <div class="cooperation-actions">
      <article><span>01</span><h3>Стать партнёром</h3><p>Совместные образовательные, инженерные и производственные инициативы.</p><a class="btn-tech" href="{{ route('cooperation.index',['role'=>'partner']) }}#form">Подать заявку</a></article>
      <article><span>02</span><h3>Стать работодателем</h3><p>Практика, стажировки, экскурсии, реальные производственные задачи и трудоустройство.</p><a class="btn-tech" href="{{ route('cooperation.index',['role'=>'employer']) }}#form">Подать заявку</a></article>
      <article><span>03</span><h3>Стать экспертом или преподавателем</h3><p>Передавайте отраслевой опыт студентам и участвуйте в образовательных проектах.</p><a class="btn-tech" href="{{ route('cooperation.index',['role'=>'teacher']) }}#form">Подать заявку</a></article>
     </div>

     @if($proposals->count())
      <div class="cooperation-cards">
       @foreach($proposals as $item)
        @php($cover=$item->getMedia('cover')->first())
        <article class="cooperation-card">
         @if($cover)<img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}">@endif
         <div><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">Подробнее ↗</a>@endif</div>
        </article>
       @endforeach
      </div>
     @endif
    </section>

    <section id="partners" class="cooperation-section">
     <span class="eyebrow">02 / ПАРТНЁРЫ</span><h2>С кем мы работаем</h2>
     <div class="cooperation-cards">
      @forelse($partners as $item)
       @php($cover=$item->getMedia('cover')->first())
       <article class="cooperation-card">
        @if($cover)<img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}">@endif
        <div><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">Сайт партнёра ↗</a>@endif</div>
       </article>
      @empty
       <div class="feedback-empty">Информация о партнёрах добавляется администрацией колледжа.</div>
      @endforelse
     </div>
    </section>

    <section id="projects" class="cooperation-section">
     <span class="eyebrow">03 / ПРОЕКТЫ</span><h2>Совместные проекты</h2>
     <div class="cooperation-cards">
      @forelse($projects as $item)
       @php($cover=$item->getMedia('cover')->first())
       <article class="cooperation-card">
        @if($cover)<img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}">@endif
        <div><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">О проекте ↗</a>@endif</div>
       </article>
      @empty
       <div class="feedback-empty">Опубликованных совместных проектов пока нет.</div>
      @endforelse
     </div>
    </section>

    <section id="form" class="cooperation-section">
     <span class="eyebrow">04 / ЗАЯВКА</span><h2>Предложить сотрудничество</h2>
     <form class="feedback-form" method="post" action="{{ route('cooperation.store') }}">@csrf
      <div class="row g-3">
       <div class="col-md-6"><label>Формат сотрудничества</label><select class="form-select" name="role">
        @foreach(['partner'=>'Партнёрство','employer'=>'Работодатель / практика','curator'=>'Эксперт / куратор','teacher'=>'Преподаватель','other'=>'Другое предложение'] as $key=>$label)
         <option value="{{ $key }}" @selected(old('role',request('role','partner'))===$key)>{{ $label }}</option>
        @endforeach
       </select></div>
       <div class="col-md-6"><label>ФИО *</label><input class="form-control" name="name" value="{{ old('name') }}" required></div>
       <div class="col-md-6"><label>Организация</label><input class="form-control" name="organization" value="{{ old('organization') }}"></div>
       <div class="col-md-6"><label>Сайт</label><input type="url" class="form-control" name="website" value="{{ old('website') }}"></div>
       <div class="col-md-6"><label>Телефон</label><input class="form-control" name="phone" value="{{ old('phone') }}"></div>
       <div class="col-md-6"><label>Email</label><input type="email" class="form-control" name="email" value="{{ old('email') }}"></div>
       <div class="col-12"><label>Расскажите о предложении</label><textarea class="form-control" rows="6" name="message">{{ old('message') }}</textarea></div>
       <div class="col-12 text-end"><button class="btn-tech">Отправить заявку</button></div>
      </div>
     </form>
    </section>
   </div>
  </div>
 </div>
</section>
@endsection