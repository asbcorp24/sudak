@extends('dpo.layout')
@section('title','Вход в ДПО — ЗСК')
@section('content')
<section class="dpo-login-shell">
 <div class="dpo-login-card">
  <span class="eyebrow">ZSK / CONTINUING EDUCATION</span>
  <h1>Личный кабинет ДПО</h1>
  <p>Онлайн-обучение, расписание, уроки, домашние работы и результаты тестирования.</p>
  <form method="post" action="{{ route('dpo.login.post') }}">@csrf
   <div class="field"><label>Email</label><input type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus></div>
   <div class="field"><label>Пароль</label><input type="password" class="form-control" name="password" required></div>
   <label class="check"><input type="checkbox" name="remember" value="1"> Запомнить меня</label>
   <button class="btn-tech w-100 justify-content-center">Войти в обучение</button>
  </form>
  <a class="dpo-back-site" href="{{ route('home') }}">← Вернуться на сайт колледжа</a>
 </div>
</section>
@endsection