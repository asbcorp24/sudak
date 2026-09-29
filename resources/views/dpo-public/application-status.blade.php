@extends('layouts.app')
@section('title','Статус заявки ДПО — ЗСК')
@section('content')
<section class="py-5" style="background:#f4f9fd;min-height:70vh;color:#17364d">
 <div class="container" style="max-width:900px">
  <div class="bg-white border rounded-4 p-4 p-lg-5 shadow-sm">
   <span class="eyebrow" style="color:#1769d2">ЗАЯВКА ДПО / #{{ $application->id }}</span>
   <h1 class="h2 mt-2">{{ $application->program->title }}</h1>
   @php($labels=['pending'=>'На рассмотрении','approved'=>'Подтверждена','rejected'=>'Отклонена','enrolled'=>'Вы зачислены','completed'=>'Обучение завершено','archived'=>'Документ выдан / архив'])
   <div class="alert alert-primary mt-4"><b>Статус:</b> {{ $labels[$application->status] ?? $application->status }}</div>
   <p><b>ФИО:</b> {{ $application->name }}<br><b>Email:</b> {{ $application->email }}<br><b>Телефон:</b> {{ $application->phone }}</p>
   @if($application->group)<p><b>Учебная группа:</b> {{ $application->group->name }}@if($application->group->starts_on) · с {{ $application->group->starts_on->format('d.m.Y') }}@endif</p>@endif
   @if($application->admin_note)<div class="border rounded-3 p-3 mb-3"><b>Комментарий:</b><br>{{ $application->admin_note }}</div>@endif
   @if(in_array($application->status,['enrolled','completed','archived'],true))<a class="btn btn-primary" href="{{ route('dpo.login') }}">Перейти в кабинет ДПО</a>@endif
   <a class="btn btn-outline-primary" href="{{ route('dpo.catalog') }}">Программы ДПО</a>
  </div>
 </div>
</section>
@endsection
