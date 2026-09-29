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
$workHours=$settings['contact_work_hours'] ?? null;
@endphp

<section class="contacts-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <div class="contacts-hero-grid">
   <div class="contacts-hero-copy">
    <span class="eyebrow">ЗЕЛЕНОДОЛЬСК · РЕСПУБЛИКА ТАТАРСТАН</span>
    <h1>{{ $settings['contact_title'] ?? 'Контакты' }}</h1>
    <p>{{ $settings['contact_intro'] ?? 'Свяжитесь с колледжем по вопросам поступления, обучения, практики и сотрудничества.' }}</p>
    <div class="contacts-hero-actions">
     <a class="btn-tech" href="tel:{{ preg_replace('/[^+0-9]/','',$phone) }}">Позвонить <b>→</b></a>
     <a class="contacts-mail-link" href="mailto:{{ $email }}">{{ $email }}</a>
    </div>
   </div>
   <div class="contacts-hero-mark">
    <span>ЗСК</span>
    <strong>КОЛЛЕДЖ<br>НА СВЯЗИ</strong>
    <small>{{ $settings['contact_org_name'] ?? 'ГАПОУ «Зеленодольский судостроительный колледж»' }}</small>
   </div>
  </div>
 </div>
</section>

<section class="contacts-page">
 <div class="container-xxl">
  <div class="contacts-cards">
   <article class="contacts-card contacts-card-address">
    <span class="contacts-card-no">01</span>
    <div class="contacts-card-icon">⌖</div>
    <small>АДРЕС</small>
    <strong>{{ $address }}</strong>
    <a href="#contacts-map">Показать на карте ↓</a>
   </article>

   <article class="contacts-card">
    <span class="contacts-card-no">02</span>
    <div class="contacts-card-icon">↗</div>
    <small>ТЕЛЕФОНЫ</small>
    <a class="contacts-card-main" href="tel:{{ preg_replace('/[^+0-9]/','',$phone) }}">{{ $phone }}</a>
    @if($phoneExtra)<a class="contacts-card-sub" href="tel:{{ preg_replace('/[^+0-9]/','',$phoneExtra) }}">{{ $phoneExtra }}</a>@endif
   </article>

   <article class="contacts-card">
    <span class="contacts-card-no">03</span>
    <div class="contacts-card-icon">@</div>
    <small>ЭЛЕКТРОННАЯ ПОЧТА</small>
    <a class="contacts-card-main contacts-email" href="mailto:{{ $email }}">{{ $email }}</a>
    <span class="contacts-card-note">Для официальных обращений и вопросов</span>
   </article>

   <article class="contacts-card">
    <span class="contacts-card-no">04</span>
    <div class="contacts-card-icon">◷</div>
    <small>РЕЖИМ РАБОТЫ</small>
    @if($workHours)
     <strong>{{ $workHours }}</strong>
    @else
     <strong>Уточните по телефону</strong>
     <span class="contacts-card-note">Актуальный режим работы можно уточнить у колледжа</span>
    @endif
   </article>
  </div>

  <section id="contacts-map" class="contacts-location">
   <div class="contacts-location-info">
    <span class="eyebrow">КАК НАС НАЙТИ</span>
    <h2>Мы в Зеленодольске</h2>
    <p>{{ $address }}</p>

    <div class="contacts-location-meta">
     <div><span>ТЕЛЕФОН</span><a href="tel:{{ preg_replace('/[^+0-9]/','',$phone) }}">{{ $phone }}</a></div>
     <div><span>EMAIL</span><a href="mailto:{{ $email }}">{{ $email }}</a></div>
     @if($workHours)<div><span>РЕЖИМ РАБОТЫ</span><strong>{{ $workHours }}</strong></div>@endif
    </div>

    <div class="contacts-map-actions">
     @if($lat && $lng)
      <a class="btn-tech" target="_blank" rel="noopener" href="https://yandex.ru/maps/?pt={{ $lng }},{{ $lat }}&z={{ $zoom }}&l=map">Открыть маршрут <b>↗</b></a>
      <a class="btn-ghost" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat={{ $lat }}&mlon={{ $lng }}#map={{ $zoom }}/{{ $lat }}/{{ $lng }}">OpenStreetMap ↗</a>
     @else
      <a class="btn-tech" target="_blank" rel="noopener" href="https://yandex.ru/maps/?text={{ urlencode($address) }}">Открыть маршрут <b>↗</b></a>
     @endif
    </div>
   </div>

   <div class="contacts-map-frame">
    <div class="contacts-map-label"><span>⌖</span><b>Зеленодольский<br>судостроительный колледж</b></div>
    @if($lat && $lng)
     <iframe title="Колледж на карте" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.openstreetmap.org/export/embed.html?bbox={{ (float)$lng-0.01 }}%2C{{ (float)$lat-0.006 }}%2C{{ (float)$lng+0.01 }}%2C{{ (float)$lat+0.006 }}&layer=mapnik&marker={{ $lat }}%2C{{ $lng }}"></iframe>
    @else
     <iframe title="Колледж на карте" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://yandex.ru/map-widget/v1/?mode=search&text={{ urlencode($address) }}&z={{ $zoom }}"></iframe>
    @endif
   </div>
  </section>

  <section class="contacts-bottom">
   <div class="contacts-connect">
    <span class="eyebrow">ОСТАВАЙТЕСЬ НА СВЯЗИ</span>
    <h2>Колледж<br>в сети</h2>
    <p>Новости, события и жизнь Зеленодольского судостроительного колледжа.</p>
    <div class="contacts-socials">
     @if(!empty($settings['contact_vk']))<a target="_blank" rel="noopener" href="{{ $settings['contact_vk'] }}"><span>VK</span><b>ВКонтакте</b><i>↗</i></a>@endif
     @if(!empty($settings['contact_telegram']))<a target="_blank" rel="noopener" href="{{ $settings['contact_telegram'] }}"><span>TG</span><b>Telegram</b><i>↗</i></a>@endif
    </div>
    <a class="contacts-apply" href="{{ route('admission.create') }}"><span>ПОСТУПЛЕНИЕ</span><b>Подать заявку в колледж</b><i>→</i></a>
   </div>

   <div class="contacts-details">
    <span class="eyebrow">ОРГАНИЗАЦИЯ</span>
    <h3>{{ $settings['contact_org_name'] ?? 'ГАПОУ «Зеленодольский судостроительный колледж»' }}</h3>
    @if(!empty($settings['contact_requisites']))
     <div class="contacts-requisites">{!! nl2br(e($settings['contact_requisites'])) !!}</div>
    @else
     <div class="contacts-requisites-empty">
      <span>РЕКВИЗИТЫ</span>
      <p>Дополнительные сведения об организации можно получить по телефону или электронной почте колледжа.</p>
     </div>
    @endif
   </div>
  </section>
 </div>
</section>
@endsection
