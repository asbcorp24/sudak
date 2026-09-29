<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>@yield('title','Админка ЗСК')</title>@vite(['resources/css/app.css','resources/js/app.js'])</head>
<body class="admin-body">
@php($adminUser=auth()->user())
@php($adminScope=$adminUser?->adminScope() ?? 'none')
<div class="admin-shell">
<aside class="admin-sidebar">
 <a class="brand" href="{{ route($adminUser->adminHomeRouteName()) }}"><span class="brand-mark">ЗСК</span><span><b>CMS</b><small>{{ ['full'=>'полное управление','site'=>'управление сайтом','schedule'=>'расписание','dpo'=>'ДПО / LMS'][$adminScope] ?? 'управление' }}</small></span></a>
 <nav>
  @if($adminUser->canAdmin('site'))
   <a href="{{ route('admin.dashboard') }}">Панель</a>
   <a href="{{ route('admin.pages.index') }}">Разделы и страницы</a>
   <a href="{{ route('admin.specialties.index') }}">Специальности + 3D</a>
   <a href="{{ route('admin.news.index') }}">Новости</a>
   <a href="{{ route('admin.media.index') }}">Медиа</a>
   <a href="{{ route('admin.employees.index') }}">Сотрудники</a>
   <a href="{{ route('admin.official-documents.index') }}">Официальные документы</a>
  @endif

  @if($adminUser->canAdmin('schedule'))
   <a href="{{ route('admin.schedule.index') }}">Расписание</a>
   @if($adminScope==='schedule')
    <a href="{{ route('admin.employees.index',['type'=>'teacher']) }}">Преподаватели</a>
   @endif
  @endif

  @if($adminUser->canAdmin('dpo'))
   <a href="{{ route('admin.dpo.index') }}">ДПО / LMS</a>
  @endif

  @if($adminUser->canAdmin('site'))
   <span class="admin-nav-group">ОБРАТНАЯ СВЯЗЬ</span>
   <a href="{{ route('admin.contacts') }}">Контакты и карта</a>
   <a href="{{ route('admin.applications.index') }}">Заявки на поступление</a>
   <a href="{{ route('admin.cooperation.index') }}">Сотрудничество</a>
   <a href="{{ route('admin.questions.index') }}">Вопросы и обращения</a>

   <span class="admin-nav-group">АКТИВНОСТИ</span>
   <a href="{{ route('admin.calendar.index') }}">Календарь колледжа</a>
   <a href="{{ route('admin.competitions.index') }}">Конкурсы и достижения</a>
   <a href="{{ route('admin.quizzes.index') }}">Викторины</a>

   <span class="admin-nav-group">СИСТЕМА</span>
   <a href="{{ route('admin.settings') }}">Главная / SEO / хранилище</a>
  @endif

  @if($adminScope==='full')
   <a href="{{ route('admin.admins.index') }}">Администраторы</a>
  @endif

  <a href="{{ route('home') }}" target="_blank">Открыть сайт ↗</a>
 </nav>
 <form method="post" action="{{ route('admin.logout') }}">@csrf<button class="btn-ghost w-100">Выйти</button></form>
</aside>
<main class="admin-main">
 <div class="admin-top">
  <b>@yield('heading','Управление')</b>
  <span class="d-flex align-items-center gap-2">
   <span class="admin-scope-badge scope-{{ $adminScope }}">{{ ['full'=>'Полный','site'=>'Сайт','schedule'=>'Расписание','dpo'=>'ДПО'][$adminScope] ?? '' }}</span>
   <span>{{ $adminUser->name ?? '' }}</span>
  </span>
 </div>
 @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
 @if($errors->any())<div class="alert alert-danger">{{ $errors->first() }}</div>@endif
 @yield('content')
</main>
</div>
@stack('scripts')
</body></html>