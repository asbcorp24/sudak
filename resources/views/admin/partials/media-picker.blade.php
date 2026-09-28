@php
 $pickerId = $pickerId ?? 'media-picker';
 $selectedCover = old('main_media_id', $selectedCover ?? null);
 $selectedContent = collect(old('content_media_ids', $selectedContent ?? []))->map(fn($v)=>(int)$v)->all();
@endphp
<div class="media-picker" id="{{ $pickerId }}">
 <div class="media-picker-head">
  <div><span class="eyebrow">MEDIA LIBRARY</span><h3>Медиа</h3></div>
  <a class="btn-ghost" target="_blank" href="{{ route('admin.media.index') }}">Открыть медиатеку ↗</a>
 </div>

 <div class="inline-media-upload mb-3"
      data-media-inline-upload
      data-upload-url="{{ route('admin.media.store') }}"
      data-csrf="{{ csrf_token() }}">
  <div class="inline-media-upload-main">
   <input type="file" class="form-control" data-media-upload-input multiple
    accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.csv,.zip,.rar,.7z,.glb,.gltf,.obj,.stl,.fbx,.dae,.3ds,.blend,.ply">
   <button type="button" class="btn-tech" data-media-upload-button>Загрузить файл</button>
  </div>
  <small data-media-upload-status>Можно загрузить файл прямо здесь, не открывая медиатеку.</small>
 </div>

 <input class="form-control media-picker-search" type="search" placeholder="Фильтр медиа в этой форме">

 @if(($allowCover ?? true))
 <div class="media-picker-section">
  <b>Главное изображение</b>
  <label class="media-none-option"><input type="radio" name="main_media_id" value="" @checked(!$selectedCover)> Без главного изображения</label>
  <div class="media-picker-grid" data-media-picker-grid="cover">
   @foreach($media->where('type','image') as $asset)
    <label class="media-pick-card" data-media-search="{{ strtolower($asset->title.' '.$asset->original_name) }}">
     <input type="radio" name="main_media_id" value="{{ $asset->id }}" @checked((int)$selectedCover===$asset->id)>
     <span class="media-pick-preview"><img src="{{ $asset->url }}" alt=""></span>
     <span class="media-pick-title">{{ $asset->title ?: $asset->original_name }}</span>
    </label>
   @endforeach
  </div>
 </div>
 @endif

 <div class="media-picker-section">
  <b>Дополнительные материалы</b>
  <small>Можно выбрать изображения, документы и 3D-модели.</small>
  <div class="media-picker-grid" data-media-picker-grid="content">
   @foreach($media as $asset)
    <label class="media-pick-card" data-media-search="{{ strtolower($asset->title.' '.$asset->original_name.' '.$asset->extension) }}">
     <input type="checkbox" name="content_media_ids[]" value="{{ $asset->id }}" @checked(in_array($asset->id,$selectedContent,true))>
     <span class="media-pick-preview">
      @if($asset->isImage())
       <img src="{{ $asset->url }}" alt="">
      @else
       <span class="media-file-symbol">{{ $asset->type==='model_3d' ? '3D' : strtoupper($asset->extension) }}</span>
      @endif
     </span>
     <span class="media-pick-title">{{ $asset->title ?: $asset->original_name }}</span>
     <small>{{ strtoupper($asset->extension) }} · {{ $asset->human_size }}</small>
    </label>
   @endforeach
  </div>
 </div>
</div>

@once
<script>
document.addEventListener('input',function(e){
 if(!e.target.classList.contains('media-picker-search')) return;
 const picker=e.target.closest('.media-picker');
 const q=e.target.value.trim().toLowerCase();
 picker.querySelectorAll('.media-pick-card').forEach(card=>{
  card.style.display=!q || (card.dataset.mediaSearch||'').includes(q) ? '' : 'none';
 });
});
</script>
@endonce