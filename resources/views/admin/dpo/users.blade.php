@extends('admin.layout')
@section('heading','ДПО / Пользователи')
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.index') }}">← ДПО / LMS</a>
 <form method="get" class="d-flex gap-2 flex-wrap">
  <input class="form-control" name="q" value="{{ request('q') }}" placeholder="ФИО или email">
  <select class="form-select" name="role"><option value="">Все роли</option><option value="student" @selected(request('role')==='student')>Слушатели</option><option value="teacher" @selected(request('role')==='teacher')>Преподаватели</option><option value="manager" @selected(request('role')==='manager')>Менеджеры</option></select>
  <button class="btn-tech">Найти</button>
 </form>
</div>

<div class="dpo-user-admin-list">
 @forelse($users as $user)
  <form method="post" action="{{ route('admin.dpo.users.update',$user) }}" class="glass-panel admin-form mb-3">@csrf @method('PUT')
   <div class="row g-3 align-items-end">
    <div class="col-lg-3 field"><label>ФИО</label><input class="form-control" name="name" value="{{ $user->name }}" required></div>
    <div class="col-lg-3 field"><label>Email / логин</label><input type="email" class="form-control" name="email" value="{{ $user->email }}" required></div>
    <div class="col-lg-2 field"><label>Роль</label><select class="form-select" name="role"><option value="student" @selected($user->dpoProfile->role==='student')>Слушатель</option><option value="teacher" @selected($user->dpoProfile->role==='teacher')>Преподаватель</option><option value="manager" @selected($user->dpoProfile->role==='manager')>Менеджер</option></select></div>
    <div class="col-lg-2 field"><label>Телефон</label><input class="form-control" name="phone" value="{{ $user->dpoProfile->phone }}"></div>
    <div class="col-lg-2 field"><label>Новый пароль</label><input class="form-control" name="password" placeholder="не менять"></div>
    <div class="col-md-5 field"><label>Организация</label><input class="form-control" name="organization" value="{{ $user->dpoProfile->organization }}"></div>
    <div class="col-md-5 field"><label>Должность</label><input class="form-control" name="position" value="{{ $user->dpoProfile->position }}"></div>
    <div class="col-md-2"><label class="check"><input type="checkbox" name="is_active" value="1" @checked($user->dpoProfile->is_active)> Активен</label></div>
    <div class="col-12 text-end"><button class="btn-tech">Сохранить</button></div>
   </div>
  </form>
 @empty
  <div class="feedback-empty">Пользователи ДПО не найдены.</div>
 @endforelse
</div>
<div class="mt-4">{{ $users->links() }}</div>
@endsection