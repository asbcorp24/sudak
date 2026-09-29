@extends('layouts.app')
@section('title','Новости — ЗСК')
@section('content')
<section class="page-hero compact">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative"><span class="eyebrow">COLLEGE FEED</span><h1>Новости</h1></div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <form method="get" action="{{ route('news.index') }}" class="news-date-filter mb-5">
   <div class="schedule-filter-field">
    <label for="news-date-from">С даты</label>
    <input id="news-date-from" type="date" class="form-control" name="date_from" value="{{ request('date_from') }}">
   </div>
   <div class="schedule-filter-field">
    <label for="news-date-to">По дату</label>
    <input id="news-date-to" type="date" class="form-control" name="date_to" value="{{ request('date_to') }}">
   </div>
   <div class="news-date-filter-actions">
    <button class="btn-tech" type="submit">Показать</button>
    @if(request()->filled('date_from') || request()->filled('date_to'))
     <a class="btn-ghost" href="{{ route('news.index') }}">Сбросить</a>
    @endif
   </div>
  </form>

  @if($posts->count())
   <div class="row g-4">
    @foreach($posts as $post)
     @php($cover=$post->getMedia('cover')->first())
     <div class="col-md-6 col-xl-4">
      <a class="news-card {{ $cover?'has-cover':'' }}" href="{{ route('news.show',$post->slug) }}">
       @if($cover)<span class="news-card-cover"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $post->title }}"></span>@endif
       <span>{{ optional($post->published_at)->format('d.m.Y') }}</span>
       <h3>{{ $post->title }}</h3>
       <p>{{ $post->excerpt }}</p>
      </a>
     </div>
    @endforeach
   </div>
   <div class="list-pagination mt-5">
    <small>Показано {{ $posts->firstItem() }}–{{ $posts->lastItem() }} из {{ $posts->total() }}</small>
    {{ $posts->links() }}
   </div>
  @else
   <div class="glass-panel">За выбранный период новостей нет.</div>
  @endif
 </div>
</section>
@endsection
