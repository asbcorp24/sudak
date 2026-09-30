@extends('admin.layout')
@section('title','Редактор меню — CMS ЗСК')
@section('heading','Редактор меню сайта')
@section('content')
<div class="glass-panel mb-4">
 <span class="eyebrow">NAVIGATION</span><h2>Меню из базы данных</h2>
 <p class="text-secondary">Добавляйте пункты, создавайте выпадающие группы, привязывайте страницы CMS, именованные маршруты Laravel или произвольные ссылки. Порядок задаётся числом: меньше — выше.</p>
 <form method="post" action="{{ route('admin.menu.store') }}" class="row g-3 align-items-end">@csrf
  <div class="col-lg-3"><label class="form-label">Название</label><input class="form-control" name="title" required></div>
  <div class="col-lg-2"><label class="form-label">Родитель</label><select class="form-select" name="parent_id"><option value="">Верхний уровень</option>@foreach($parents as $p)<option value="{{ $p->id }}">{{ $p->parent_id ? '↳ ' : '' }}{{ $p->title }}</option>@endforeach</select></div>
  <div class="col-lg-2"><label class="form-label">Тип ссылки</label><select class="form-select" name="link_type"><option value="none">Группа без ссылки</option><option value="route">Маршрут Laravel</option><option value="page">Страница CMS</option><option value="url">URL</option></select></div>
  <div class="col-lg-3"><label class="form-label">Маршрут / URL</label><input class="form-control" name="route_name" placeholder="news.index"><input class="form-control mt-2" name="url" placeholder="/contacts или https://..."></div>
  <div class="col-lg-2"><label class="form-label">Страница CMS</label><select class="form-select" name="page_id"><option value="">—</option>@foreach($pages as $p)<option value="{{ $p->id }}">{{ $p->title }}</option>@endforeach</select></div>
  <div class="col-lg-2"><label class="form-label">Порядок</label><input class="form-control" type="number" name="sort" value="100" min="0"></div>
  <div class="col-lg-8 d-flex flex-wrap gap-3"><label><input type="checkbox" name="is_active" value="1" checked> включён</label><label><input type="checkbox" name="show_desktop" value="1" checked> десктоп</label><label><input type="checkbox" name="show_mobile" value="1" checked> мобильное</label><label><input type="checkbox" name="open_in_new_tab" value="1"> новая вкладка</label></div>
  <div class="col-lg-2"><button class="btn btn-primary w-100">+ Добавить</button></div>
 </form>
</div>

<div class="d-grid gap-3">
@foreach($items as $item)
 <div class="glass-panel {{ $item->parent_id ? 'ms-lg-4' : '' }}" style="opacity:{{ $item->is_active ? 1 : .58 }}">
  <form method="post" action="{{ route('admin.menu.update',$item) }}" class="row g-2 align-items-end">@csrf @method('put')
   <div class="col-lg-3"><label class="form-label">{{ $item->parent_id ? '↳ Дочерний пункт' : 'Пункт верхнего уровня' }}</label><input class="form-control" name="title" value="{{ $item->title }}" required></div>
   <div class="col-lg-2"><label class="form-label">Родитель</label><select class="form-select" name="parent_id"><option value="">Верхний уровень</option>@foreach($parents as $p)@if($p->id!==$item->id)<option value="{{ $p->id }}" @selected($item->parent_id===$p->id)>{{ $p->parent_id ? '↳ ' : '' }}{{ $p->title }}</option>@endif @endforeach</select></div>
   <div class="col-lg-2"><label class="form-label">Тип</label><select class="form-select" name="link_type">@foreach(['none'=>'Группа','route'=>'Маршрут','page'=>'Страница','url'=>'URL'] as $v=>$t)<option value="{{ $v }}" @selected($item->link_type===$v)>{{ $t }}</option>@endforeach</select></div>
   <div class="col-lg-2"><label class="form-label">Маршрут</label><input class="form-control" name="route_name" value="{{ $item->route_name }}" placeholder="news.index"></div>
   <div class="col-lg-3"><label class="form-label">URL</label><input class="form-control" name="url" value="{{ $item->url }}" placeholder="/contacts"></div>
   <div class="col-lg-3"><label class="form-label">Страница CMS</label><select class="form-select" name="page_id"><option value="">—</option>@foreach($pages as $p)<option value="{{ $p->id }}" @selected($item->page_id===$p->id)>{{ $p->title }}</option>@endforeach</select></div>
   <div class="col-lg-1"><label class="form-label">Порядок</label><input class="form-control" type="number" name="sort" value="{{ $item->sort }}" min="0"></div>
   <div class="col-lg-5 d-flex flex-wrap gap-3 pb-2"><label><input type="checkbox" name="is_active" value="1" @checked($item->is_active)> вкл.</label><label><input type="checkbox" name="show_desktop" value="1" @checked($item->show_desktop)> desktop</label><label><input type="checkbox" name="show_mobile" value="1" @checked($item->show_mobile)> mobile</label><label><input type="checkbox" name="open_in_new_tab" value="1" @checked($item->open_in_new_tab)> ↗</label></div>
   <div class="col-lg-3"><button class="btn btn-primary w-100">Сохранить</button></div>
  </form>
  <div class="d-flex gap-2 mt-2">
   <form method="post" action="{{ route('admin.menu.move',[$item,'up']) }}">@csrf @method('patch')<button class="btn btn-sm btn-outline-secondary" title="Выше">↑</button></form>
   <form method="post" action="{{ route('admin.menu.move',[$item,'down']) }}">@csrf @method('patch')<button class="btn btn-sm btn-outline-secondary" title="Ниже">↓</button></form>
   <form method="post" action="{{ route('admin.menu.destroy',$item) }}" onsubmit="return confirm('Удалить пункт меню?')">@csrf @method('delete')<button class="btn btn-sm btn-outline-danger">Удалить</button></form>
   @if($item->link_type!=='none')<a class="btn btn-sm btn-outline-secondary" href="{{ $item->href() }}" target="_blank">Открыть ↗</a>@endif
  </div>
 </div>
@endforeach
</div>
@endsection