@extends('layouts.app')
@section('title','Специальности — ЗСК')
@section('content')
<section class="page-hero compact"><div id="three-hero" class="three-layer" data-scene="network"></div><div class="container-xxl position-relative"><span class="eyebrow">ОБРАЗОВАТЕЛЬНЫЕ ТРАЕКТОРИИ</span><h1>Специальности</h1><p>Технические и цифровые профессии для реального производства.</p></div></section>
<section class="section-space"><div class="container-xxl"><div class="spec-grid">@foreach($specialties as $s)<a href="{{ route('specialties.show',$s->slug) }}" class="spec-card" style="--accent:{{ $s->accent }}"><span class="spec-code">{{ $s->code }}</span><h3>{{ $s->title }}</h3><p>{{ $s->duration }} · {{ $s->qualification }}</p><span class="spec-go">Открыть 3D-направление →</span></a>@endforeach</div></div></section>
@endsection