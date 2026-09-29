@extends('layouts.app')
@section('title','Регистрация студента — ЗСК')
@section('content')
<section class="student-auth-section student-auth-light"><div class="container-xxl">
 <div class="student-auth-card wide">
  <span class="eyebrow">STUDENT / REGISTRATION</span><h1>Создать кабинет</h1>
  <p>Заполните данные студента. После отправки администратор колледжа проверит регистрацию и откроет доступ к личному кабинету.</p>
  <div class="student-approval-notice"><b>Как это работает</b><span>1. Заполняете форму</span><span>2. Администратор проверяет ФИО и группу</span><span>3. После подтверждения можно войти</span></div>
  @if($errors->any())<div class="alert alert-danger">{{ $errors->first() }}</div>@endif
  <form method="post" action="{{ route('student.register.post') }}">@csrf
   <div class="row g-3">
    <div class="col-md-7 field"><label>ФИО</label><input class="form-control" name="name" value="{{ old('name') }}" required></div>
    <div class="col-md-5 field"><label>Группа</label><select class="form-select" name="schedule_group_id" required><option value="">Выберите группу</option>@foreach($groups as $group)<option value="{{ $group->id }}" @selected(old('schedule_group_id')==$group->id)>{{ $group->name }}</option>@endforeach</select></div>
    <div class="col-md-7 field"><label>Email</label><input class="form-control" type="email" name="email" value="{{ old('email') }}" required></div>
    <div class="col-md-5 field"><label>№ студенческого</label><input class="form-control" name="student_number" value="{{ old('student_number') }}" placeholder="необязательно"></div>
    <div class="col-md-6 field"><label>Пароль</label><input class="form-control" type="password" name="password" minlength="6" required></div>
    <div class="col-md-6 field"><label>Повторите пароль</label><input class="form-control" type="password" name="password_confirmation" minlength="6" required></div>
   </div>
   <button class="btn-tech w-100 justify-content-center mt-2">Отправить регистрацию на проверку</button>
  </form>
  <div class="student-auth-foot">Уже зарегистрированы? <a href="{{ route('student.login') }}">Войти →</a></div>
 </div>
</div></section>
@endsection
