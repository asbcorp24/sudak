@extends('layouts.app')
@section('title','Контакты — Зеленодольский судостроительный колледж')
@section('description','Контакты, адрес, телефоны, электронная почта и карта Зеленодольского судостроительного колледжа.')
@section('content')
@php
$address=$settings['contact_address'] ?? '422542, Республика Татарстан, г. Зеленодольск, ул. Гастелло, д. 4';
$phone=$settings['contact_phone'] ?? '+7 (84371) 4-26-17';
$phoneExtra=$settings['contact_phone_extra'] ?? '+7 (84371) 4-24-97';
$email=$settings['contact_email'] ?? 'GAPOU.ZSK@tatar.ru';
$zoom=(int)($settings['contact_map_zoom'] ?? 17);
$lat=$settings['contact_lat'] ?? null;
$lng=$settings['contact_lng'] ?? null;
@endphp

<section class="page-hero compact feedback-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">FEEDBACK / CONTACTS</span>
  <h1>{{ $settings['contact_title'] ?? 'Контакты' }}</h1>
  <p>{{ $settings['contact_intro'] ?? 'Свяжитесь с колледжем по вопросам поступления, обучения, практики и сотрудничества.' }}</p>
 </div>
</section>

<section class="feedback-section">
 <div class="container-xxl">
  <div class="row g-4">
   <div class="col-lg-5">
    <div class="feedback-contact-card h-100">
     <span class="eyebrow">ЗЕЛЕНОДОЛЬСКИЙ СУДОСТРОИТЕЛЬНЫЙ КОЛЛЕДЖ</span>
     <h2>{{ $settings['contact_org_name'] ?? 'ГАПОУ «Зеленодольский судостроительный колледж»' }}</h2>
     <div class="contact-data">
      <div><small>Адрес</small><strong>{{ $address }}</strong></div>
      <div><small>Телефон</small><a href="tel:{{ preg_replace('/[^+0-9]/','',$phone) }}">{{ $phone }}</a></div>
      @if($phoneExtra)<div><small>Дополнительный телефон</small><a href="tel:{{ preg_replace('/[^+0-9]/','',$phoneExtra) }}">{{ $phoneExtra }}</a></div>@endif
      <div><small>Email</small><a href="mailto:{{ $email }}">{{ $email }}</a></div>
      @if(!empty($settings['contact_work_hours']))<div><small>Режим работы</small><strong>{{ $settings['contact_work_hours'] }}</strong></div>@endif
     </div>

     <div class="d-flex flex-wrap gap-2 mt-4">
      @if(!empty($settings['contact_vk']))<a class="btn-ghost" target="_blank" rel="noopener" href="{{ $settings['contact_vk'] }}">VK ↗</a>@endif
      @if(!empty($settings['contact_telegram']))<a class="btn-ghost" target="_blank" rel="noopener" href="{{ $settings['contact_telegram'] }}">Telegram ↗</a>@endif
      <a class="btn-tech" href="{{ route('admission.create') }}">Подать заявку</a>
     </div>

     @if(!empty($settings['contact_requisites']))
      <div class="contact-requisites"><span class="eyebrow">РЕКВИЗИТЫ / ИНФОРМАЦИЯ</span><div>{!! nl2br(e($settings['contact_requisites'])) !!}</div></div>
     @endif
    </div>
   </div>

   <div class="col-lg-7">
    <div class="contact-map-shell">
     @if($lat && $lng)
      <iframe title="Колледж на карте" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
       src="https://www.openstreetmap.org/export/embed.html?bbox={{ (float)$lng-0.01 }}%2C{{ (float)$lat-0.006 }}%2C{{ (float)$lng+0.01 }}%2C{{ (float)$lat+0.006 }}&layer=mapnik&marker={{ $lat }}%2C{{ $lng }}"></iframe>
     @else
      <iframe title="Колледж на карте" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
       src="https://yandex.ru/map-widget/v1/?mode=search&text={{ urlencode($address) }}&z={{ $zoom }}"></iframe>
     @endif
    </div>
    <div class="d-flex gap-2 flex-wrap mt-3">
     @if($lat && $lng)
      <a class="btn-ghost" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat={{ $lat }}&mlon={{ $lng }}#map={{ $zoom }}/{{ $lat }}/{{ $lng }}">OpenStreetMap ↗</a>
      <a class="btn-ghost" target="_blank" rel="noopener" href="https://yandex.ru/maps/?pt={{ $lng }},{{ $lat }}&z={{ $zoom }}&l=map">Яндекс Карты ↗</a>
     @else
      <a class="btn-ghost" target="_blank" rel="noopener" href="https://yandex.ru/maps/?text={{ urlencode($address) }}">Открыть в Яндекс Картах ↗</a>
     @endif
    </div>
   </div>
  </div>
 </div>
</section>
@endsection