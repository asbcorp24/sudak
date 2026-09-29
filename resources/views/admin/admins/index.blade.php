@extends('admin.layout')
@section('heading','Администраторы')
@section('content')
<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.admins.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW ADMIN</span>
   <h3 class="mt-2">Новый администратор</h3>

   <div class="field">
    <label>ФИО / имя</label>
    <input class="form-control" name="name" value="{{ old('name') }}" required>
   </div>

   <div class="field">
    <label>Email / логин</label>
    <input type="email" class="form-control" name="email" value="{{ old('email') }}" required>
   </div>

   <div class="field">
    <label>Пароль</label>
    <input class="form-control" name="password" value="{{ old('password') }}" required>
   </div>

   <div class="field">
    <label>Область доступа</label>
    <select class="form-select" name="admin_scope" required>
     <option value="site">Только сайт</option>
     <option value="schedule">Только расписание</option>
     <option value="dpo">Только ДПО / LMS</option>
     <option value="full">Полный доступ</option>
    </select>
   </div>

   <button class="btn-tech w-100 justify-content-center">Создать администратора</button>
  </form>

  <div class="glass-panel mt-4">
   <span class="eyebrow">ACCESS MATRIX</span>
   <h3 class="mt-2">Права</h3>
   <div class="admin-scope-help">
    <p><b>Сайт</b><span>Страницы, новости, специальности, сотрудники, документы, заявки, медиатека, настройки.</span></p>
    <p><b>Расписание</b><span>Расписание, группы и только преподаватели.</span></p>
    <p><b>ДПО</b><span>Программы, группы, уроки, SCORM, задания и пользователи ДПО.</span></p>
    <p><b>Полный</b><span>Все разделы и управление администраторами.</span></p>
   </div>
  </div>
 </div>

 <div class="col-xl-8">
  <div class="glass-panel">
   <span class="eyebrow">ADMIN USERS</span>
   <h3 class="mt-2">Учётные записи</h3>

   <div class="dpo-user-admin-list">
    @foreach($admins as $admin)
     <form method="post" action="{{ route('admin.admins.update',$admin) }}" class="admin-form admin-account-card">@csrf @method('PUT')
      <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
       <div>
        <b>{{ $admin->name }}</b>
        <small class="d-block text-secondary">{{ $admin->email }}</small>
       </div>
       <span class="admin-scope-badge scope-{{ $admin->adminScope() }}">
        {{ ['full'=>'Полный доступ','site'=>'Сайт','schedule'=>'Расписание','dpo'=>'ДПО'][$admin->adminScope()] ?? $admin->adminScope() }}
       </span>
      </div>

      <div class="row g-2">
       <div class="col-md-4"><input class="form-control" name="name" value="{{ $admin->name }}" required></div>
       <div class="col-md-4"><input type="email" class="form-control" name="email" value="{{ $admin->email }}" required></div>
       <div class="col-md-4">
        <select class="form-select" name="admin_scope" @disabled(auth()->id()===$admin->id)>
         <option value="full" @selected($admin->adminScope()==='full')>Полный доступ</option>
         <option value="site" @selected($admin->adminScope()==='site')>Только сайт</option>
         <option value="schedule" @selected($admin->adminScope()==='schedule')>Только расписание</option>
         <option value="dpo" @selected($admin->adminScope()==='dpo')>Только ДПО</option>
        </select>
        @if(auth()->id()===$admin->id)<input type="hidden" name="admin_scope" value="full">@endif
       </div>
       <div class="col-md-8"><input class="form-control" name="password" placeholder="Новый пароль — оставить пустым, если не менять"></div>
       <div class="col-md-4"><button class="btn-tech w-100 justify-content-center">Сохранить</button></div>
      </div>
     </form>

     @if(auth()->id()!==$admin->id)
      <form method="post" action="{{ route('admin.admins.destroy',$admin) }}" class="text-end mb-4" onsubmit="return confirm('Отключить административные права у {{ addslashes($admin->name) }}?')">@csrf @method('DELETE')
       <button class="link-danger">Снять права администратора ×</button>
      </form>
     @endif
    @endforeach
   </div>
  </div>
 </div>
</div>
@endsection