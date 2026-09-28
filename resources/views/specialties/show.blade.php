@extends('layouts.app')
@section('title',$specialty->code.' '.$specialty->title.' — ЗСК')
@section('description',$specialty->description)
@section('content')
<section class="specialty-hero" style="--accent:{{ $specialty->accent }}">
 <div id="three-hero" class="three-layer" data-scene="{{ $specialty->scene_key }}" data-accent="{{ $specialty->accent }}"></div><div class="scanline"></div>
 <div class="container-xxl specialty-copy"><span class="spec-code big">{{ $specialty->code }}</span><h1>{{ $specialty->title }}</h1><p>{{ $specialty->description }}</p><a class="btn-tech" href="{{ route('pages.show','applicant') }}">Как поступить <span>↗</span></a></div>
 <div class="specialty-meta"><div><small>СРОК ОБУЧЕНИЯ</small><b>{{ $specialty->duration }}</b></div><div><small>КВАЛИФИКАЦИЯ</small><b>{{ $specialty->qualification }}</b></div><div><small>БАЗА</small><b>{{ $specialty->admission_basis }}</b></div></div>
</section>
<section class="section-space"><div class="container-xxl"><div class="row g-5"><div class="col-lg-8"><span class="eyebrow">ПРОГРАММА</span><h2>Что ты будешь уметь</h2><div class="content-prose">{!! $specialty->details !!}</div></div><div class="col-lg-4"><div class="glass-panel"><span class="eyebrow">3D SCENE</span><h3>{{ strtoupper($specialty->scene_key) }}</h3><p>Сцена этого направления генерируется Three.js отдельно от остальных специальностей и реагирует на движение указателя.</p></div></div></div></div></section>
@endsection