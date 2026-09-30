<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>@yield('title','Админка ЗСК')</title>@vite(['resources/css/app.css','resources/js/app.js'])</head>
<body class="admin-body">
@php($adminUser=auth()->user())
@php($adminScope=$adminUser?->adminScope() ?? 'none')
@php($pendingStudents=\Illuminate\Support\Facades\Schema::hasColumn('users','student_approval_status') ? \App\Models\User::where('user_type','student')->where('student_approval_status','pending')->count() : 0)
@php($contentOpen=request()->routeIs('admin.menu.*') || request()->routeIs('admin.pages.*') || request()->routeIs('admin.specialties.*') || request()->routeIs('admin.news.*') || request()->routeIs('admin.media.*') || request()->routeIs('admin.music.*') || request()->routeIs('admin.panoramas.*') || request()->routeIs('admin.employees.*') || request()->routeIs('admin.official-documents.*'))
@php($studyOpen=request()->routeIs('admin.students.*') || request()->routeIs('admin.schedule.*') || request()->routeIs('admin.dpo.*'))
@php($feedbackOpen=request()->routeIs('admin.contacts') || request()->routeIs('admin.applications.*') || request()->routeIs('admin.cooperation.*') || request()->routeIs('admin.questions.*'))
@php($activityOpen=request()->routeIs('admin.calendar.*') || request()->routeIs('admin.competitions.*') || request()->routeIs('admin.quizzes.*'))
@php($systemOpen=request()->routeIs('admin.settings') || request()->routeIs('admin.admins.*'))
<div class="admin-shell">
<aside class="admin-sidebar">
 <a class="brand" href="{{ route($adminUser->adminHomeRouteName()) }}"><span class="brand-mark">ЗСК</span><span><b>CMS</b><small>{{ ['full'=>'полное управление','site'=>'управление сайтом','schedule'=>'расписание','dpo'=>'ДПО / LMS'][$adminScope] ?? 'управление' }}</small></span></a>
 <nav class="admin-nav-compact">
  @if($adminUser->canAdmin('site'))
   <a class="admin-nav-home {{ request()->routeIs('admin.dashboard')?'active':'' }}" href="{{ route('admin.dashboard') }}"><span>⌂</span> Панель</a>

   <details class="admin-nav-section" @if($contentOpen) open @endif>
    <summary><span><i>▦</i> Контент сайта</span><b>⌄</b></summary>
    <div>
     <a class="{{ request()->routeIs('admin.pages.*')?'active':'' }}" href="{{ route('admin.pages.index') }}">Разделы и страницы</a>
     <a class="{{ request()->routeIs('admin.menu.*')?'active':'' }}" href="{{ route('admin.menu.index') }}">Редактор меню</a>
     <a class="{{ request()->routeIs('admin.specialties.*')?'active':'' }}" href="{{ route('admin.specialties.index') }}">Специальности + 3D</a>
     <a class="{{ request()->routeIs('admin.news.*')?'active':'' }}" href="{{ route('admin.news.index') }}">Новости</a>
     <a class="{{ request()->routeIs('admin.media.*')?'active':'' }}" href="{{ route('admin.media.index') }}">Медиатека</a>
     <a class="{{ request()->routeIs('admin.music.*')?'active':'' }}" href="{{ route('admin.music.index') }}">Музыка сайта</a>
     <a class="{{ request()->routeIs('admin.panoramas.*')?'active':'' }}" href="{{ route('admin.panoramas.index') }}">Панорамы 360°</a>
     <a class="{{ request()->routeIs('admin.employees.*')?'active':'' }}" href="{{ route('admin.employees.index') }}">Сотрудники</a>
     <a class="{{ request()->routeIs('admin.official-documents.*')?'active':'' }}" href="{{ route('admin.official-documents.index') }}">Центр документов</a>
    </div>
   </details>
  @endif

  @if($adminUser->canAdmin('site') || $adminUser->canAdmin('schedule') || $adminUser->canAdmin('dpo'))
   <details class="admin-nav-section" @if($studyOpen) open @endif>
    <summary>
     <span><i>◫</i> Учебный процесс</span>
     <span class="admin-nav-summary-right">@if($pendingStudents)<em>{{ $pendingStudents }}</em>@endif<b>⌄</b></span>
    </summary>
    <div>
     @if($adminUser->canAdmin('site'))
      <a class="{{ request()->routeIs('admin.students.*')?'active':'' }}" href="{{ route('admin.students.index') }}">Студенты / регистрации @if($pendingStudents)<span class="admin-nav-count">{{ $pendingStudents }}</span>@endif</a>
     @endif
     @if($adminUser->canAdmin('schedule'))
      <a class="{{ request()->routeIs('admin.schedule.*')?'active':'' }}" href="{{ route('admin.schedule.index') }}">Расписание</a>
      @if($adminScope==='schedule')
       <a class="{{ request()->routeIs('admin.employees.*')?'active':'' }}" href="{{ route('admin.employees.index',['type'=>'teacher']) }}">Преподаватели</a>
      @endif
     @endif
     @if($adminUser->canAdmin('dpo'))
      <a class="{{ request()->routeIs('admin.dpo.*')?'active':'' }}" href="{{ route('admin.dpo.index') }}">ДПО / LMS</a>
     @endif
    </div>
   </details>
  @endif

  @if($adminUser->canAdmin('site'))
   <details class="admin-nav-section" @if($feedbackOpen) open @endif>
    <summary><span><i>✉</i> Обращения</span><b>⌄</b></summary>
    <div>
     <a class="{{ request()->routeIs('admin.contacts')?'active':'' }}" href="{{ route('admin.contacts') }}">Контакты и карта</a>
     <a class="{{ request()->routeIs('admin.applications.*')?'active':'' }}" href="{{ route('admin.applications.index') }}">Заявки на поступление</a>
     <a class="{{ request()->routeIs('admin.cooperation.*')?'active':'' }}" href="{{ route('admin.cooperation.index') }}">Сотрудничество</a>
     <a class="{{ request()->routeIs('admin.questions.*')?'active':'' }}" href="{{ route('admin.questions.index') }}">Вопросы и обращения</a>
    </div>
   </details>

   <details class="admin-nav-section" @if($activityOpen) open @endif>
    <summary><span><i>◇</i> Активности</span><b>⌄</b></summary>
    <div>
     <a class="{{ request()->routeIs('admin.calendar.*')?'active':'' }}" href="{{ route('admin.calendar.index') }}">Календарь колледжа</a>
     <a class="{{ request()->routeIs('admin.competitions.*')?'active':'' }}" href="{{ route('admin.competitions.index') }}">Конкурсы и достижения</a>
     <a class="{{ request()->routeIs('admin.quizzes.*')?'active':'' }}" href="{{ route('admin.quizzes.index') }}">Викторины</a>
    </div>
   </details>

   <details class="admin-nav-section" @if($systemOpen) open @endif>
    <summary><span><i>⚙</i> Система</span><b>⌄</b></summary>
    <div>
     <a class="{{ request()->routeIs('admin.settings')?'active':'' }}" href="{{ route('admin.settings') }}">Главная / SEO / хранилище</a>
     @if($adminScope==='full')
      <a class="{{ request()->routeIs('admin.admins.*')?'active':'' }}" href="{{ route('admin.admins.index') }}">Администраторы</a>
     @endif
    </div>
   </details>
  @elseif($adminScope==='full')
   <details class="admin-nav-section" @if($systemOpen) open @endif>
    <summary><span><i>⚙</i> Система</span><b>⌄</b></summary>
    <div><a href="{{ route('admin.admins.index') }}">Администраторы</a></div>
   </details>
  @endif

  <a class="admin-nav-site-link" href="{{ route('home') }}" target="_blank"><span>↗</span> Открыть сайт</a>
 </nav>
 <form class="admin-sidebar-logout" method="post" action="{{ route('admin.logout') }}">@csrf<button class="btn-ghost w-100">Выйти</button></form>
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
<script>
document.querySelectorAll('.admin-nav-section').forEach(function(section){
 section.addEventListener('toggle',function(){
  if(!section.open) return;
  document.querySelectorAll('.admin-nav-section').forEach(function(other){
   if(other!==section) other.open=false;
  });
 });
});
</script>
</body></html>