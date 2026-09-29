@extends('layouts.app')
@section('title',$page->meta_title ?: $page->title.' — ЗСК')
@section('description',$page->meta_description ?: $page->excerpt)
@section('content')
@php($cover=$page->getMedia('cover')->first())
<section class="page-hero">
 @if($cover)<div class="page-cover-media"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $page->title }}"></div>@else<div id="three-hero" class="three-layer" data-scene="blueprint"></div>@endif
 <div class="container-xxl position-relative"><span class="eyebrow">{{ strtoupper($page->page_type) }}</span><h1>{{ $page->title }}</h1>@if($page->excerpt)<p>{{ $page->excerpt }}</p>@endif</div>
</section>
<section class="section-space"><div class="container-xxl"><div class="row g-5">
 <div class="col-lg-8"><article class="content-prose">{!! $page->content !!}</article>@include('partials.media-block',['items'=>$page->getMedia('content')])</div>
 <div class="col-lg-4">
  @if($children->count())
   <aside class="side-nav">
    <b>В этом разделе</b>
    @foreach($children as $child)
     <a href="{{ route('pages.show',$child->slug) }}">{{ $child->title }} <span>↗</span></a>
    @endforeach
    @if($children->hasPages())
     <div class="section-children-pagination mt-3">{{ $children->links() }}</div>
    @endif
   </aside>
  @endif
 </div>
</div></div></section>
@endsection