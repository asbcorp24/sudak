@extends('layouts.app')
@section('title',$post->title.' — ЗСК')
@section('content')
@php($cover=$post->getMedia('cover')->first())
<section class="page-hero compact news-detail-hero">
 @if($cover)<div class="page-cover-media"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $post->title }}"></div>@endif
 <div class="container-xxl position-relative"><span class="eyebrow">{{ optional($post->published_at)->format('d.m.Y') }}</span><h1>{{ $post->title }}</h1><p>{{ $post->excerpt }}</p></div>
</section>
<section class="section-space"><div class="container-xxl">
 <article class="content-prose mx-auto" style="max-width:900px">{!! $post->content !!}</article>
 <div class="mx-auto mt-5" style="max-width:1100px">@include('partials.media-block',['items'=>$post->getMedia('content')])</div>
</div></section>
@endsection