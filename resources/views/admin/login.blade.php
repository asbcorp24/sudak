<!doctype html>
<html lang="ru">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width,initial-scale=1">
 <title>Вход — CMS ЗСК</title>
 @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body class="admin-login">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <form class="login-card" method="post" action="{{ route('admin.login.post') }}">
  @csrf
  <div class="brand mb-4"><span class="brand-mark">ЗСК</span><span><b>Digital CMS</b><small>административная система</small></span></div>
  <h1>Вход</h1>

  @if(session('admin_access_error'))
   <div class="alert alert-info small">{{ session('admin_access_error') }}</div>
  @endif

  @if(!empty($currentUser) && !$currentUser->is_admin)
   <div class="alert alert-light border small">
    Сейчас вы вошли как <b>{{ $currentUser->name }}</b>.
    Введите данные администратора — текущая сессия будет переключена только после успешного входа.
   </div>
  @endif

  <label>E-mail</label>
  <input class="form-control" type="email" name="email" value="{{ old('email') }}" required autofocus>
  <label>Пароль</label>
  <input class="form-control" type="password" name="password" required>
  <label class="check"><input type="checkbox" name="remember" value="1"> Запомнить меня</label>
  @error('email')<div class="text-danger small">{{ $message }}</div>@enderror
  <button class="btn-tech w-100 justify-content-center">Войти</button>

  @if(!empty($currentUser) && $currentUser->user_type==='student')
   <a class="d-block text-center mt-3 small" href="{{ route('student.dashboard') }}">← Вернуться в кабинет студента</a>
  @else
   <a class="d-block text-center mt-3 small" href="{{ route('home') }}">← Вернуться на сайт</a>
  @endif
 </form>
</body>
</html>
