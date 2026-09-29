@extends('admin.layout')
@section('heading','ДПО / Группа / '.$group->name)
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.programs.show',$group->program) }}">← {{ $group->program->title }}</a>
 <span class="dpo-status {{ $group->status }}">{{ ['draft'=>'Черновик','active'=>'Идёт обучение','completed'=>'Завершена','archived'=>'Архив'][$group->status] }}</span>
</div>

<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.dpo.groups.update',$group) }}" class="glass-panel admin-form">@csrf @method('PUT')
   <span class="eyebrow">GROUP SETTINGS</span><h3 class="mt-2">Группа</h3>
   <div class="field"><label>Название</label><input class="form-control" name="name" value="{{ $group->name }}" required></div>
   <div class="row g-2"><div class="col-6 field"><label>Начало</label><input type="date" class="form-control" name="starts_on" value="{{ $group->starts_on?->format('Y-m-d') }}"></div><div class="col-6 field"><label>Окончание</label><input type="date" class="form-control" name="ends_on" value="{{ $group->ends_on?->format('Y-m-d') }}"></div></div>
   <div class="field"><label>Статус</label><select class="form-select" name="status">@foreach(['draft'=>'Черновик','active'=>'Идёт обучение','completed'=>'Завершена','archived'=>'Архив'] as $v=>$t)<option value="{{ $v }}" @selected($group->status===$v)>{{ $t }}</option>@endforeach</select></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="4" name="description">{{ $group->description }}</textarea></div>
   <button class="btn-tech w-100 justify-content-center">Сохранить</button>
  </form>

  <div class="glass-panel mt-4">
   <span class="eyebrow">NEW ACCOUNT</span><h3 class="mt-2">Новый пользователь ДПО</h3>
   <form method="post" action="{{ route('admin.dpo.users.store') }}" class="admin-form">@csrf
    <div class="field"><label>ФИО</label><input class="form-control" name="name" required></div>
    <div class="field"><label>Email / логин</label><input type="email" class="form-control" name="email" required></div>
    <div class="field"><label>Пароль</label><input class="form-control" name="password" value="{{ IlluminateSupportStr::random(10) }}" required></div>
    <div class="field"><label>Роль</label><select class="form-select" name="role"><option value="student">Слушатель</option><option value="teacher">Преподаватель</option><option value="manager">Менеджер ДПО</option></select></div>
    <div class="field"><label>Телефон</label><input class="form-control" name="phone"></div>
    <div class="field"><label>Организация</label><input class="form-control" name="organization"></div>
    <div class="field"><label>Должность</label><input class="form-control" name="position"></div>
    <button class="btn-ghost w-100 justify-content-center">Создать пользователя</button>
   </form>
  </div>
 </div>

 <div class="col-xl-8">
  <div class="glass-panel">
   <span class="eyebrow">ENROLLMENT</span><h3 class="mt-2">Состав группы</h3>
   <form method="post" action="{{ route('admin.dpo.enroll',$group) }}" class="admin-form">@csrf
    <div class="row g-2"><div class="col-md-7"><select class="form-select" name="user_id" required><option value="">Выберите пользователя</option>@foreach($users as $user)<option value="{{ $user->id }}">{{ $user->name }} · {{ $user->email }} · {{ $user->dpoProfile?->role }}</option>@endforeach</select></div><div class="col-md-3"><select class="form-select" name="role"><option value="student">Слушатель</option><option value="teacher">Преподаватель</option></select></div><div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Добавить</button></div></div>
   </form>
   <div class="table-responsive mt-3"><table class="table tech-table align-middle"><thead><tr><th>ФИО</th><th>Роль</th><th>Email</th><th>Статус</th><th></th></tr></thead><tbody>@forelse($group->enrollments as $enrollment)<tr><td><b>{{ $enrollment->user->name }}</b></td><td>{{ $enrollment->role==='teacher'?'Преподаватель':'Слушатель' }}</td><td>{{ $enrollment->user->email }}</td><td>{{ $enrollment->status }}</td><td class="text-end"><form method="post" action="{{ route('admin.dpo.enrollments.destroy',$enrollment) }}" onsubmit="return confirm('Удалить из группы?')">@csrf @method('DELETE')<button class="link-danger">×</button></form></td></tr>@empty<tr><td colspan="5">Группа пока пустая.</td></tr>@endforelse</tbody></table></div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">ONLINE SCHEDULE</span><h3 class="mt-2">Расписание группы</h3>
   <form method="post" action="{{ route('admin.dpo.schedule.store',$group) }}" class="admin-form">@csrf
    <div class="row g-2">
     <div class="col-md-5"><input class="form-control" name="title" placeholder="Тема занятия" required></div>
     <div class="col-md-3"><input type="datetime-local" class="form-control" name="starts_at" required></div>
     <div class="col-md-3"><input type="datetime-local" class="form-control" name="ends_at" required></div>
     <div class="col-md-1"><button class="btn-tech w-100 justify-content-center">+</button></div>
    </div>
    <div class="row g-2 mt-1">
     <div class="col-md-4"><select class="form-select" name="lesson_id"><option value="">Урок не привязан</option>@foreach($group->program->modules as $module)@foreach($module->lessons as $lesson)<option value="{{ $lesson->id }}">{{ $module->title }} / {{ $lesson->title }}</option>@endforeach @endforeach</select></div>
     <div class="col-md-4"><select class="form-select" name="teacher_user_id"><option value="">Преподаватель</option>@foreach($teachers as $teacher)<option value="{{ $teacher->id }}">{{ $teacher->name }}</option>@endforeach</select></div>
     <div class="col-md-2"><input class="form-control" name="room" placeholder="Кабинет"></div>
     <div class="col-md-2"><input class="form-control" name="online_url" placeholder="Онлайн URL"></div>
    </div>
   </form>
   <div class="dpo-admin-simple-list mt-3">
    @foreach($group->scheduleEntries as $entry)
     <div><span><b>{{ $entry->starts_at->format('d.m.Y H:i') }} · {{ $entry->title }}</b><small>{{ $entry->teacher?->name }}@if($entry->room) · {{ $entry->room }}@endif @if($entry->online_url) · онлайн@endif</small></span><form method="post" action="{{ route('admin.dpo.schedule.destroy',$entry) }}">@csrf @method('DELETE')<button class="link-danger">×</button></form></div>
    @endforeach
   </div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">ANNOUNCEMENTS</span><h3 class="mt-2">Объявление группе</h3>
   <form method="post" action="{{ route('admin.dpo.announcements.store',$group) }}" class="admin-form">@csrf
    <div class="field"><input class="form-control" name="title" placeholder="Заголовок" required></div>
    <div class="field"><textarea class="form-control" rows="3" name="body" placeholder="Текст объявления"></textarea></div>
    <button class="btn-ghost">Опубликовать</button>
   </form>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">SCORM RESULTS</span><h3 class="mt-2">Результаты iSpring / SCORM</h3>
   <div class="table-responsive">
    <table class="table tech-table align-middle">
     <thead><tr><th>Слушатель</th><th>Тест</th><th>Попытка</th><th>Статус</th><th>Балл</th><th>Последняя активность</th></tr></thead>
     <tbody>
      @forelse($scormAttempts as $attempt)
       <tr>
        <td><b>{{ $attempt->user->name }}</b></td>
        <td>{{ $attempt->package->title }}<br><small>{{ $attempt->package->lesson->title }}</small></td>
        <td>{{ $attempt->attempt_no }}</td>
        <td>{{ $attempt->lesson_status ?: trim(($attempt->completion_status ?: '').' '.($attempt->success_status ?: '')) ?: '—' }}</td>
        <td>{{ $attempt->score_raw !== null ? $attempt->score_raw : ($attempt->score_scaled !== null ? round($attempt->score_scaled*100,1).'%' : '—') }}</td>
        <td>{{ $attempt->last_accessed_at?->format('d.m.Y H:i') ?: '—' }}</td>
       </tr>
      @empty
       <tr><td colspan="6">SCORM-попыток пока нет.</td></tr>
      @endforelse
     </tbody>
    </table>
   </div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">GRADEBOOK</span><h3 class="mt-2">Домашние работы</h3>
   <div class="dpo-submission-admin-list">
    @forelse($submissions as $submission)
     <article class="dpo-submission-admin">
      <div class="d-flex justify-content-between gap-3"><div><span class="eyebrow">{{ $submission->assignment->lesson->title }}</span><h4>{{ $submission->user->name }}</h4><b>{{ $submission->assignment->title }}</b></div><span class="dpo-status {{ $submission->status }}">{{ $submission->status }}</span></div>
      @if($submission->answer_text)<p>{{ $submission->answer_text }}</p>@endif
      @if($submission->media)<a class="btn-ghost" target="_blank" href="{{ $submission->media->url }}">Открыть файл ↗</a>@endif
      <form method="post" action="{{ route('admin.dpo.submissions.review',$submission) }}" class="admin-form mt-3">@csrf
       <div class="row g-2"><div class="col-md-3"><select class="form-select" name="status"><option value="reviewed">Принято</option><option value="returned">На доработку</option></select></div><div class="col-md-3"><input type="number" step="0.01" min="0" max="{{ $submission->assignment->max_score }}" class="form-control" name="score" value="{{ $submission->score }}" placeholder="Балл / {{ $submission->assignment->max_score }}"></div><div class="col-md-6"><input class="form-control" name="feedback" value="{{ $submission->feedback }}" placeholder="Комментарий"></div></div>
       <button class="btn-tech mt-2">Сохранить проверку</button>
      </form>
     </article>
    @empty
     <div class="feedback-empty">Отправленных домашних работ пока нет.</div>
    @endforelse
   </div>
  </div>
 </div>
</div>
@endsection