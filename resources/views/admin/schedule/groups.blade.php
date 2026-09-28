@extends('admin.layout')
@section('heading','Учебные группы')
@section('content')
<div class="admin-actions"><p>Справочник групп для фильтрации и составления расписания.</p><a href="{{ route('admin.schedule.index') }}">← Расписание</a></div>
<form class="glass-panel mb-4" method="post" action="{{ route('admin.schedule.groups.store') }}">@csrf
 <div class="row g-3 align-items-end">
  <div class="col-md-3"><label>Название группы</label><input class="form-control" name="name" required placeholder="Например, СД-21"></div>
  <div class="col-md-2"><label>Курс</label><input class="form-control" type="number" min="1" max="6" name="course"></div>
  <div class="col-md-4"><label>Специальность</label><input class="form-control" name="specialty"></div>
  <div class="col-md-1"><label class="check mb-2"><input type="checkbox" name="is_active" value="1" checked> Активна</label></div>
  <div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Добавить</button></div>
 </div>
</form>

<div class="table-responsive"><table class="table tech-table align-middle"><thead><tr><th>Группа</th><th>Курс</th><th>Специальность</th><th>Занятий</th><th>Активна</th><th></th></tr></thead><tbody>
@foreach($groups as $group)
<tr>
 <form method="post" action="{{ route('admin.schedule.groups.update',$group) }}">@csrf @method('PUT')
 <td><input class="form-control" name="name" value="{{ $group->name }}" required></td>
 <td><input class="form-control" type="number" min="1" max="6" name="course" value="{{ $group->course }}"></td>
 <td><input class="form-control" name="specialty" value="{{ $group->specialty }}"></td>
 <td>{{ $group->entries_count }}</td>
 <td><label class="check"><input type="checkbox" name="is_active" value="1" @checked($group->is_active)> Да</label></td>
 <td class="text-end"><button class="btn-ghost">Сохранить</button></form>
 <form class="d-inline" method="post" action="{{ route('admin.schedule.groups.destroy',$group) }}" onsubmit="return confirm('Удалить группу?')">@csrf @method('DELETE')<button class="link-danger ms-2">×</button></form></td>
</tr>
@endforeach
</tbody></table></div>
@endsection