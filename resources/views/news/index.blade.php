@extends('layouts.app')
@section('title','Новости — ЗСК')
@section('content')
<section class="page-hero compact"><div id="three-hero" class="three-layer" data-scene="blueprint"></div><div class="container-xxl position-relative"><span class="eyebrow">COLLEGE FEED</span><h1>Новости</h1></div></section>
<section class="section-space"><div class="container-xxl"><div class="row g-4">@foreach($posts as $post)<div class="col-md-6 col-xl-4"><a class="news-card" href="{{ route('news.show',$post->slug) }}"><span>{{ optional($post->published_at)->format('d.m.Y') }}</span><h3>{{ $post->title }}</h3><p>{{ $post->excerpt }}</p></a></div>@endforeach</div><div class="mt-5">{{ $posts->links() }}</div></div></section>
@endsection