@extends('layouts.app')
@section('title','Вход студента — ЗСК')
@section('content')
<section class="student-auth-section student-auth-light"><div class="container-xxl">
 <div class="student-auth-card">
  <span class="eyebrow">STUDENT / ACCOUNT</span><h1>Личный кабинет студента</h1>
  <p>Расписание вашей группы, мероприятия и уведомления колледжа.</p>
  @if(session('registration_pending'))<div class="student-registration-pending"><b>Регистрация принята</b><span>{{ session('registration_pending') }}</span></div>@endif
  @if($errors->any())<div class="alert alert-danger">{{ $errors->first() }}</div>@endif
  <form method="post" action="{{ route('student.login.post') }}">@csrf
   <div class="field"><label>Email</label><input class="form-control" type="email" name="email" value="{{ old('email') }}" required autofocus></div>
   <div class="field"><label>Пароль</label><input class="form-control" type="password" name="password" required></div>
   <label class="check"><input type="checkbox" name="remember" value="1"> Запомнить меня</label>
   <button class="btn-tech w-100 justify-content-center">Войти</button>
  </form>
  <div class="student-auth-foot">Нет кабинета? <a href="{{ route('student.register') }}">Зарегистрироваться →</a><small>Новые регистрации становятся активными после подтверждения администратором.</small></div>
 </div>
</div></section>
@endsection
