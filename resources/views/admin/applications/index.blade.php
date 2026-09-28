@extends('admin.layout')
@section('heading','Заявки на поступление')
@section('content')
<div class="admin-actions">
 <div><p>Входящие обращения абитуриентов и статусы обработки.</p><small class="text-secondary">Новые заявки отображаются первыми.</small></div>
 <a class="btn-ghost" target="_blank" href="{{ route('admission.create') }}">Публичная форма ↗</a>
</div>

<form class="feedback-admin-filter mb-4" method="get">
 <input class="form-control" name="q" value="{{ request('q') }}" placeholder="ФИО, телефон или email">
 <select class="form-select" name="status">
  <option value="">Все статусы</option>
  @foreach(['new'=>'Новые','processing'=>'В обработке','accepted'=>'Приняты','rejected'=>'Отклонены'] as $key=>$label)
   <option value="{{ $key }}" @selected(request('status')===$key)>{{ $label }}</option>
  @endforeach
 </select>
 <button class="btn-ghost">Фильтр</button>
</form>

<div class="table-responsive">
 <table class="table tech-table align-middle">
  <thead><tr><th>Дата</th><th>Абитуриент</th><th>Контакты</th><th>Специальность</th><th>Комментарий</th><th>Статус</th><th></th></tr></thead>
  <tbody>
   @forelse($applications as $a)
    <tr>
     <td>{{ $a->created_at->format('d.m.Y H:i') }}</td>
     <td><b>{{ $a->name }}</b>@if($a->birth_date)<br><small>{{ $a->birth_date->format('d.m.Y') }}</small>@endif</td>
     <td>{{ $a->phone }}@if($a->email)<br><small>{{ $a->email }}</small>@endif</td>
     <td style="max-width:260px">{{ $a->specialty ? $a->specialty->code.' · '.$a->specialty->title : 'Не выбрана' }}</td>
     <td style="max-width:300px">{{ $a->message ?: '—' }}</td>
     <td>
      <form method="post" action="{{ route('admin.applications.update',$a) }}">@csrf @method('PATCH')
       <select class="form-select form-select-sm" name="status" onchange="this.form.submit()">
        @foreach(['new'=>'Новая','processing'=>'В обработке','accepted'=>'Принята','rejected'=>'Отклонена'] as $key=>$label)
         <option value="{{ $key }}" @selected($a->status===$key)>{{ $label }}</option>
        @endforeach
       </select>
      </form>
     </td>
     <td class="text-end">
      <form method="post" action="{{ route('admin.applications.destroy',$a) }}" onsubmit="return confirm('Удалить заявку?')">@csrf @method('DELETE')<button class="link-danger">×</button></form>
     </td>
    </tr>
   @empty
    <tr><td colspan="7">Заявок пока нет.</td></tr>
   @endforelse
  </tbody>
 </table>
</div>
<div class="mt-4">{{ $applications->links() }}</div>
@endsection