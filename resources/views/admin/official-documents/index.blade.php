@extends('admin.layout')
@section('heading','Центр документов')
@section('content')
<div class="admin-actions">
 <div><p>Структурированный каталог официальных документов с реквизитами и историей редакций.</p><small class="text-secondary">Новая версия не удаляет старую: все редакции остаются в истории документа.</small></div>
 <div class="d-flex flex-wrap gap-2"><a class="btn-ghost" href="{{ route('admin.media.index',['type'=>'document']) }}">Медиатека ↗</a><a class="btn-ghost" target="_blank" href="{{ route('document-center.index') }}">Открыть центр ↗</a></div>
</div>

<form class="glass-panel admin-document-filter mb-4" method="get">
 <div class="row g-2 align-items-end">
  <div class="col-lg-6 field"><label>Поиск</label><input class="form-control" name="q" value="{{ request('q') }}" placeholder="Название, номер, версия, категория…"></div>
  <div class="col-lg-4 field"><label>Категория</label><select class="form-select" name="category_id"><option value="">Все категории</option>@foreach($categories as $category)<option value="{{ $category->id }}" @selected(request('category_id')==$category->id)>{{ $category->title }} · {{ $category->documents_count }}</option>@endforeach</select></div>
  <div class="col-lg-2 d-grid"><button class="btn-tech justify-content-center">Найти</button></div>
 </div>
</form>

<div class="row g-4">
 <div class="col-xl-4">
  <details class="glass-panel admin-doc-create" open>
   <summary><span><span class="eyebrow">NEW DOCUMENT</span><b>Добавить документ</b></span><i>＋</i></summary>
   <form method="post" action="{{ route('admin.official-documents.store') }}" class="admin-form pt-3">@csrf
    <div class="field"><label>Категория</label><select class="form-select" name="category_id" required><option value="">Выберите</option>@foreach($categories as $category)<option value="{{ $category->id }}">{{ $category->title }}</option>@endforeach</select></div>
    <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
    <div class="row g-2">
     <div class="col-md-6 field"><label>Дата документа</label><input type="date" class="form-control" name="document_date"></div>
     <div class="col-md-6 field"><label>Номер</label><input class="form-control" name="document_number"></div>
    </div>
    <div class="field"><label>Первая версия файла</label><select class="form-select" name="media_asset_id" required><option value="">Файл из медиатеки</option>@foreach($documentMedia as $asset)<option value="{{ $asset->id }}">{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
    <div class="row g-2">
     <div class="col-md-5 field"><label>Версия</label><input class="form-control" name="version" value="1.0"></div>
     <div class="col-md-7 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
    </div>
    <div class="field"><label>Что изменено / примечание</label><input class="form-control" name="change_note" placeholder="Первая редакция"></div>
    <div class="field"><label>Описание</label><textarea class="form-control" rows="3" name="description"></textarea></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликован</label>
    <button class="btn-tech w-100 justify-content-center">Добавить в каталог</button>
   </form>
  </details>

  <details class="glass-panel admin-doc-create mt-4">
   <summary><span><span class="eyebrow">CATEGORIES</span><b>Категории</b></span><i>＋</i></summary>
   <form method="post" action="{{ route('admin.official-documents.categories.store') }}" class="admin-form pt-3">@csrf
    <div class="field"><label>Название новой категории</label><input class="form-control" name="title" required></div>
    <div class="field"><label>Slug</label><input class="form-control" name="slug" placeholder="автоматически"></div>
    <div class="field"><label>Описание</label><textarea class="form-control" rows="2" name="description"></textarea></div>
    <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликована</label>
    <button class="btn-ghost w-100 justify-content-center">Добавить категорию</button>
   </form>
   <div class="admin-category-manager">
    @foreach($categories as $category)
     <details>
      <summary><span>{{ $category->title }}</span><b>{{ $category->documents_count }}</b></summary>
      <form method="post" action="{{ route('admin.official-documents.categories.update',$category) }}" class="admin-form">@csrf @method('PUT')
       <div class="field"><input class="form-control" name="title" value="{{ $category->title }}" required></div>
       <div class="row g-2"><div class="col-8"><input class="form-control" name="slug" value="{{ $category->slug }}"></div><div class="col-4"><input type="number" min="0" class="form-control" name="sort" value="{{ $category->sort }}"></div></div>
       <div class="field mt-2"><textarea class="form-control" rows="2" name="description">{{ $category->description }}</textarea></div>
       <div class="d-flex justify-content-between align-items-center gap-2"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($category->is_published)> Видна</label><button class="btn-ghost">Сохранить</button></div>
      </form>
      @if(!$category->documents_count)<form method="post" action="{{ route('admin.official-documents.categories.destroy',$category) }}" class="text-end" onsubmit="return confirm('Удалить пустую категорию?')">@csrf @method('DELETE')<button class="link-danger">Удалить категорию ×</button></form>@endif
     </details>
    @endforeach
   </div>
  </details>
 </div>

 <div class="col-xl-8">
  <div class="admin-documents-list">
   @forelse($documents as $document)
    @php($current=$document->versions->firstWhere('is_current',true))
    <article class="glass-panel admin-document-card">
     <div class="admin-document-card-head">
      <div><span class="eyebrow">{{ $document->category?->title }}</span><h3>{{ $document->title }}</h3><div class="admin-document-requisites">@if($document->document_number)<span>№ {{ $document->document_number }}</span>@endif @if($document->document_date)<span>{{ $document->document_date->format('d.m.Y') }}</span>@endif @if($current?->version)<span>Текущая: {{ $current->version }}</span>@endif <span>{{ $document->versions->count() }} вер.</span></div></div>
      @if($current?->media)<a class="btn-ghost" target="_blank" href="{{ $current->media->url }}">Открыть ↗</a>@endif
     </div>

     <details class="admin-document-edit">
      <summary>Карточка и реквизиты</summary>
      <form method="post" action="{{ route('admin.official-documents.update',$document) }}" class="admin-form pt-3">@csrf @method('PUT')
       <div class="row g-2">
        <div class="col-md-8 field"><label>Название</label><input class="form-control" name="title" value="{{ $document->title }}" required></div>
        <div class="col-md-4 field"><label>Категория</label><select class="form-select" name="category_id">@foreach($categories as $category)<option value="{{ $category->id }}" @selected($document->category_id===$category->id)>{{ $category->title }}</option>@endforeach</select></div>
        <div class="col-md-4 field"><label>Дата</label><input type="date" class="form-control" name="document_date" value="{{ $document->document_date?->format('Y-m-d') }}"></div>
        <div class="col-md-4 field"><label>Номер</label><input class="form-control" name="document_number" value="{{ $document->document_number }}"></div>
        <div class="col-md-4 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ $document->sort }}"></div>
        <div class="col-12 field"><label>Описание</label><textarea class="form-control" rows="2" name="description">{{ $document->description }}</textarea></div>
       </div>
       <div class="d-flex justify-content-between align-items-center gap-2"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($document->is_published)> Опубликован</label><button class="btn-ghost">Сохранить карточку</button></div>
      </form>
     </details>

     <div class="admin-version-title"><span>История редакций</span><b>{{ $document->versions->count() }}</b></div>
     <div class="admin-version-list">
      @foreach($document->versions as $version)
       <details class="admin-version-row" @if($version->is_current) open @endif>
        <summary>
         <div><b>{{ $version->version ?: 'Без номера версии' }} @if($version->is_current)<em>ТЕКУЩАЯ</em>@endif</b><small>@if($version->effective_date){{ $version->effective_date->format('d.m.Y') }}@endif @if($version->media) · {{ strtoupper($version->media->extension) }} · {{ $version->media->human_size }}@endif</small></div><span>⌄</span>
        </summary>
        <form method="post" action="{{ route('admin.official-documents.versions.update',[$document,$version]) }}" class="admin-form admin-version-form">@csrf @method('PUT')
         <div class="row g-2">
          <div class="col-md-5"><select class="form-select" name="media_asset_id" required>@foreach($documentMedia as $asset)<option value="{{ $asset->id }}" @selected($version->media_asset_id===$asset->id)>{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
          <div class="col-md-3"><input class="form-control" name="version" value="{{ $version->version }}" placeholder="Версия"></div>
          <div class="col-md-4"><input type="date" class="form-control" name="effective_date" value="{{ $version->effective_date?->format('Y-m-d') }}"></div>
          <div class="col-12"><input class="form-control" name="change_note" value="{{ $version->change_note }}" placeholder="Что изменилось в этой редакции"></div>
         </div>
         <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
          <label class="check"><input type="checkbox" name="is_published" value="1" @checked($version->is_published)> Показывать в истории</label>
          <div class="d-flex gap-2">@if($version->media)<a class="btn-ghost" target="_blank" href="{{ $version->media->url }}">Файл ↗</a>@endif<button class="btn-ghost">Сохранить версию</button></div>
         </div>
        </form>
        <div class="admin-version-actions">
         @if(!$version->is_current)<form method="post" action="{{ route('admin.official-documents.versions.current',[$document,$version]) }}">@csrf @method('PATCH')<button class="btn-ghost">Сделать текущей</button></form>@endif
         @if($document->versions->count()>1)<form method="post" action="{{ route('admin.official-documents.versions.destroy',[$document,$version]) }}" onsubmit="return confirm('Удалить эту запись версии? Сам файл останется в медиатеке.')">@csrf @method('DELETE')<button class="link-danger">Удалить версию ×</button></form>@endif
        </div>
       </details>
      @endforeach
     </div>

     <details class="admin-add-version">
      <summary>＋ Добавить новую версию</summary>
      <form method="post" action="{{ route('admin.official-documents.versions.store',$document) }}" class="admin-form pt-3">@csrf
       <div class="row g-2">
        <div class="col-md-5 field"><label>Новый файл</label><select class="form-select" name="media_asset_id" required><option value="">Выберите</option>@foreach($documentMedia as $asset)<option value="{{ $asset->id }}">{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
        <div class="col-md-3 field"><label>Версия</label><input class="form-control" name="version" placeholder="2.0"></div>
        <div class="col-md-4 field"><label>Дата редакции</label><input type="date" class="form-control" name="effective_date" value="{{ now()->format('Y-m-d') }}"></div>
        <div class="col-12 field"><label>Что изменилось</label><input class="form-control" name="change_note" placeholder="Кратко опишите изменения"></div>
       </div>
       <div class="d-flex flex-wrap justify-content-between gap-3"><div><label class="check"><input type="checkbox" name="is_published" value="1" checked> Публиковать</label><label class="check"><input type="checkbox" name="make_current" value="1" checked> Сделать текущей</label></div><button class="btn-tech">Добавить версию</button></div>
      </form>
     </details>

     <form method="post" action="{{ route('admin.official-documents.destroy',$document) }}" class="text-end mt-3" onsubmit="return confirm('Удалить карточку и историю версий? Файлы в медиатеке останутся.')">@csrf @method('DELETE')<button class="link-danger">Удалить документ ×</button></form>
    </article>
   @empty
    <div class="glass-panel">Документы не найдены.</div>
   @endforelse
  </div>
  <div class="mt-4">{{ $documents->links() }}</div>
 </div>
</div>
@endsection
