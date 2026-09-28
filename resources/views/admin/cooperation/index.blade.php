@extends('admin.layout')
@section('heading','Сотрудничество')
@section('content')
<div class="admin-actions">
 <div><p>Партнёры, предложения, совместные проекты и входящие заявки.</p><small class="text-secondary">Изображения карточек выбираются из общей медиатеки.</small></div>
 <a class="btn-ghost" target="_blank" href="{{ route('cooperation.index') }}">Открыть страницу ↗</a>
</div>

<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.cooperation.items.store') }}" class="glass-panel admin-form">@csrf
   <h3>Добавить материал</h3>
   <div class="field"><label>Тип</label><select class="form-select" name="type"><option value="proposal">Предложение</option><option value="partner">Партнёр</option><option value="project">Совместный проект</option></select></div>
   <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="5" name="description"></textarea></div>
   <div class="field"><label>Ссылка</label><input type="url" class="form-control" name="url"></div>
   <div class="field"><label>Изображение из медиатеки</label><select class="form-select" name="media_id"><option value="">— без изображения —</option>@foreach($images as $image)<option value="{{ $image->id }}">{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
   <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort_order" value="0"></div>
   <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликован</label>
   <button class="btn-tech w-100 justify-content-center">Добавить</button>
  </form>
 </div>

 <div class="col-xl-8">
  <div class="glass-panel">
   <div class="d-flex justify-content-between align-items-center gap-3 mb-3"><h3 class="mb-0">Материалы</h3><a href="{{ route('admin.media.index') }}">Медиатека ↗</a></div>
   @forelse($items as $item)
    @php($cover=$item->getMedia('cover')->first())
    <form method="post" action="{{ route('admin.cooperation.items.update',$item) }}" class="cooperation-admin-item admin-form">@csrf @method('PUT')
     <div class="cooperation-admin-thumb">@if($cover)<img src="{{ $cover->url }}" alt="">@else<span>{{ strtoupper(substr($item->type,0,2)) }}</span>@endif</div>
     <div class="cooperation-admin-fields">
      <div class="row g-2">
       <div class="col-md-4"><select class="form-select" name="type">@foreach(['proposal'=>'Предложение','partner'=>'Партнёр','project'=>'Проект'] as $key=>$label)<option value="{{ $key }}" @selected($item->type===$key)>{{ $label }}</option>@endforeach</select></div>
       <div class="col-md-8"><input class="form-control" name="title" value="{{ $item->title }}" required></div>
       <div class="col-12"><textarea class="form-control" rows="3" name="description">{{ $item->description }}</textarea></div>
       <div class="col-md-6"><input type="url" class="form-control" name="url" value="{{ $item->url }}" placeholder="Ссылка"></div>
       <div class="col-md-6"><select class="form-select" name="media_id"><option value="">— без изображения —</option>@foreach($images as $image)<option value="{{ $image->id }}" @selected($cover?->id===$image->id)>{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
       <div class="col-md-3"><input type="number" min="0" class="form-control" name="sort_order" value="{{ $item->sort_order }}"></div>
       <div class="col-md-4"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($item->is_published)> Опубликован</label></div>
       <div class="col-md-5 text-end"><button class="btn-ghost">Сохранить</button></div>
      </div>
     </div>
    </form>
    <form method="post" action="{{ route('admin.cooperation.items.destroy',$item) }}" class="text-end mb-3" onsubmit="return confirm('Удалить материал?')">@csrf @method('DELETE')<button class="link-danger">Удалить материал ×</button></form>
   @empty
    <p class="text-secondary">Материалов пока нет.</p>
   @endforelse
  </div>
 </div>
</div>

<div class="glass-panel mt-4">
 <div class="d-flex justify-content-between align-items-center"><h3 class="mb-0">Заявки на сотрудничество</h3><span class="feedback-count">{{ $applications->count() }}</span></div>
 <div class="table-responsive mt-3">
  <table class="table tech-table align-middle">
   <thead><tr><th>Дата</th><th>Тип</th><th>Контакт</th><th>Организация</th><th>Сообщение</th><th>Статус</th><th></th></tr></thead>
   <tbody>
    @forelse($applications as $a)
     <tr>
      <td>{{ $a->created_at->format('d.m.Y H:i') }}</td>
      <td>{{ ['partner'=>'Партнёр','curator'=>'Эксперт / куратор','teacher'=>'Преподаватель','employer'=>'Работодатель','other'=>'Другое'][$a->role] ?? $a->role }}</td>
      <td><b>{{ $a->name }}</b><br><small>{{ $a->phone ?: '' }} {{ $a->email ?: '' }}</small>@if($a->website)<br><a target="_blank" rel="noopener" href="{{ $a->website }}">Сайт ↗</a>@endif</td>
      <td>{{ $a->organization ?: '—' }}</td>
      <td style="max-width:320px">{{ $a->message ?: '—' }}</td>
      <td>
       <form method="post" action="{{ route('admin.cooperation.applications.update',$a) }}">@csrf @method('PATCH')
        <select class="form-select form-select-sm" name="status" onchange="this.form.submit()">
         @foreach(['new'=>'Новая','processing'=>'В работе','accepted'=>'Принята','rejected'=>'Отклонена'] as $key=>$label)<option value="{{ $key }}" @selected($a->status===$key)>{{ $label }}</option>@endforeach
        </select>
       </form>
      </td>
      <td><form method="post" action="{{ route('admin.cooperation.applications.destroy',$a) }}" onsubmit="return confirm('Удалить заявку?')">@csrf @method('DELETE')<button class="link-danger">×</button></form></td>
     </tr>
    @empty
     <tr><td colspan="7">Заявок пока нет.</td></tr>
    @endforelse
   </tbody>
  </table>
 </div>
</div>
@endsection