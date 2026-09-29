@extends('admin.layout')
@section('heading','Участники мероприятия')
@section('content')
<div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
 <div><span class="eyebrow">EVENT / PARTICIPANTS</span><h2>{{ $event->title }}</h2><p class="text-secondary mb-0">{{ $event->starts_at->format('d.m.Y H:i') }} · зарегистрировано {{ $registrations->where('status','registered')->count() }}@if($event->capacity) из {{ $event->capacity }}@endif</p></div>
 <a class="btn-ghost" href="{{ route('admin.calendar.index') }}">← К календарю</a>
</div>
<div class="glass-panel table-responsive">
 <table class="table align-middle admin-table mb-0"><thead><tr><th>Студент</th><th>Группа</th><th>Email</th><th>Регистрация</th><th>Статус</th></tr></thead><tbody>
 @forelse($registrations as $registration)
  <tr><td><b>{{ $registration->user->name }}</b>@if($registration->user->student_number)<small class="d-block text-secondary">№ {{ $registration->user->student_number }}</small>@endif</td><td>{{ $registration->user->scheduleGroup?->name ?: '—' }}</td><td>{{ $registration->user->email }}</td><td>{{ $registration->registered_at?->format('d.m.Y H:i') }}</td><td><form method="post" action="{{ route('admin.calendar.participants.status',[$event,$registration]) }}">@csrf @method('PATCH')<select class="form-select form-select-sm" name="status" onchange="this.form.submit()"><option value="registered" @selected($registration->status==='registered')>Зарегистрирован</option><option value="attended" @selected($registration->status==='attended')>Посетил</option><option value="cancelled" @selected($registration->status==='cancelled')>Отменено</option></select></form></td></tr>
 @empty<tr><td colspan="5" class="text-center text-secondary py-5">Регистраций пока нет.</td></tr>@endforelse
 </tbody></table>
</div>
@endsection
