@extends('layouts.app')
@section('title','Личный кабинет студента — ЗСК')
@section('content')
<div class="student-dashboard-light">
<section class="student-dashboard-hero"><div class="container-xxl">
 <div><span class="eyebrow">STUDENT / DASHBOARD</span><h1>{{ $user->name }}</h1><p>{{ $user->scheduleGroup?->name ? 'Группа '.$user->scheduleGroup->name : 'Учебная группа не выбрана' }}</p></div>
 <div class="student-hero-actions"><a class="btn-ghost" href="{{ route('student.notifications') }}">Уведомления @if($unread)<span class="student-notification-badge">{{ $unread }}</span>@endif</a><form method="post" action="{{ route('student.logout') }}">@csrf<button class="btn-ghost">Выйти</button></form></div>
</div></section>

<section class="student-dashboard-section"><div class="container-xxl">
 @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
 <div class="student-dashboard-grid">
  <div class="student-dashboard-main">
   <div class="student-panel">
    <div class="student-panel-head"><div><span class="eyebrow">SCHEDULE</span><h2>Ближайшие занятия</h2></div><a href="{{ route('schedule.index',['group_id'=>$user->schedule_group_id]) }}">Расписание →</a></div>
    <div class="student-schedule-list">
     @forelse($schedule as $entry)
      <article><time><b>{{ $entry->lesson_date->format('d.m') }}</b><span>{{ $entry->starts_at }}</span></time><div><h3>{{ $entry->subject }}</h3><p>{{ $entry->lesson_type }}@if($entry->room) · ауд. {{ $entry->room }}@endif</p><small>{{ $entry->teacher?->full_name }}</small></div></article>
     @empty<div class="calendar-empty">Ближайших занятий для группы пока нет.</div>@endforelse
    </div>
   </div>

   <div class="student-panel">
    <div class="student-panel-head"><div><span class="eyebrow">EVENTS</span><h2>Мои мероприятия</h2></div><a href="{{ route('calendar.index') }}">Календарь →</a></div>
    <div class="student-event-list">
     @forelse($registrations as $registration)
      <a href="{{ route('calendar.show',$registration->event->slug) }}"><time>{{ $registration->event->starts_at->format('d.m') }}</time><div><b>{{ $registration->event->title }}</b><small>{{ $registration->event->starts_at->format('H:i') }}@if($registration->event->location) · {{ $registration->event->location }}@endif</small></div><span>↗</span></a>
     @empty<div class="calendar-empty">Вы пока не зарегистрированы на будущие мероприятия.</div>@endforelse
    </div>
   </div>
  </div>

  <aside class="student-dashboard-side">
   <div class="student-panel">
    <span class="eyebrow">PWA / PUSH</span><h3>Уведомления</h3>
    <p>Разрешите уведомления, чтобы получать изменения расписания, новые новости и напоминания о мероприятиях даже когда сайт закрыт.</p>
    <button type="button" class="btn-tech w-100 justify-content-center" data-push-enable>Включить PWA-уведомления</button>
    <small class="push-status" data-push-status></small>
    <form class="student-notify-settings" method="post" action="{{ route('student.preferences') }}">@csrf @method('PUT')
     <label><input type="checkbox" name="notify_schedule" value="1" @checked($user->notify_schedule)> Изменения расписания</label>
     <label><input type="checkbox" name="notify_news" value="1" @checked($user->notify_news)> Новые новости</label>
     <label><input type="checkbox" name="notify_events" value="1" @checked($user->notify_events)> Мероприятия и напоминания</label>
     <button class="btn-ghost w-100 justify-content-center">Сохранить настройки</button>
    </form>
   </div>

   <div class="student-panel">
    <div class="student-panel-head compact"><div><span class="eyebrow">INBOX</span><h3>Последние</h3></div><a href="{{ route('student.notifications') }}">Все →</a></div>
    <div class="student-notification-list">
     @forelse($notifications as $item)
      <a class="{{ $item->read_at?'':'unread' }}" href="{{ route('student.notifications.read',$item) }}"><span></span><div><b>{{ $item->title }}</b><p>{{ $item->body }}</p><small>{{ $item->created_at->diffForHumans() }}</small></div></a>
     @empty<p class="text-secondary">Уведомлений пока нет.</p>@endforelse
    </div>
   </div>
  </aside>
 </div>
</div></section>
</div>
@endsection
