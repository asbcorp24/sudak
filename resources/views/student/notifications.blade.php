@extends('layouts.app')
@section('title','Уведомления — кабинет студента')
@section('content')
<section class="page-hero compact"><div class="container-xxl position-relative"><span class="eyebrow">STUDENT / NOTIFICATIONS</span><h1>Уведомления</h1><p>Расписание, новости и мероприятия колледжа.</p></div></section>
<section class="student-dashboard-section"><div class="container-xxl">
 <div class="d-flex flex-wrap justify-content-between gap-3 mb-4"><a class="btn-ghost" href="{{ route('student.dashboard') }}">← В кабинет</a><form method="post" action="{{ route('student.notifications.read-all') }}">@csrf @method('PATCH')<button class="btn-ghost">Прочитать все</button></form></div>
 <div class="student-notifications-full">
  @forelse($notifications as $item)
   <a class="{{ $item->read_at?'':'unread' }}" href="{{ route('student.notifications.read',$item) }}"><div class="student-notification-icon">{{ $item->type==='schedule'?'Р':($item->type==='news'?'Н':'С') }}</div><div><span>{{ $item->type==='schedule'?'РАСПИСАНИЕ':($item->type==='news'?'НОВОСТЬ':'МЕРОПРИЯТИЕ') }}</span><h3>{{ $item->title }}</h3><p>{{ $item->body }}</p><small>{{ $item->created_at->translatedFormat('d F Y, H:i') }}</small></div><b>↗</b></a>
  @empty<div class="calendar-empty">Уведомлений пока нет.</div>@endforelse
 </div>
 <div class="mt-4">{{ $notifications->links() }}</div>
</div></section>
@endsection
