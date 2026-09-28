@extends('layouts.app')
@section('title',$post->title.' — ЗСК')
@section('content')
<section class="page-hero compact"><div class="container-xxl position-relative"><span class="eyebrow">{{ optional($post->published_at)->format('d.m.Y') }}</span><h1>{{ $post->title }}</h1><p>{{ $post->excerpt }}</p></div></section>
<section class="section-space"><div class="container-xxl"><article class="content-prose mx-auto" style="max-width:900px">{!! $post->content !!}</article></div></section>
@endsection