@extends('layouts.app')
@section('title','Сотрудничество — Зеленодольский судостроительный колледж')
@section('description','Партнёрство, практика, работодатели, совместные проекты и участие специалистов в развитии Зеленодольского судостроительного колледжа.')
@section('content')
<section class="coop-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <div class="coop-hero-grid">
   <div class="coop-hero-copy">
    <span class="eyebrow">КОЛЛЕДЖ × ИНДУСТРИЯ</span>
    <h1>Создаём будущее<br><span>вместе с отраслью</span></h1>
    <p>Открыты для предприятий, работодателей, экспертов и образовательных организаций. Практика, реальные производственные задачи, совместные проекты и подготовка специалистов.</p>
    <div class="coop-hero-actions">
     <a class="btn-tech" href="#form">Предложить сотрудничество <b>→</b></a>
     <a class="coop-text-link" href="#partners">Наши партнёры ↓</a>
    </div>
   </div>
   <div class="coop-hero-panel">
    <span class="coop-panel-kicker">ФОРМАТЫ ВЗАИМОДЕЙСТВИЯ</span>
    <div><b>01</b><span>Практика и стажировки</span></div>
    <div><b>02</b><span>Совместные проекты</span></div>
    <div><b>03</b><span>Эксперты и наставники</span></div>
    <div><b>04</b><span>Трудоустройство</span></div>
    <small>ГАПОУ «Зеленодольский судостроительный колледж»</small>
   </div>
  </div>
 </div>
</section>

<section class="coop-page">
 <div class="container-xxl">
  @if(session('ok'))
   <div class="coop-success"><span>✓</span><div><b>Заявка отправлена</b><p>{{ session('ok') }}</p></div></div>
  @endif
  @if($errors->any())
   <div class="coop-errors"><b>Проверьте заполнение формы</b>@foreach($errors->all() as $error)<span>{{ $error }}</span>@endforeach</div>
  @endif

  <nav class="coop-nav" aria-label="Разделы страницы">
   <a href="#offers"><span>01</span> Возможности</a>
   <a href="#partners"><span>02</span> Партнёры</a>
   <a href="#projects"><span>03</span> Проекты</a>
   <a href="#form"><span>04</span> Связаться</a>
  </nav>

  <section id="offers" class="coop-section">
   <div class="coop-section-head">
    <div><span class="eyebrow">01 / ВОЗМОЖНОСТИ</span><h2>Как можем работать вместе</h2></div>
    <p>Выберите подходящий сценарий — форма ниже автоматически подставит нужный формат сотрудничества.</p>
   </div>

   <div class="coop-paths">
    <a class="coop-path" href="{{ route('cooperation.index',['role'=>'partner']) }}#form">
     <span class="coop-path-no">01</span>
     <div class="coop-path-icon">◇</div>
     <h3>Стать партнёром</h3>
     <p>Совместные образовательные, инженерные и производственные инициативы.</p>
     <b>Обсудить партнёрство <i>→</i></b>
    </a>
    <a class="coop-path" href="{{ route('cooperation.index',['role'=>'employer']) }}#form">
     <span class="coop-path-no">02</span>
     <div class="coop-path-icon">⌁</div>
     <h3>Стать работодателем</h3>
     <p>Практика, стажировки, экскурсии, реальные задачи и трудоустройство выпускников.</p>
     <b>Работать со студентами <i>→</i></b>
    </a>
    <a class="coop-path" href="{{ route('cooperation.index',['role'=>'teacher']) }}#form">
     <span class="coop-path-no">03</span>
     <div class="coop-path-icon">＋</div>
     <h3>Стать экспертом</h3>
     <p>Передавайте отраслевой опыт, проводите занятия и участвуйте в образовательных проектах.</p>
     <b>Поделиться опытом <i>→</i></b>
    </a>
   </div>

   @if($proposals->count())
    <div class="coop-content-grid coop-proposals">
     @foreach($proposals as $item)
      @php($cover=$item->getMedia('cover')->first())
      <article class="coop-content-card">
       @if($cover)<div class="coop-card-media"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}"></div>@endif
       <div class="coop-card-body"><span>ПРЕДЛОЖЕНИЕ</span><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">Подробнее <b>↗</b></a>@endif</div>
      </article>
     @endforeach
    </div>
   @endif
  </section>

  <section id="partners" class="coop-section coop-section-tinted">
   <div class="coop-section-head">
    <div><span class="eyebrow">02 / ПАРТНЁРЫ</span><h2>С кем мы работаем</h2></div>
    <p>Организации и предприятия, которые участвуют в профессиональной подготовке и развитии колледжа.</p>
   </div>
   <div class="coop-content-grid">
    @forelse($partners as $item)
     @php($cover=$item->getMedia('cover')->first())
     <article class="coop-content-card">
      @if($cover)<div class="coop-card-media"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}"></div>@else<div class="coop-card-placeholder"><span>{{ mb_substr($item->title,0,1) }}</span></div>@endif
      <div class="coop-card-body"><span>ПАРТНЁР</span><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">Сайт партнёра <b>↗</b></a>@endif</div>
     </article>
    @empty
     <div class="coop-empty"><span>02</span><div><b>Раздел наполняется</b><p>Информация о партнёрах добавляется администрацией колледжа.</p></div></div>
    @endforelse
   </div>
  </section>

  <section id="projects" class="coop-section">
   <div class="coop-section-head">
    <div><span class="eyebrow">03 / СОВМЕСТНЫЕ ПРОЕКТЫ</span><h2>От идеи до результата</h2></div>
    <p>Практические инициативы колледжа и партнёров, в которых студенты получают реальный отраслевой опыт.</p>
   </div>
   <div class="coop-content-grid">
    @forelse($projects as $item)
     @php($cover=$item->getMedia('cover')->first())
     <article class="coop-content-card">
      @if($cover)<div class="coop-card-media"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $item->title }}"></div>@else<div class="coop-card-placeholder project"><span>↗</span></div>@endif
      <div class="coop-card-body"><span>ПРОЕКТ</span><h3>{{ $item->title }}</h3><p>{{ $item->description }}</p>@if($item->url)<a target="_blank" rel="noopener" href="{{ $item->url }}">О проекте <b>↗</b></a>@endif</div>
     </article>
    @empty
     <div class="coop-empty"><span>03</span><div><b>Проекты скоро появятся</b><p>Опубликованных совместных проектов пока нет.</p></div></div>
    @endforelse
   </div>
  </section>

  <section id="form" class="coop-contact">
   <div class="coop-contact-info">
    <span class="eyebrow">04 / СВЯЗАТЬСЯ С НАМИ</span>
    <h2>Есть идея?<br>Давайте обсудим.</h2>
    <p>Опишите предложение и оставьте телефон или email. Мы передадим заявку ответственному сотруднику колледжа.</p>
    <div class="coop-direct">
     <span>ПРЯМОЙ КОНТАКТ</span>
     <a href="tel:+78437142617">+7 (84371) 4-26-17</a>
     <a href="mailto:GAPOU.ZSK@tatar.ru">GAPOU.ZSK@tatar.ru</a>
     <small>422542, Республика Татарстан,<br>г. Зеленодольск, ул. Гастелло, д. 4</small>
    </div>
   </div>

   <form class="coop-form" method="post" action="{{ route('cooperation.store') }}">
    @csrf
    <div class="coop-form-head"><div><span>ЗАЯВКА НА СОТРУДНИЧЕСТВО</span><h3>Расскажите о предложении</h3></div><b>04</b></div>

    <div class="coop-role-grid">
     @foreach(['partner'=>['Партнёрство','Совместные инициативы'],'employer'=>['Работодатель','Практика и трудоустройство'],'curator'=>['Эксперт / куратор','Наставничество и экспертиза'],'teacher'=>['Преподаватель','Участие в обучении'],'other'=>['Другое','Свободный формат']] as $key=>$role)
      <label class="coop-role">
       <input type="radio" name="role" value="{{ $key }}" @checked(old('role',request('role','partner'))===$key)>
       <span><b>{{ $role[0] }}</b><small>{{ $role[1] }}</small></span><i>✓</i>
      </label>
     @endforeach
    </div>

    <div class="coop-fields">
     <div class="coop-field"><label for="coop-name">ФИО <em>*</em></label><input id="coop-name" class="form-control" name="name" value="{{ old('name') }}" autocomplete="name" placeholder="Иванов Иван Иванович" required></div>
     <div class="coop-field"><label for="coop-org">Организация</label><input id="coop-org" class="form-control" name="organization" value="{{ old('organization') }}" autocomplete="organization" placeholder="Название организации"></div>
     <div class="coop-field"><label for="coop-phone">Телефон</label><input id="coop-phone" type="tel" class="form-control" name="phone" value="{{ old('phone') }}" autocomplete="tel" placeholder="+7 (___) ___-__-__"></div>
     <div class="coop-field"><label for="coop-email">Email</label><input id="coop-email" type="email" class="form-control" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="name@company.ru"></div>
     <div class="coop-field coop-field-wide"><label for="coop-site">Сайт</label><input id="coop-site" type="url" class="form-control" name="website" value="{{ old('website') }}" placeholder="https://"></div>
     <div class="coop-field coop-field-wide"><label for="coop-message">Предложение</label><textarea id="coop-message" class="form-control" rows="5" name="message" placeholder="Коротко опишите, как вы хотели бы сотрудничать с колледжем">{{ old('message') }}</textarea></div>
    </div>

    <div class="coop-form-footer">
     <p>Для отправки достаточно указать телефон или email для обратной связи.</p>
     <button class="btn-tech"><span>Отправить заявку</span><b>→</b></button>
    </div>
   </form>
  </section>
 </div>
</section>
@endsection
