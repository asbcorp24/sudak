@extends('layouts.app')
@section('title','Официальные документы — Зеленодольский судостроительный колледж')
@section('description','Официальные документы Зеленодольского судостроительного колледжа по категориям, датам и версиям.')
@section('content')
<section class="page-hero compact documents-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">СВЕДЕНИЯ ОБ ОБРАЗОВАТЕЛЬНОЙ ОРГАНИЗАЦИИ</span>
  <h1>Официальные документы</h1>
  <p>Документы колледжа сгруппированы по категориям. Для каждого файла указаны дата, версия и номер при наличии.</p>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="official-doc-layout">
   <aside class="official-doc-nav">
    @foreach($categories as $category)<a href="#doc-cat-{{ $category->id }}">{{ $category->title }}</a>@endforeach
   </aside>
   <div class="official-doc-groups">
    @forelse($categories as $category)
     <section class="official-doc-group" id="doc-cat-{{ $category->id }}">
      <div class="official-doc-group-head"><span class="eyebrow">{{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span><h2>{{ $category->title }}</h2>@if($category->description)<p>{{ $category->description }}</p>@endif</div>
      <div class="official-doc-list">
       @foreach($category->publishedDocuments as $document)
        <article class="official-doc-row">
         <div class="official-doc-icon">{{ strtoupper($document->media?->extension ?: 'DOC') }}</div>
         <div class="official-doc-main">
          <h3>{{ $document->title }}</h3>
          @if($document->description)<p>{{ $document->description }}</p>@endif
          <div class="official-doc-meta">
           @if($document->document_date)<span>{{ $document->document_date->format('d.m.Y') }}</span>@endif
           @if($document->version)<span>Версия: {{ $document->version }}</span>@endif
           @if($document->document_number)<span>№ {{ $document->document_number }}</span>@endif
           @if($document->media)<span>{{ strtoupper($document->media->extension) }} · {{ $document->media->human_size }}</span>@endif
          </div>
         </div>
         @if($document->media)<a class="btn-ghost" target="_blank" href="{{ $document->media->url }}">Открыть ↗</a>@else<span class="text-secondary">Файл не прикреплён</span>@endif
        </article>
       @endforeach
      </div>
     </section>
    @empty
     <div class="feedback-empty">Официальные документы пока не опубликованы.</div>
    @endforelse
   </div>
  </div>
 </div>
</section>
@endsection