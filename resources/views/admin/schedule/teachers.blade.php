@extends('admin.layout')
@section('heading','Преподаватели')
@section('content')
<div class="admin-actions"><p>Справочник преподавателей для расписания и публичного фильтра.</p><a href="{{ route('admin.schedule.index') }}">← Расписание</a></div>
<form class="glass-panel mb-4" method="post" action="{{ route('admin.schedule.teachers.store') }}">@csrf
 <div class="row g-3 align-items-end">
  <div class="col-md-5"><label>ФИО</label><input class="form-control" name="full_name" required></div>
  <div class="col-md-4"><label>Должность</label><input class="form-control" name="position"></div>
  <div class="col-md-1"><label class="check mb-2"><input type="checkbox" name="is_active" value="1" checked> Активен</label></div>
  <div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Добавить</button></div>
 </div>
</form>

<div class="table-responsive"><table class="table tech-table align-middle"><thead><tr><th>ФИО</th><th>Должность</th><th>Занятий</th><th>Активен</th><th></th></tr></thead><tbody>
@foreach($teachers as $teacher)
<tr>
 <form method="post" action="{{ route('admin.schedule.teachers.update',$teacher) }}">@csrf @method('PUT')
 <td><input class="form-control" name="full_name" value="{{ $teacher->full_name }}" required></td>
 <td><input class="form-control" name="position" value="{{ $teacher->position }}"></td>
 <td>{{ $teacher->entries_count }}</td>
 <td><label class="check"><input type="checkbox" name="is_active" value="1" @checked($teacher->is_active)> Да</label></td>
 <td class="text-end"><button class="btn-ghost">Сохранить</button></form>
 <form class="d-inline" method="post" action="{{ route('admin.schedule.teachers.destroy',$teacher) }}" onsubmit="return confirm('Удалить преподавателя?')">@csrf @method('DELETE')<button class="link-danger ms-2">×</button></form></td>
</tr>
@endforeach
</tbody></table></div>
@endsection