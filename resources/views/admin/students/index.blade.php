@extends('admin.layout')
@section('title','Студенты — подтверждение регистрации')
@section('heading','Студенты / подтверждение регистрации')
@section('content')
<div class="admin-actions">
 <div><p>Самостоятельная регистрация студента не даёт доступ сразу. Сначала проверьте ФИО, группу и при необходимости номер студенческого.</p></div>
</div>

<div class="student-approval-tabs">
 @foreach(['pending'=>'Ожидают','approved'=>'Подтверждены','rejected'=>'Отклонены','all'=>'Все'] as $key=>$label)
  <a class="{{ $status===$key?'active':'' }}" href="{{ route('admin.students.index',['status'=>$key]) }}"><span>{{ $label }}</span><b>{{ $counts[$key] }}</b></a>
 @endforeach
</div>

<form class="glass-panel admin-student-search" method="get">
 <input type="hidden" name="status" value="{{ $status }}">
 <div class="row g-2 align-items-end">
  <div class="col-md-10 field"><label>Поиск</label><input class="form-control" name="q" value="{{ request('q') }}" placeholder="ФИО, email, группа, номер студенческого"></div>
  <div class="col-md-2 d-grid"><button class="btn-tech justify-content-center">Найти</button></div>
 </div>
</form>

<div class="admin-student-list">
 @forelse($students as $student)
  <article class="glass-panel admin-student-card status-{{ $student->student_approval_status }}">
   <div class="admin-student-head">
    <div>
     <span class="student-status-badge status-{{ $student->student_approval_status }}">
      {{ ['pending'=>'ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ','approved'=>'ПОДТВЕРЖДЁН','rejected'=>'ОТКЛОНЁН'][$student->student_approval_status] ?? $student->student_approval_status }}
     </span>
     <h3>{{ $student->name }}</h3>
     <p>{{ $student->email }} · {{ $student->scheduleGroup?->name ?: 'группа не указана' }} @if($student->student_number) · № {{ $student->student_number }}@endif</p>
     <small>Регистрация: {{ $student->created_at?->format('d.m.Y H:i') }}</small>
    </div>
    <div class="admin-student-actions">
     @if($student->student_approval_status!=='approved')
      <form method="post" action="{{ route('admin.students.approve',$student) }}">@csrf @method('PATCH')<button class="btn-tech">✓ Подтвердить</button></form>
     @endif
     @if($student->student_approval_status!=='rejected')
      <form method="post" action="{{ route('admin.students.reject',$student) }}" onsubmit="return confirm('Отклонить регистрацию этого студента?')">@csrf @method('PATCH')<button class="btn-ghost">Отклонить</button></form>
     @endif
    </div>
   </div>
   <details class="admin-student-edit">
    <summary>Проверить / исправить данные</summary>
    <form method="post" action="{{ route('admin.students.update',$student) }}" class="admin-form pt-3">@csrf @method('PUT')
     <div class="row g-2">
      <div class="col-lg-5 field"><label>ФИО</label><input class="form-control" name="name" value="{{ $student->name }}" required></div>
      <div class="col-lg-4 field"><label>Группа</label><select class="form-select" name="schedule_group_id" required>@foreach($groups as $group)<option value="{{ $group->id }}" @selected($student->schedule_group_id===$group->id)>{{ $group->name }}</option>@endforeach</select></div>
      <div class="col-lg-3 field"><label>№ студенческого</label><input class="form-control" name="student_number" value="{{ $student->student_number }}"></div>
     </div>
     <button class="btn-ghost">Сохранить данные</button>
    </form>
   </details>
  </article>
 @empty
  <div class="glass-panel">В этой категории студентов нет.</div>
 @endforelse
</div>
<div class="mt-4">{{ $students->links() }}</div>
@endsection
