@php($items = $items ?? collect())
@if($items->count())
<section class="content-media">
 <div class="content-media-grid">
  @foreach($items as $asset)
   @if($asset->isImage())
    <a class="content-media-image" href="{{ $asset->url }}" target="_blank">
     <img src="{{ $asset->url }}" alt="{{ $asset->alt ?: $asset->title }}">
     @if($asset->title)<span>{{ $asset->title }}</span>@endif
    </a>
   @else
    <a class="content-media-file" href="{{ $asset->url }}" target="_blank">
     <span class="media-file-symbol">{{ $asset->type==='model_3d' ? '3D' : strtoupper($asset->extension) }}</span>
     <span><b>{{ $asset->title ?: $asset->original_name }}</b><small>{{ $asset->type==='model_3d' ? '3D-модель' : 'Документ' }} · {{ strtoupper($asset->extension) }} · {{ $asset->human_size }}</small></span>
     <i>↗</i>
    </a>
   @endif
  @endforeach
 </div>
</section>
@endif