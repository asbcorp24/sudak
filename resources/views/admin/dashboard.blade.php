@extends('admin.layout') @section('title','Панель — CMS ЗСК') @section('heading','Центр управления сайтом') @section('content')
<div class="admin-grid">
 <a href="{{ route('admin.pages.index') }}" class="admin-stat"><span>Разделы / страницы</span><b>{{ $pagesCount }}</b><small>иерархическая CMS</small></a>
 <a href="{{ route('admin.specialties.index') }}" class="admin-stat"><span>Специальности</span><b>{{ $specialtiesCount }}</b><small>отдельные Three.js-сцены</small></a>
 <a href="{{ route('admin.news.index') }}" class="admin-stat"><span>Новости</span><b>{{ $newsCount }}</b><small>публикации колледжа</small></a>
 <a href="{{ route('admin.media.index') }}" class="admin-stat"><span>Медиа</span><b>{{ $mediaCount }}</b><small>фото, документы и 3D</small></a>
 <a href="{{ route('admin.schedule.index') }}" class="admin-stat"><span>Расписание сегодня</span><b>{{ $scheduleCount }}</b><small>занятий в таблице</small></a>
</div>
<div class="glass-panel mt-4"><span class="eyebrow">SYSTEM STATUS</span><h2>Центр управления</h2><p>Разделы, новости, единая медиатека, специальности и отдельный модуль расписания управляются из одной административной панели.</p></div>
@endsection