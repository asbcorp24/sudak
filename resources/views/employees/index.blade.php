@extends('layouts.app')
@section('title','Сотрудники — Зеленодольский судостроительный колледж')
@section('description','Руководство, преподаватели и сотрудники Зеленодольского судостроительного колледжа.')
@section('content')
<section class="page-hero compact employees-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">TEAM / COLLEGE</span>
  <h1>Сотрудники</h1>
  <p>Руководство, преподаватели и специалисты колледжа.</p>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="employee-filters">
   <a class="{{ !$activeType?'active':'' }}" href="{{ route('employees.index') }}">Все</a>
   <a class="{{ $activeType==='leadership'?'active':'' }}" href="{{ route('employees.index',['type'=>'leadership']) }}">Руководство</a>
   <a class="{{ $activeType==='teacher'?'active':'' }}" href="{{ route('employees.index',['type'=>'teacher']) }}">Преподаватели</a>
   <a class="{{ $activeType==='staff'?'active':'' }}" href="{{ route('employees.index',['type'=>'staff']) }}">Сотрудники</a>
  </div>

  <div class="employees-grid">
   @forelse($employees as $employee)
    @php($photo=$employee->getMedia('photo')->first())
    <article class="employee-card">
     <div class="employee-photo">
      @if($photo)<img src="{{ $photo->url }}" alt="{{ $photo->alt ?: $employee->full_name }}">@else<span>{{ mb_substr($employee->full_name,0,1) }}</span>@endif
     </div>
     <div class="employee-content">
      <span class="eyebrow">{{ ['leadership'=>'РУКОВОДСТВО','teacher'=>'ПРЕПОДАВАТЕЛЬ','staff'=>'СОТРУДНИК'][$employee->employee_type] ?? 'СОТРУДНИК' }}</span>
      <h2>{{ $employee->full_name }}</h2>
      @if($employee->position)<strong>{{ $employee->position }}</strong>@endif
      @if($employee->disciplines)<div class="employee-detail"><b>Дисциплины</b><p>{!! nl2br(e($employee->disciplines)) !!}</p></div>@endif
      @if($employee->education)<div class="employee-detail"><b>Образование</b><p>{!! nl2br(e($employee->education)) !!}</p></div>@endif
      @if($employee->qualification)<div class="employee-detail"><b>Квалификация</b><p>{!! nl2br(e($employee->qualification)) !!}</p></div>@endif
      @if($employee->achievements)<div class="employee-detail"><b>Достижения</b><p>{!! nl2br(e($employee->achievements)) !!}</p></div>@endif
      @if($employee->bio)<div class="employee-detail"><b>О сотруднике</b><p>{!! nl2br(e($employee->bio)) !!}</p></div>@endif
      @if($employee->email || $employee->phone)
       <div class="employee-contacts">
        @if($employee->email)<a href="mailto:{{ $employee->email }}">{{ $employee->email }}</a>@endif
        @if($employee->phone)<a href="tel:{{ preg_replace('/[^+0-9]/','',$employee->phone) }}">{{ $employee->phone }}</a>@endif
       </div>
      @endif
     </div>
    </article>
   @empty
    <div class="feedback-empty">В этом разделе пока нет опубликованных сотрудников.</div>
   @endforelse
  </div>
 </div>
</section>
@endsection