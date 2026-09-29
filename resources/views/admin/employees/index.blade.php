@extends('admin.layout')
@section('heading','Сотрудники')
@section('content')
@php($scheduleOnly=auth()->user()->adminScope()==='schedule')
<div class="admin-actions">
 <div><p>Единый справочник руководства, преподавателей и сотрудников. Преподаватели из этого раздела используются в расписании.</p></div>
 <a class="btn-tech" href="{{ route('admin.employees.create') }}">+ Добавить сотрудника</a>
</div>

@unless($scheduleOnly)
<div class="d-flex gap-2 flex-wrap mb-4">
 <a class="{{ !$activeType?'btn-tech':'btn-ghost' }}" href="{{ route('admin.employees.index') }}">Все</a>
 <a class="{{ $activeType==='leadership'?'btn-tech':'btn-ghost' }}" href="{{ route('admin.employees.index',['type'=>'leadership']) }}">Руководство</a>
 <a class="{{ $activeType==='teacher'?'btn-tech':'btn-ghost' }}" href="{{ route('admin.employees.index',['type'=>'teacher']) }}">Преподаватели</a>
 <a class="{{ $activeType==='staff'?'btn-tech':'btn-ghost' }}" href="{{ route('admin.employees.index',['type'=>'staff']) }}">Сотрудники</a>
 <a class="btn-ghost ms-auto" target="_blank" href="{{ route('employees.index') }}">Открыть раздел ↗</a>
</div>
@endunless

<div class="table-responsive">
 <table class="table tech-table align-middle">
  <thead><tr><th>Фото</th><th>ФИО / должность</th><th>Тип</th><th>Дисциплины</th><th>Расписание</th><th>Публикация</th><th></th></tr></thead>
  <tbody>
   @forelse($employees as $employee)
    @php($photo=$employee->getMedia('photo')->first())
    <tr>
     <td><div class="employee-admin-photo">@if($photo)<img src="{{ $photo->url }}" alt="">@else<span>{{ mb_substr($employee->full_name,0,1) }}</span>@endif</div></td>
     <td><b>{{ $employee->full_name }}</b>@if($employee->position)<br><small>{{ $employee->position }}</small>@endif</td>
     <td>{{ ['leadership'=>'Руководство','teacher'=>'Преподаватель','staff'=>'Сотрудник'][$employee->employee_type] ?? $employee->employee_type }}</td>
     <td style="max-width:280px">{{ $employee->disciplines ?: '—' }}</td>
     <td>{{ $employee->schedule_entries_count }}</td>
     <td>{{ $employee->is_published?'Да':'Нет' }}</td>
     <td class="text-end">
      <a href="{{ route('admin.employees.edit',$employee) }}">Изменить</a>
      <form class="d-inline" method="post" action="{{ route('admin.employees.destroy',$employee) }}" onsubmit="return confirm('Удалить сотрудника?')">@csrf @method('DELETE')<button class="link-danger ms-2">×</button></form>
     </td>
    </tr>
   @empty
    <tr><td colspan="7">Сотрудников пока нет.</td></tr>
   @endforelse
  </tbody>
 </table>
</div>
<div class="mt-4">{{ $employees->links() }}</div>
@endsection