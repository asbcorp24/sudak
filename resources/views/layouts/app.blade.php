<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>@yield('title',$siteSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж')</title>
<meta name="description" content="@yield('description',$siteSettings['seo_description'] ?? 'Зеленодольский судостроительный колледж — инженерное и цифровое СПО в Зеленодольске.')">
@if(!empty($siteSettings['seo_keywords']))<meta name="keywords" content="{{ $siteSettings['seo_keywords'] }}">@endif
<meta name="robots" content="{{ $siteSettings['seo_robots'] ?? 'index,follow' }}">
@if(!empty($siteSettings['seo_canonical']))<link rel="canonical" href="{{ $siteSettings['seo_canonical'] }}">@endif
<meta property="og:type" content="website">
<meta property="og:title" content="@yield('title',$siteSettings['seo_og_title'] ?: ($siteSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж'))">
<meta property="og:description" content="@yield('description',$siteSettings['seo_og_description'] ?: ($siteSettings['seo_description'] ?? 'Инженерное и цифровое СПО в Зеленодольске.'))">
@if(!empty($siteSettings['seo_og_image']))<meta property="og:image" content="{{ $siteSettings['seo_og_image'] }}">@endif
<meta name="twitter:card" content="{{ $siteSettings['seo_twitter_card'] ?? 'summary_large_image' }}">
@vite(['resources/css/app.css','resources/js/app.js'])
@stack('head')
</head>
<body>
<div class="noise"></div>
<header class="site-header">
 <div class="container-xxl d-flex align-items-center gap-3 py-3">
  <a class="brand" href="{{ route('home') }}"><span class="brand-mark">ЗСК</span><span><b>Зеленодольский</b><small>судостроительный колледж</small></span></a>
  <button class="nav-toggle ms-auto d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-label="Меню">☰</button>
  <nav class="main-nav d-none d-lg-flex ms-auto align-items-center gap-1">
   <a href="{{ route('specialties.index') }}">Специальности</a>
   <a href="{{ route('schedule.index') }}">Расписание</a>
   @foreach($mainMenu as $item)
    @if($item->childrenRecursive->count())
     <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>
      <div class="dropdown-menu tech-dropdown">@include('partials.menu-tree',['items'=>$item->childrenRecursive,'depth'=>0,'mobile'=>false])</div>
     </div>
    @else <a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a> @endif
   @endforeach

   <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#">Активности</a>
    <div class="dropdown-menu tech-dropdown">
     <a class="dropdown-item" href="{{ route('competitions.index') }}">Конкурсы и достижения</a>
     <a class="dropdown-item" href="{{ route('quizzes.index') }}">Викторины</a>
    </div>
   </div>

   <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#">Обратная связь</a>
    <div class="dropdown-menu tech-dropdown">
     <a class="dropdown-item" href="{{ route('contacts.index') }}">Контакты и карта</a>
     <a class="dropdown-item" href="{{ route('admission.create') }}">Заявка на поступление</a>
     <a class="dropdown-item" href="{{ route('cooperation.index') }}">Сотрудничество</a>
     <a class="dropdown-item" href="{{ route('questions.create') }}">Задать вопрос</a>
    </div>
   </div>

   <a href="{{ route('news.index') }}">Новости</a>
  </nav>
 </div>
</header>

<div class="offcanvas offcanvas-end tech-offcanvas" tabindex="-1" id="mobileNav">
 <div class="offcanvas-header"><b>Навигация</b><button class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button></div>
 <div class="offcanvas-body">
  <a href="{{ route('home') }}">Главная</a>
  <a href="{{ route('specialties.index') }}">Специальности</a>
  <a href="{{ route('schedule.index') }}">Расписание</a>
  @foreach($mainMenu as $item)
   <a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>
   @if($item->childrenRecursive->count()) @include('partials.menu-tree',['items'=>$item->childrenRecursive,'depth'=>1,'mobile'=>true]) @endif
  @endforeach
  <a href="{{ route('competitions.index') }}">Конкурсы и достижения</a>
  <a href="{{ route('quizzes.index') }}">Викторины</a>
  <a href="{{ route('contacts.index') }}">Контакты и карта</a>
  <a href="{{ route('admission.create') }}">Заявка на поступление</a>
  <a href="{{ route('cooperation.index') }}">Сотрудничество</a>
  <a href="{{ route('questions.create') }}">Задать вопрос</a>
  <a href="{{ route('news.index') }}">Новости</a>
 </div>
</div>

<main>@yield('content')</main>

<footer class="site-footer"><div class="container-xxl py-5"><div class="row g-4">
 <div class="col-lg-5"><div class="brand mb-3"><span class="brand-mark">ЗСК</span><span><b>Зеленодольский судостроительный колледж</b></span></div><p class="text-secondary mb-0">Инженерное образование. Цифровое производство. Судостроение будущего.</p></div>
 <div class="col-lg-3"><h6>Контакты</h6><p class="small text-secondary">422542, Республика Татарстан,<br>г. Зеленодольск, ул. Гастелло, 4<br>+7 (84371) 4-26-17<br>GAPOU.ZSK@tatar.ru</p><a href="{{ route('contacts.index') }}">Контакты и карта →</a></div>
 <div class="col-lg-2"><h6>Поступление</h6><a href="{{ route('admission.create') }}">Подать заявку</a><br><a href="{{ route('pages.show','applicant') }}">Абитуриенту</a><br><a href="{{ route('questions.create') }}">Задать вопрос</a></div>
 <div class="col-lg-2"><h6>Колледж</h6><a href="{{ route('cooperation.index') }}">Сотрудничество</a><br><a href="{{ route('competitions.index') }}">Достижения</a><br><a href="{{ route('pages.show','sveden') }}">Сведения</a></div>
</div></div></footer>
@stack('scripts')
</body></html>