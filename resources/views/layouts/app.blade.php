<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>@yield('title','Зеленодольский судостроительный колледж')</title>
<meta name="description" content="@yield('description','Зеленодольский судостроительный колледж — инженерное и цифровое СПО в Зеленодольске.')">
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
   @foreach($mainMenu as $item)
    @if($item->childrenRecursive->count())
     <div class="dropdown"><a class="dropdown-toggle" data-bs-toggle="dropdown" href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>
      <div class="dropdown-menu tech-dropdown">@foreach($item->childrenRecursive as $child)<a class="dropdown-item" href="{{ route('pages.show',$child->slug) }}">{{ $child->menu_title ?: $child->title }}</a>@endforeach</div>
     </div>
    @else <a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a> @endif
   @endforeach
   <a href="{{ route('news.index') }}">Новости</a>
  </nav>
 </div>
</header>
<div class="offcanvas offcanvas-end tech-offcanvas" tabindex="-1" id="mobileNav"><div class="offcanvas-header"><b>Навигация</b><button class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button></div><div class="offcanvas-body">
 <a href="{{ route('home') }}">Главная</a><a href="{{ route('specialties.index') }}">Специальности</a>
 @foreach($mainMenu as $item)<a href="{{ route('pages.show',$item->slug) }}">{{ $item->menu_title ?: $item->title }}</a>@endforeach
 <a href="{{ route('news.index') }}">Новости</a>
</div></div>
<main>@yield('content')</main>
<footer class="site-footer"><div class="container-xxl py-5"><div class="row g-4">
 <div class="col-lg-6"><div class="brand mb-3"><span class="brand-mark">ЗСК</span><span><b>Зеленодольский судостроительный колледж</b></span></div><p class="text-secondary mb-0">Инженерное образование. Цифровое производство. Судостроение будущего.</p></div>
 <div class="col-lg-3"><h6>Контакты</h6><p class="small text-secondary">422542, Республика Татарстан,<br>г. Зеленодольск, ул. Гастелло, 4<br>GAPOU.ZSK@tatar.ru</p></div>
 <div class="col-lg-3"><h6>Быстрые ссылки</h6><a href="{{ route('pages.show','sveden') }}">Сведения об организации</a><br><a href="{{ route('pages.show','applicant') }}">Абитуриенту</a></div>
</div></div></footer>
</body></html>