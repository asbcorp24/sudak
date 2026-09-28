@extends('admin.layout')
@section('heading','Официальные документы')
@section('content')
<div class="admin-actions">
 <div><p>Структура раздела «Сведения об образовательной организации»: категории, документы, даты и версии.</p><small class="text-secondary">Файлы выбираются из общей медиатеки, повторно загружать их не нужно.</small></div>
 <div class="d-flex gap-2"><a class="btn-ghost" href="{{ route('admin.media.index',['type'=>'document']) }}">Медиатека ↗</a><a class="btn-ghost" target="_blank" href="{{ route('official-documents.index') }}">Открыть раздел ↗</a></div>
</div>

<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.official-documents.categories.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW CATEGORY</span><h3 class="mt-2">Категория документов</h3>
   <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" placeholder="автоматически"></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="4" name="description"></textarea></div>
   <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
   <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликована</label>
   <button class="btn-tech w-100 justify-content-center">Добавить категорию</button>
  </form>

  <form method="post" action="{{ route('admin.official-documents.store') }}" class="glass-panel admin-form mt-4">@csrf
   <span class="eyebrow">NEW DOCUMENT</span><h3 class="mt-2">Добавить документ</h3>
   <div class="field"><label>Категория</label><select class="form-select" name="category_id" required><option value="">Выберите</option>@foreach($categories as $category)<option value="{{ $category->id }}">{{ $category->title }}</option>@endforeach</select></div>
   <div class="field"><label>Название документа</label><input class="form-control" name="title" required></div>
   <div class="field"><label>Файл из медиатеки</label><select class="form-select" name="media_asset_id" required><option value="">Выберите документ</option>@foreach($documentMedia as $asset)<option value="{{ $asset->id }}">{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>Дата</label><input type="date" class="form-control" name="document_date"></div>
    <div class="col-md-6 field"><label>Версия</label><input class="form-control" name="version" placeholder="1.0 / 2026"></div>
    <div class="col-md-6 field"><label>Номер</label><input class="form-control" name="document_number"></div>
    <div class="col-md-6 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
   </div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="4" name="description"></textarea></div>
   <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликован</label>
   <button class="btn-tech w-100 justify-content-center">Добавить документ</button>
  </form>
 </div>

 <div class="col-xl-8">
  @forelse($categories as $category)
   <section class="glass-panel mb-4">
    <form method="post" action="{{ route('admin.official-documents.categories.update',$category) }}" class="admin-form">@csrf @method('PUT')
     <div class="row g-2 align-items-end">
      <div class="col-md-5 field"><label>Категория</label><input class="form-control" name="title" value="{{ $category->title }}" required></div>
      <div class="col-md-3 field"><label>Slug</label><input class="form-control" name="slug" value="{{ $category->slug }}"></div>
      <div class="col-md-2 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ $category->sort }}"></div>
      <div class="col-md-2"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($category->is_published)> Видна</label></div>
      <div class="col-12 field"><label>Описание</label><textarea class="form-control" rows="2" name="description">{{ $category->description }}</textarea></div>
      <div class="col-12 text-end"><button class="btn-ghost">Сохранить категорию</button></div>
     </div>
    </form>

    <div class="official-doc-admin-list mt-3">
     @forelse($category->documents as $document)
      <form method="post" action="{{ route('admin.official-documents.update',$document) }}" class="official-doc-admin-row admin-form">@csrf @method('PUT')
       <input type="hidden" name="category_id" value="{{ $category->id }}">
       <div class="row g-2">
        <div class="col-md-8"><input class="form-control" name="title" value="{{ $document->title }}" required></div>
        <div class="col-md-4"><select class="form-select" name="media_asset_id" required>@foreach($documentMedia as $asset)<option value="{{ $asset->id }}" @selected($document->media_asset_id===$asset->id)>{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
        <div class="col-md-3"><input type="date" class="form-control" name="document_date" value="{{ $document->document_date?->format('Y-m-d') }}"></div>
        <div class="col-md-3"><input class="form-control" name="version" value="{{ $document->version }}" placeholder="Версия"></div>
        <div class="col-md-3"><input class="form-control" name="document_number" value="{{ $document->document_number }}" placeholder="Номер"></div>
        <div class="col-md-3"><input type="number" min="0" class="form-control" name="sort" value="{{ $document->sort }}"></div>
        <div class="col-12"><textarea class="form-control" rows="2" name="description">{{ $document->description }}</textarea></div>
        <div class="col-md-6"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($document->is_published)> Опубликован</label></div>
        <div class="col-md-6 text-end"><button class="btn-ghost">Сохранить документ</button></div>
       </div>
      </form>
      <form method="post" action="{{ route('admin.official-documents.destroy',$document) }}" class="text-end mb-3" onsubmit="return confirm('Удалить документ из раздела? Файл останется в медиатеке.')">@csrf @method('DELETE')<button class="link-danger">Удалить документ ×</button></form>
     @empty
      <p class="text-secondary">В категории пока нет документов.</p>
     @endforelse
    </div>

    <form method="post" action="{{ route('admin.official-documents.categories.destroy',$category) }}" class="text-end mt-3" onsubmit="return confirm('Удалить категорию и все документы этой категории? Файлы в медиатеке останутся.')">@csrf @method('DELETE')<button class="link-danger">Удалить категорию ×</button></form>
   </section>
  @empty
   <div class="glass-panel">Сначала создайте категорию документов.</div>
  @endforelse
 </div>
</div>
@endsection