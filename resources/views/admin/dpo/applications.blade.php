@extends('admin.layout')
@section('heading','ДПО / Заявки')
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.index') }}">← ДПО</a>
 <a class="btn-ghost" target="_blank" href="{{ route('dpo.catalog') }}">Публичный каталог ↗</a>
</div>

@if(session('dpo_credentials'))
 @php($cred=session('dpo_credentials'))
 <div class="alert alert-success">
  <b>Учётная запись создана. Сохраните данные сейчас:</b><br>
  {{ $cred['name'] }} · {{ $cred['email'] }} · пароль: <code>{{ $cred['password'] }}</code>
 </div>
@endif

<div class="glass-panel mb-4">
 <form class="row g-2">
  <div class="col-md-6"><input class="form-control" name="q" value="{{ request('q') }}" placeholder="ФИО, email или телефон"></div>
  <div class="col-md-4"><select class="form-select" name="status"><option value="">Все статусы</option>@foreach(['pending'=>'На рассмотрении','enrolled'=>'Зачислены','completed'=>'Обучение завершено','archived'=>'Архив','rejected'=>'Отклонены'] as $v=>$t)<option value="{{ $v }}" @selected(request('status')===$v)>{{ $t }}</option>@endforeach</select></div>
  <div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Найти</button></div>
 </form>
</div>

<div class="d-grid gap-3">
 @forelse($applications as $application)
  <article class="glass-panel">
   <div class="d-flex justify-content-between gap-3 flex-wrap">
    <div>
     <span class="eyebrow">ЗАЯВКА #{{ $application->id }} · {{ strtoupper($application->status) }}</span>
     <h3 class="mt-2 mb-1">{{ $application->name }}</h3>
     <div class="text-secondary">{{ $application->email }} · {{ $application->phone }}</div>
    </div>
    <div class="text-end"><b>{{ $application->program->title }}</b><br><small>{{ $application->created_at->format('d.m.Y H:i') }}</small></div>
   </div>
   <div class="row g-3 mt-2">
    <div class="col-md-4"><small class="text-secondary">Образование</small><div>{{ $application->education ?: '—' }}</div></div>
    <div class="col-md-4"><small class="text-secondary">Организация</small><div>{{ $application->organization ?: '—' }}</div></div>
    <div class="col-md-4"><small class="text-secondary">Группа</small><div>{{ $application->group?->name ?: 'не назначена' }}</div></div>
   </div>
   @if($application->comment)<p class="mt-3 mb-0">{{ $application->comment }}</p>@endif

   @if(in_array($application->status,['pending','approved'],true))
    <div class="row g-3 mt-2">
     <div class="col-lg-8">
      <form method="post" action="{{ route('admin.dpo.applications.approve',$application) }}" class="admin-form">@csrf @method('PATCH')
       <div class="row g-2">
        <div class="col-md-5"><select class="form-select" name="group_id" required><option value="">Группа для зачисления</option>@foreach($groups->where('program_id',$application->program_id) as $group)<option value="{{ $group->id }}">{{ $group->name }} · {{ $group->starts_on?->format('d.m.Y') ?: 'без даты' }}</option>@endforeach</select></div>
        <div class="col-md-3"><input class="form-control" name="initial_password" placeholder="Пароль (авто)"></div>
        <div class="col-md-4"><input class="form-control" name="admin_note" placeholder="Комментарий"></div>
       </div>
       <button class="btn-tech mt-2">Подтвердить и зачислить</button>
      </form>
     </div>
     <div class="col-lg-4">
      <form method="post" action="{{ route('admin.dpo.applications.reject',$application) }}" class="admin-form">@csrf @method('PATCH')
       <input class="form-control" name="admin_note" placeholder="Причина отказа">
       <button class="link-danger mt-2">Отклонить заявку</button>
      </form>
     </div>
    </div>
   @else
    <div class="mt-3 small text-secondary">Обработано: {{ $application->processed_at?->format('d.m.Y H:i') ?: '—' }}@if($application->admin_note) · {{ $application->admin_note }}@endif</div>
   @endif
  </article>
 @empty
  <div class="glass-panel">Заявок не найдено.</div>
 @endforelse
</div>
<div class="mt-4">{{ $applications->links() }}</div>
@endsection
