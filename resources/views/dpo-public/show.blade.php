@extends('layouts.app')
@section('title',$program->title.' — ДПО ЗСК')
@section('content')
<section class="py-5" style="background:linear-gradient(180deg,#eef7ff,#fff);min-height:70vh;color:#17364d">
 <div class="container-xxl">
  <a class="btn btn-sm btn-outline-primary mb-4" href="{{ route('dpo.catalog') }}">← Все программы ДПО</a>
  <div class="row g-4">
   <div class="col-xl-8">
    <article class="bg-white border rounded-4 p-4 p-lg-5 shadow-sm">
     <span class="eyebrow" style="color:#1769d2">{{ $program->code ?: 'ДПО' }} / {{ $program->hours }} ЧАСОВ</span>
     <h1 class="display-6 fw-bold mt-2" style="color:#123a5a">{{ $program->title }}</h1>
     @if($program->qualification)<p class="fs-5"><b>Квалификация:</b> {{ $program->qualification }}</p>@endif
     @if($program->description)<div class="mt-4">{!! nl2br(e($program->description)) !!}</div>@endif
     @if($program->learning_outcomes)<div class="mt-4"><h2 class="h4">Результаты обучения</h2><p class="text-secondary">{!! nl2br(e($program->learning_outcomes)) !!}</p></div>@endif

     @if($program->modules->count())
      <div class="mt-5"><h2 class="h4">Содержание программы</h2>
       @foreach($program->modules as $module)
        <div class="border-top py-3"><b>{{ $module->title }}</b><div class="small text-secondary mt-1">{{ $module->lessons->pluck('title')->join(' · ') }}</div></div>
       @endforeach
      </div>
     @endif
    </article>
   </div>

   <div class="col-xl-4">
    <div class="bg-white border rounded-4 p-4 shadow-sm mb-4">
     <h2 class="h5">Ближайшие группы</h2>
     @forelse($program->groups as $group)
      <div class="border-top py-3"><b>{{ $group->name }}</b><div class="small text-secondary">{{ $group->starts_on?->format('d.m.Y') ?: 'Начало уточняется' }}@if($group->ends_on) — {{ $group->ends_on->format('d.m.Y') }}@endif</div></div>
     @empty
      <p class="text-secondary mb-0">Группа формируется.</p>
     @endforelse
    </div>

    <div id="apply" class="bg-white border rounded-4 p-4 shadow-sm">
     <h2 class="h4">Подать заявку</h2>
     @if($program->applications_open)
      <p class="text-secondary small">После проверки заявки администратор привяжет или создаст учётную запись и зачислит вас в учебную группу.</p>
      @if($errors->any())<div class="alert alert-danger">{{ $errors->first() }}</div>@endif
      <form method="post" action="{{ route('dpo.apply',$program->slug) }}">@csrf
       <div class="mb-3"><label class="form-label">ФИО *</label><input class="form-control" name="name" value="{{ old('name') }}" required></div>
       <div class="mb-3"><label class="form-label">Email *</label><input type="email" class="form-control" name="email" value="{{ old('email') }}" required></div>
       <div class="mb-3"><label class="form-label">Телефон *</label><input class="form-control" name="phone" value="{{ old('phone') }}" required></div>
       <div class="mb-3"><label class="form-label">Дата рождения</label><input type="date" class="form-control" name="birth_date" value="{{ old('birth_date') }}"></div>
       <div class="mb-3"><label class="form-label">Образование</label><input class="form-control" name="education" value="{{ old('education') }}"></div>
       <div class="mb-3"><label class="form-label">Организация / место работы</label><input class="form-control" name="organization" value="{{ old('organization') }}"></div>
       <div class="mb-3"><label class="form-label">Комментарий</label><textarea class="form-control" name="comment" rows="3">{{ old('comment') }}</textarea></div>
       <label class="form-check mb-3"><input class="form-check-input" type="checkbox" name="consent" value="1" required><span class="form-check-label small">Согласен на обработку данных для оформления заявки и обучения.</span></label>
       <button class="btn btn-primary w-100">Отправить заявку</button>
      </form>
     @else
      <div class="alert alert-secondary mb-0">Приём заявок на программу временно закрыт.</div>
     @endif
    </div>
   </div>
  </div>
 </div>
</section>
@endsection
