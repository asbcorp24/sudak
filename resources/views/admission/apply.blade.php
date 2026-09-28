@extends('layouts.app')
@section('title','Заявка на поступление — ЗСК')
@section('description','Оставить заявку на поступление в Зеленодольский судостроительный колледж.')
@section('content')
<section class="page-hero compact feedback-hero">
 <div id="three-hero" class="three-layer" data-scene="shipyard"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">ADMISSION / 2026–2027</span>
  <h1>Заявка на поступление</h1>
  <p>Оставьте контакты и выберите интересующую специальность. Приёмная комиссия свяжется с вами и уточнит дальнейшие шаги.</p>
 </div>
</section>

<section class="feedback-section">
 <div class="container-xxl">
  @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
  @if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $error)<div>{{ $error }}</div>@endforeach</div>@endif

  <form class="feedback-form" method="post" action="{{ route('admission.store') }}">
   @csrf
   <div class="row g-4">
    <div class="col-md-7"><label>ФИО *</label><input class="form-control form-control-lg" name="name" value="{{ old('name') }}" required></div>
    <div class="col-md-5"><label>Дата рождения</label><input type="date" class="form-control form-control-lg" name="birth_date" value="{{ old('birth_date') }}"></div>
    <div class="col-md-6"><label>Телефон *</label><input class="form-control form-control-lg" name="phone" value="{{ old('phone') }}" required></div>
    <div class="col-md-6"><label>Email</label><input type="email" class="form-control form-control-lg" name="email" value="{{ old('email') }}"></div>
    <div class="col-12"><label>Интересующая специальность</label>
     <select class="form-select form-select-lg" name="specialty_id">
      <option value="">Пока не определился / несколько направлений</option>
      @foreach($specialties as $specialty)
       <option value="{{ $specialty->id }}" @selected(old('specialty_id',request('specialty'))==$specialty->id)>{{ $specialty->code }} · {{ $specialty->title }}</option>
      @endforeach
     </select>
    </div>
    <div class="col-12"><label>Комментарий</label><textarea class="form-control" rows="5" name="message" placeholder="Что хотите уточнить у приёмной комиссии?">{{ old('message') }}</textarea></div>
    <div class="col-12 d-flex justify-content-between align-items-center gap-3 flex-wrap">
     <small class="text-secondary">г. Зеленодольск, ул. Гастелло, 4 · GAPOU.ZSK@tatar.ru</small>
     <button class="btn-tech">Отправить заявку</button>
    </div>
   </div>
  </form>
 </div>
</section>
@endsection