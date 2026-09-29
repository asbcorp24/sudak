@extends('layouts.app')
@section('title','Дополнительное профессиональное образование — ЗСК')
@section('content')
<section class="py-5" style="background:linear-gradient(180deg,#eef7ff,#fff);min-height:70vh;color:#17364d">
 <div class="container-xxl">
  <div class="mb-5">
   <span class="eyebrow" style="color:#1769d2">ДПО / ЗСК</span>
   <h1 class="display-5 fw-bold mt-2" style="color:#123a5a">Программы дополнительного образования</h1>
   <p class="lead text-secondary mb-0">Выберите программу, подайте заявку и после подтверждения продолжите обучение в личном кабинете ДПО.</p>
  </div>

  <div class="row g-4">
   @forelse($programs as $program)
    @php($next=$program->groups->first())
    <div class="col-lg-6">
     <article class="bg-white border rounded-4 p-4 h-100 shadow-sm">
      <div class="d-flex justify-content-between gap-3 align-items-start">
       <div><small class="text-primary fw-bold">{{ $program->code ?: 'ДПО' }}</small><h2 class="h4 mt-2" style="color:#123a5a">{{ $program->title }}</h2></div>
       <span class="badge text-bg-primary">{{ $program->hours }} ч.</span>
      </div>
      @if($program->qualification)<p class="mb-2"><b>Квалификация:</b> {{ $program->qualification }}</p>@endif
      <p class="text-secondary">{{ IlluminateSupportStr::limit($program->description,220) }}</p>
      <div class="small text-secondary mb-4">
       @if($next)<b>Ближайший набор:</b> {{ $next->starts_on?->format('d.m.Y') ?: 'дата уточняется' }} · {{ $next->name }}
       @else Набор формируется. Заявку можно оставить заранее. @endif
      </div>
      <div class="d-flex gap-2 flex-wrap mt-auto">
       <a class="btn btn-primary" href="{{ route('dpo.program',$program->slug) }}">О программе</a>
       @if($program->applications_open)<a class="btn btn-outline-primary" href="{{ route('dpo.program',$program->slug) }}#apply">Подать заявку</a>@endif
      </div>
     </article>
    </div>
   @empty
    <div class="col-12"><div class="bg-white border rounded-4 p-5 text-center text-secondary">Опубликованных программ ДПО пока нет.</div></div>
   @endforelse
  </div>
 </div>
</section>
@endsection
