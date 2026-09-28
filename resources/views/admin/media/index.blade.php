@extends('admin.layout')
@section('heading','Медиа')
@section('content')
<div class="admin-actions">
 <div><p>Единая медиатека сайта: изображения, документы и 3D-модели.</p><small class="text-secondary">Изображения автоматически уменьшаются до рамки 1920×1080 с сохранением пропорций.</small></div>
</div>

<form class="glass-panel mb-4" method="post" enctype="multipart/form-data" action="{{ route('admin.media.store') }}">
 @csrf
 <div class="row g-3 align-items-end">
  <div class="col-lg-8">
   <label>Добавить файлы</label>
   <input class="form-control" type="file" name="files[]" multiple required accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.csv,.zip,.rar,.7z,.glb,.gltf,.obj,.stl,.fbx,.dae,.3ds,.blend,.ply">
   <small class="text-secondary">Можно выбрать до 20 файлов за раз, до 100 МБ каждый.</small>
  </div>
  <div class="col-lg-4"><button class="btn-tech w-100 justify-content-center">Загрузить в медиатеку</button></div>
 </div>
</form>

<form class="media-toolbar mb-4" method="get">
 <input class="form-control" name="q" value="{{ request('q') }}" placeholder="Поиск по имени файла">
 <select class="form-select" name="type" onchange="this.form.submit()">
  <option value="">Все типы</option>
  <option value="image" @selected(request('type')==='image')>Изображения</option>
  <option value="document" @selected(request('type')==='document')>Документы</option>
  <option value="model_3d" @selected(request('type')==='model_3d')>3D-модели</option>
 </select>
 <button class="btn-ghost">Найти</button>
</form>

@if($assets->count())
<div class="media-admin-grid">
 @foreach($assets as $asset)
  <article class="media-admin-card">
   <div class="media-admin-preview">
    @if($asset->isImage())
     <img src="{{ $asset->url }}" alt="{{ $asset->alt ?: $asset->title }}">
    @else
     <div class="media-file-symbol">{{ $asset->type==='model_3d' ? '3D' : strtoupper($asset->extension) }}</div>
    @endif
    <span>{{ $asset->type==='model_3d' ? '3D MODEL' : strtoupper($asset->type) }}</span>
   </div>
   <div class="media-admin-info">
    <b title="{{ $asset->original_name }}">{{ $asset->title ?: $asset->original_name }}</b>
    <small>{{ strtoupper($asset->extension) }} · {{ $asset->human_size }}@if($asset->width) · {{ $asset->width }}×{{ $asset->height }}@endif</small>
    <small>Использований: {{ $asset->links_count }}</small>
   </div>
   <form method="post" action="{{ route('admin.media.update',$asset) }}" class="media-meta-form">
    @csrf @method('PUT')
    <input class="form-control" name="title" value="{{ $asset->title }}" placeholder="Название">
    @if($asset->isImage())<input class="form-control" name="alt" value="{{ $asset->alt }}" placeholder="Alt изображения">@endif
    <button class="btn-ghost">Сохранить</button>
   </form>
   <div class="d-flex gap-2">
    <a class="btn-ghost flex-grow-1 justify-content-center" target="_blank" href="{{ $asset->url }}">Открыть ↗</a>
    <form method="post" action="{{ route('admin.media.destroy',$asset) }}" onsubmit="return confirm('Удалить файл из медиатеки? Он исчезнет со всех страниц, где используется.')">
     @csrf @method('DELETE')
     <button class="btn-ghost media-delete">×</button>
    </form>
   </div>
  </article>
 @endforeach
</div>
<div class="mt-4">{{ $assets->links() }}</div>
@else
<div class="glass-panel">Медиатека пока пуста.</div>
@endif
@endsection