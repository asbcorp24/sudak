@extends('layouts.app')
@section('title','Центр документов — Зеленодольский судостроительный колледж')
@section('description','Структурированный каталог документов колледжа: локальные акты, лицензии, образовательные документы, приказы, положения и архив редакций.')
@section('content')
<section class="page-hero compact documents-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">DOCUMENT / CENTER</span>
  <h1>Центр документов</h1>
  <p>Официальные документы колледжа с реквизитами, поиском и историей редакций.</p>
 </div>
</section>

<section class="document-center-section"><div class="container-xxl">
 <form class="document-center-search" method="get" action="{{ route('document-center.index') }}">
  <div class="document-search-main">
   <label>Поиск по документам</label>
   <div><input class="form-control" name="q" value="{{ request('q') }}" placeholder="Название, номер, категория, версия…"><button class="btn-tech">Найти</button></div>
  </div>
  <div class="document-search-filters">
   <div><label>Категория</label><select class="form-select" name="category"><option value="">Все категории</option>@foreach($categories as $category)<option value="{{ $category->slug }}" @selected(request('category')===$category->slug)>{{ $category->title }} ({{ $category->published_documents_count }})</option>@endforeach</select></div>
   <div><label>Дата от</label><input class="form-control" type="date" name="date_from" value="{{ request('date_from') }}"></div>
   <div><label>Дата до</label><input class="form-control" type="date" name="date_to" value="{{ request('date_to') }}"></div>
   @if(request()->hasAny(['q','category','date_from','date_to']))<a class="btn-ghost document-reset" href="{{ route('document-center.index') }}">Сбросить</a>@endif
  </div>
 </form>

 <div class="document-category-strip">
  <a class="{{ request('category')?'':'active' }}" href="{{ route('document-center.index',request()->except(['category','page'])) }}"><span>Все</span><b>{{ $categories->sum('published_documents_count') }}</b></a>
  @foreach($categories as $category)
   <a class="{{ request('category')===$category->slug?'active':'' }}" href="{{ route('document-center.index',array_merge(request()->except(['category','page']),['category'=>$category->slug])) }}"><span>{{ $category->title }}</span><b>{{ $category->published_documents_count }}</b></a>
  @endforeach
 </div>

 <div class="document-center-head">
  <div><span class="eyebrow">CATALOG</span><h2>Документы</h2></div>
  <span>Найдено: <b>{{ $documents->total() }}</b></span>
 </div>

 <div class="document-center-list">
  @forelse($documents as $document)
   @php($current=$document->publishedVersions->firstWhere('is_current',true))
   @php($currentMedia=$current?->media ?: $document->media)
   <article class="document-center-card">
    <div class="document-card-mark">{{ strtoupper($currentMedia?->extension ?: 'DOC') }}</div>
    <div class="document-card-body">
     <div class="document-card-top">
      <span>{{ $document->category?->title }}</span>
      @if($current?->version || $document->version)<b>Текущая версия {{ $current?->version ?: $document->version }}</b>@endif
     </div>
     <h3>{{ $document->title }}</h3>
     @if($document->description)<p>{{ $document->description }}</p>@endif
     <div class="document-card-meta">
      @if($document->document_number)<span>№ {{ $document->document_number }}</span>@endif
      @if($document->document_date)<span>от {{ $document->document_date->format('d.m.Y') }}</span>@endif
      @if($currentMedia)<span>{{ strtoupper($currentMedia->extension) }} · {{ $currentMedia->human_size }}</span>@endif
      @if($document->publishedVersions->count()>1)<span>{{ $document->publishedVersions->count() }} редакции</span>@endif
     </div>

     @if($document->publishedVersions->count()>1)
      <details class="document-version-history">
       <summary>История версий <span>{{ $document->publishedVersions->count() }}</span></summary>
       <div>
        @foreach($document->publishedVersions as $version)
         <div class="document-version-row">
          <div><b>{{ $version->version ?: 'Без номера версии' }} @if($version->is_current)<em>текущая</em>@endif</b><small>@if($version->effective_date){{ $version->effective_date->format('d.m.Y') }}@endif @if($version->change_note) · {{ $version->change_note }}@endif</small></div>
          @if($version->media)<a target="_blank" rel="noopener" href="{{ $version->media->url }}">Открыть ↗</a>@endif
         </div>
        @endforeach
       </div>
      </details>
     @endif
    </div>
    <div class="document-card-action">
     @if($currentMedia)<a class="btn-tech" target="_blank" rel="noopener" href="{{ $currentMedia->url }}">Открыть документ ↗</a>@else<span class="text-secondary">Файл не прикреплён</span>@endif
    </div>
   </article>
  @empty
   <div class="calendar-empty">По заданным условиям документы не найдены.</div>
  @endforelse
 </div>

 <div class="mt-4">{{ $documents->links() }}</div>
</div></section>
@endsection
