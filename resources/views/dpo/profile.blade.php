@extends('dpo.layout')
@section('title','Профиль — ДПО')
@section('content')
<section class="dpo-dashboard-hero">
 <div class="container-xxl">
  <span class="eyebrow">PERSONAL PROFILE</span>
  <h1>Профиль</h1>
  <p>Контактные данные и пароль личного кабинета.</p>
 </div>
</section>
<section class="section-space">
 <div class="container-xxl">
  <div class="row justify-content-center">
   <div class="col-xl-8">
    <form method="post" action="{{ route('dpo.profile.update') }}" class="glass-panel admin-form">@csrf @method('PUT')
     <div class="row g-3">
      <div class="col-md-7 field"><label>ФИО</label><input class="form-control" name="name" value="{{ old('name',$user->name) }}" required></div>
      <div class="col-md-5 field"><label>Email / логин</label><input class="form-control" value="{{ $user->email }}" disabled></div>
      <div class="col-md-4 field"><label>Телефон</label><input class="form-control" name="phone" value="{{ old('phone',$user->dpoProfile?->phone) }}"></div>
      <div class="col-md-4 field"><label>Организация</label><input class="form-control" name="organization" value="{{ old('organization',$user->dpoProfile?->organization) }}"></div>
      <div class="col-md-4 field"><label>Должность</label><input class="form-control" name="position" value="{{ old('position',$user->dpoProfile?->position) }}"></div>
     </div>
     <hr class="my-4">
     <span class="eyebrow">PASSWORD</span><h3 class="mt-2">Сменить пароль</h3>
     <p class="text-secondary">Если пароль менять не нужно, оставьте поля ниже пустыми.</p>
     <div class="row g-3">
      <div class="col-md-4 field"><label>Текущий пароль</label><input type="password" class="form-control" name="current_password"></div>
      <div class="col-md-4 field"><label>Новый пароль</label><input type="password" class="form-control" name="password"></div>
      <div class="col-md-4 field"><label>Повторите пароль</label><input type="password" class="form-control" name="password_confirmation"></div>
     </div>
     <button class="btn-tech mt-3">Сохранить профиль</button>
    </form>
   </div>
  </div>
 </div>
</section>
@endsection