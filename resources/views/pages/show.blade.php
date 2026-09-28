@extends('layouts.app')
@section('title',$page->meta_title ?: $page->title.' — ЗСК')
@section('description',$page->meta_description ?: $page->excerpt)
@section('content')
<section class="page-hero"><div id="three-hero" class="three-layer" data-scene="blueprint"></div><div class="container-xxl position-relative"><span class="eyebrow">{{ strtoupper($page->page_type) }}</span><h1>{{ $page->title }}</h1>@if($page->excerpt)<p>{{ $page->excerpt }}</p>@endif</div></section>
<section class="section-space"><div class="container-xxl"><div class="row g-5"><div class="col-lg-8"><article class="content-prose">{!! $page->content !!}</article></div><div class="col-lg-4">@if($page->children->count())<aside class="side-nav"><b>В этом разделе</b>@foreach($page->children as $child)<a href="{{ route('pages.show',$child->slug) }}">{{ $child->title }} <span>↗</span></a>@endforeach</aside>@endif</div></div></div></section>
@endsection