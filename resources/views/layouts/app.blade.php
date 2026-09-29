<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="webpush-public-key" content="{{ config('services.webpush.public_key') }}">
<title>@yield('title',$siteSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж')</title>
<meta name="description" content="@yield('description',$siteSettings['seo_description'] ?? 'Зеленодольский судостроительный колледж — инженерное и цифровое СПО в Зеленодольске.')">
@if(!empty($siteSettings['seo_keywords']))<meta name="keywords" content="{{ $siteSettings['seo_keywords'] }}">@endif
<meta name="robots" content="{{ $siteSettings['seo_robots'] ?? 'index,follow' }}">
@if(!empty($siteSettings['seo_canonical']))<link rel="canonical" href="{{ $siteSettings['seo_canonical'] }}">@endif
<meta property="og:type" content="website">
<meta property="og:title" content="@yield('title',(($siteSettings['seo_og_title'] ?? null) ?: ($siteSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж')))">
<meta property="og:description" content="@yield('description',(($siteSettings['seo_og_description'] ?? null) ?: ($siteSettings['seo_description'] ?? 'Инженерное и цифровое СПО в Зеленодольске.')))">
@if(!empty($siteSettings['seo_og_image']))<meta property="og:image" content="{{ $siteSettings['seo_og_image'] }}">@endif
<meta name="twitter:card" content="{{ $siteSettings['seo_twitter_card'] ?? 'summary_large_image' }}">
<meta name="theme-color" content="#1769d2">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="ЗСК">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" type="image/svg+xml" href="/pwa/icon.svg">
<link rel="apple-touch-icon" href="/pwa/icon.svg">
<script>
try{
 const a=JSON.parse(localStorage.getItem('zsk-a11y')||'{}');
 const r=document.documentElement;
 if(a.font)r.dataset.a11yFont=a.font;
 ['contrast','grayscale','spacing','images','motion'].forEach(k=>{if(a[k])r.classList.add('a11y-'+(k==='contrast'?'high-contrast':k==='spacing'?'wide-spacing':k==='images'?'hide-images':k==='motion'?'no-motion':'grayscale'))});
}catch(e){}
</script>
@vite(['resources/css/app.css','resources/js/app.js'])
@stack('head')
</head>
<body>
<div class="noise"></div>
@include('partials.accessibility-panel')
<header class="site-header">
 <div class="container-xxl d-flex align-items-center gap-3 py-3">
  <a class="brand" href="{{ route('home') }}"><span class="brand-mark">ЗСК</span><span><b>Зеленодольский</b><small>судостроительный колледж</small></span></a>
  <nav class="main-nav d-none d-lg-flex ms-auto align-items-center gap-1">
   <a href="{{ route('specialties.index') }}">Специальности</a>
   <a href="{{ route('schedule.index') }}">Расписание</a>
   <a href="{{ route('employees.index') }}">Сотрудники</a>
   @foreach($mainMenu as $item)
    @if($item->childrenRecursive->count())
     <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>
      <div class="dropdown-menu tech-dropdown">@include('partials.menu-tree',['items'=>$item->childrenRecursive,'depth'=>0,'mobile'=>false])</div>
     </div>
    @else <a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a> @endif
   @endforeach

   <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="#">Активности</a>
    <div class="dropdown-menu tech-dropdown">
     <a class="dropdown-item" href="{{ route('calendar.index') }}">Календарь колледжа</a>
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
   <a href="{{ auth()->check() && auth()->user()->user_type==='student' ? route('student.dashboard') : route('student.login') }}">{{ auth()->check() && auth()->user()->user_type==='student' ? 'Мой кабинет' : 'Студенту' }}</a>
   <a href="{{ route('dpo.login') }}">ДПО</a>
  </nav>
 </div>
</header>

<div class="offcanvas offcanvas-end tech-offcanvas" tabindex="-1" id="mobileNav">
 <div class="offcanvas-header"><b>Навигация</b><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
 <div class="offcanvas-body">
  <a href="{{ route('home') }}">Главная</a>
  <a href="{{ route('specialties.index') }}">Специальности</a>
  <a href="{{ route('schedule.index') }}">Расписание</a>
  @foreach($mainMenu as $item)
   <a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>
   @if($item->childrenRecursive->count()) @include('partials.menu-tree',['items'=>$item->childrenRecursive,'depth'=>1,'mobile'=>true]) @endif
  @endforeach
  <a href="{{ route('calendar.index') }}">Календарь колледжа</a>
  <a href="{{ route('competitions.index') }}">Конкурсы и достижения</a>
  <a href="{{ route('quizzes.index') }}">Викторины</a>
  <a href="{{ route('contacts.index') }}">Контакты и карта</a>
  <a href="{{ route('admission.create') }}">Заявка на поступление</a>
  <a href="{{ route('cooperation.index') }}">Сотрудничество</a>
  <a href="{{ route('questions.create') }}">Задать вопрос</a>
  <a href="{{ route('news.index') }}">Новости</a>
  <a href="{{ auth()->check() && auth()->user()->user_type==='student' ? route('student.dashboard') : route('student.login') }}">Личный кабинет студента</a>
  <a href="{{ route('dpo.login') }}">ДПО</a>
  <button type="button" class="pwa-install-inline" data-pwa-install hidden>Установить приложение</button>
 </div>
</div>

<nav class="mobile-app-nav d-lg-none" aria-label="Основная мобильная навигация">
 <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">
  <span class="mobile-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-5v-6h-5v6h-5A1.5 1.5 0 0 1 3 19.5z"/></svg></span>
  <span>Главная</span>
 </a>
 <a href="{{ route('specialties.index') }}" class="{{ request()->routeIs('specialties.*') ? 'active' : '' }}">
  <span class="mobile-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg></span>
  <span>Специальности</span>
 </a>
 <a href="{{ route('schedule.index') }}" class="{{ request()->routeIs('schedule.*') ? 'active' : '' }}">
  <span class="mobile-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3v3M19 3v3M4 8h16M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2zM7 12h3M14 12h3M7 16h3M14 16h3"/></svg></span>
  <span>Расписание</span>
 </a>
 <a href="{{ route('news.index') }}" class="{{ request()->routeIs('news.*') ? 'active' : '' }}">
  <span class="mobile-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg></span>
  <span>Новости</span>
 </a>
 <button type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" class="mobile-menu-trigger">
  <span class="mobile-app-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14"/></svg></span>
  <span>Меню</span>
 </button>
</nav>

<div class="pwa-install-banner" data-pwa-banner hidden>
 <div class="pwa-install-mark">ЗСК</div>
 <div class="pwa-install-copy"><b>Установить ЗСК</b><small>Расписание, новости и сайт — как приложение</small></div>
 <button type="button" class="pwa-install-button" data-pwa-install>Установить</button>
 <button type="button" class="pwa-install-close" data-pwa-close aria-label="Закрыть">×</button>
</div>

<div class="offline-status" data-offline-status hidden>Нет сети · показаны сохранённые данные</div>

<main>@yield('content')</main>

<footer class="site-footer"><div class="container-xxl py-5"><div class="row g-4">
 <div class="col-lg-5"><div class="brand mb-3"><span class="brand-mark">ЗСК</span><span><b>Зеленодольский судостроительный колледж</b></span></div><p class="text-secondary mb-0">Инженерное образование. Цифровое производство. Судостроение будущего.</p></div>
 <div class="col-lg-3"><h6>Контакты</h6><p class="small text-secondary">422542, Республика Татарстан,<br>г. Зеленодольск, ул. Гастелло, 4<br>+7 (84371) 4-26-17<br>GAPOU.ZSK@tatar.ru</p><a href="{{ route('contacts.index') }}">Контакты и карта →</a></div>
 <div class="col-lg-2"><h6>Поступление</h6><a href="{{ route('admission.create') }}">Подать заявку</a><br><a href="{{ route('pages.show','applicant') }}">Абитуриенту</a><br><a href="{{ route('questions.create') }}">Задать вопрос</a></div>
 <div class="col-lg-2"><h6>Колледж</h6><a href="{{ route('employees.index') }}">Сотрудники</a><br><a href="{{ route('calendar.index') }}">Календарь</a><br><a href="{{ route('official-documents.index') }}">Документы</a><br><a href="{{ route('cooperation.index') }}">Сотрудничество</a><br><a href="{{ route('competitions.index') }}">Достижения</a><br><a href="{{ route('pages.show','sveden') }}">Сведения</a></div>
</div></div></footer>
@stack('scripts')
</body></html>