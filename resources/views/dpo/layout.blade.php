<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>@yield('title','ДПО — Зеленодольский судостроительный колледж')</title>
<meta name="theme-color" content="#1769d2">
@vite(['resources/css/app.css','resources/js/app.js'])
@stack('head')
</head>
<body class="dpo-body">
<header class="dpo-topbar">
 <div class="container-xxl d-flex align-items-center gap-3">
  <a class="dpo-brand" href="{{ route('dpo.dashboard') }}"><span class="brand-mark">ДПО</span><span><b>ЗСК · ДПО</b><small>система онлайн-обучения</small></span></a>
  @auth
  <nav class="dpo-nav ms-auto">
   <a class="{{ request()->routeIs('dpo.dashboard')?'active':'' }}" href="{{ route('dpo.dashboard') }}">Моё обучение</a>
   <a class="{{ request()->routeIs('dpo.schedule')?'active':'' }}" href="{{ route('dpo.schedule') }}">Расписание</a>
   <a class="{{ request()->routeIs('dpo.profile*')?'active':'' }}" href="{{ route('dpo.profile') }}">Профиль</a>
   @if(auth()->user()->is_admin)<a href="{{ route('admin.dpo.index') }}">Управление ↗</a>@endif
  </nav>
  <div class="dpo-user">
   <span>{{ auth()->user()->name }}</span>
   <form method="post" action="{{ route('dpo.logout') }}">@csrf<button>Выйти</button></form>
  </div>
  @endauth
 </div>
</header>
@if(session('ok'))<div class="container-xxl mt-3"><div class="alert alert-success">{{ session('ok') }}</div></div>@endif
@if($errors->any())<div class="container-xxl mt-3"><div class="alert alert-danger">{{ $errors->first() }}</div></div>@endif
<main>@yield('content')</main>
</body></html>