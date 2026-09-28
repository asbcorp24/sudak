@extends('admin.layout')
@section('heading',$page->exists?'Редактирование страницы':'Новая страница')
@section('content')
<form class="admin-form" method="post" action="{{ $page->exists ? route('admin.pages.update',$page) : route('admin.pages.store') }}">
 @csrf @if($page->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ old('title',$page->title) }}" required></div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>Slug</label><input class="form-control" name="slug" value="{{ old('slug',$page->slug) }}" placeholder="автоматически"></div>
    <div class="col-md-6 field"><label>Название в меню</label><input class="form-control" name="menu_title" value="{{ old('menu_title',$page->menu_title) }}"></div>
   </div>
   <div class="field"><label>Краткое описание</label><textarea class="form-control" rows="3" name="excerpt">{{ old('excerpt',$page->excerpt) }}</textarea></div>
   <div class="field"><label>Содержимое страницы (HTML)</label><textarea class="form-control code-area" rows="18" name="content">{{ old('content',$page->content) }}</textarea></div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>SEO title</label><input class="form-control" name="meta_title" value="{{ old('meta_title',$page->meta_title) }}"></div>
    <div class="col-md-6 field"><label>SEO description</label><input class="form-control" name="meta_description" value="{{ old('meta_description',$page->meta_description) }}"></div>
   </div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel">
    <div class="field"><label>Тип</label><select class="form-select" name="page_type">@foreach(['section'=>'Раздел','subsection'=>'Подраздел','page'=>'Страница'] as $v=>$t)<option value="{{ $v }}" @selected(old('page_type',$page->page_type?:'page')==$v)>{{ $t }}</option>@endforeach</select></div>
    <div class="field"><label>Родитель</label><select class="form-select" name="parent_id"><option value="">— верхний уровень —</option>@foreach($parents as $p)<option value="{{ $p->id }}" @selected(old('parent_id',$page->parent_id)==$p->id)>{{ $p->title }}</option>@endforeach</select></div>
    <div class="field"><label>Порядок</label><input class="form-control" type="number" name="sort" value="{{ old('sort',$page->sort??0) }}"></div>
    <label class="check"><input type="checkbox" name="show_in_menu" value="1" @checked(old('show_in_menu',$page->exists?$page->show_in_menu:true))> Показывать в меню</label>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$page->exists?$page->is_published:true))> Опубликовано</label>
    <button class="btn-tech w-100 justify-content-center mt-3">Сохранить</button>
   </div>
  </div>
 </div>
 @include('admin.partials.media-picker',['pickerId'=>'page-media'])
 <div class="mt-4"><button class="btn-tech">Сохранить страницу</button></div>
</form>
@endsection