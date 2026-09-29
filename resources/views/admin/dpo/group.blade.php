@extends('admin.layout')
@section('heading','ДПО / Группа / '.$group->name)
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.programs.show',$group->program) }}">← {{ $group->program->title }}</a>
 <div class="d-flex gap-2 align-items-center flex-wrap">
  <a class="btn-ghost" href="{{ route('admin.dpo.groups.journal',$group) }}">Ведомость</a>
  <a class="btn-ghost" href="{{ route('admin.dpo.groups.report.excel',$group) }}">Excel</a>
  <a class="btn-ghost" target="_blank" href="{{ route('admin.dpo.groups.report.print',$group) }}">PDF / печать</a>
  <a class="btn-ghost" href="{{ route('admin.dpo.groups.scorm',$group) }}">SCORM аналитика</a>
  <span class="dpo-status {{ $group->status }}">{{ ['draft'=>'Черновик','active'=>'Идёт обучение','completed'=>'Завершена','archived'=>'Архив'][$group->status] }}</span>
 </div>
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
    <div class="field"><label>Пароль</label><input class="form-control" name="password" value="{{ \Illuminate\Support\Str::random(10) }}" required></div>
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
   <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">
    <div><span class="eyebrow">ATTESTATION / DOCUMENTS</span><h3 class="mt-2 mb-0">Аттестация и документы</h3></div>
    @if($group->status!=='archived')
     <form method="post" action="{{ route('admin.dpo.groups.archive',$group) }}">@csrf
      <button class="btn-ghost" onclick="return confirm('Перенести группу в архив?')">Архивировать группу</button>
     </form>
    @endif
   </div>
   <p class="text-secondary mt-2">Критерии программы: уроки ≥ {{ $group->program->min_progress_percent }}%, посещаемость ≥ {{ $group->program->min_attendance_percent }}%, ДЗ ≥ {{ $group->program->min_homework_percent }}%, SCORM/тест ≥ {{ $group->program->min_scorm_percent }}%.</p>

   <div class="d-grid gap-3 mt-3">
    @forelse($group->enrollments->where('role','student') as $enrollment)
     @php($m=$completionMetrics->get($enrollment->id))
     <div class="border rounded-3 p-3">
      <div class="d-flex justify-content-between gap-3 flex-wrap">
       <div><b>{{ $enrollment->user->name }}</b><div class="small text-secondary">{{ $enrollment->user->email }} · {{ $enrollment->status }}</div></div>
       <div class="small">
        Уроки <b>{{ $m['progress_percent'] }}%</b> ·
        посещаемость <b>{{ $m['attendance_percent'] }}%</b> ·
        ДЗ <b>{{ $m['homework_percent']===null?'—':$m['homework_percent'].'%' }}</b> ·
        SCORM <b>{{ $m['scorm_percent']===null?'—':$m['scorm_percent'].'%' }}</b>
       </div>
      </div>
      <div class="mt-2">
       @if($m['ready'])<span class="badge text-bg-success">К аттестации готов</span>@else<span class="badge text-bg-warning">Критерии ещё не выполнены</span>@endif
       @if($enrollment->attestation)<span class="badge text-bg-primary">{{ $enrollment->attestation->status==='passed'?'Аттестация пройдена':($enrollment->attestation->status==='failed'?'Не аттестован':'Ожидает аттестации') }}</span>@endif
      </div>

      @if(!$enrollment->attestation || $enrollment->attestation->status!=='passed')
       <form method="post" action="{{ route('admin.dpo.attestations.store',$enrollment) }}" class="admin-form mt-3">@csrf
        <div class="row g-2">
         <div class="col-md-3"><select class="form-select" name="status"><option value="passed">Аттестован</option><option value="failed">Не аттестован</option></select></div>
         <div class="col-md-3"><input class="form-control" name="result_text" placeholder="Итог: зачтено"></div>
         <div class="col-md-4"><input class="form-control" name="notes" placeholder="Комментарий комиссии"></div>
         <div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Сохранить</button></div>
        </div>
       </form>
      @elseif(!$enrollment->attestation->document)
       <form method="post" action="{{ route('admin.dpo.documents.issue',$enrollment->attestation) }}" class="admin-form mt-3">@csrf
        <div class="row g-2">
         <div class="col-md-2"><input class="form-control" name="series" placeholder="Серия"></div>
         <div class="col-md-3"><input class="form-control" name="number" placeholder="Номер (авто)"></div>
         <div class="col-md-3"><input type="date" class="form-control" name="issued_at" value="{{ now()->format('Y-m-d') }}" required></div>
         <div class="col-md-2"><input class="form-control" name="note" placeholder="Примечание"></div>
         <div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Выдать</button></div>
        </div>
       </form>
      @else
       <div class="mt-3 d-flex align-items-center gap-2 flex-wrap">
        <span>Документ: <b>{{ trim(($enrollment->attestation->document->series ?: '').' '.$enrollment->attestation->document->number) }}</b></span>
        <a class="btn-ghost" target="_blank" href="{{ route('dpo.document.verify',$enrollment->attestation->document->verification_code) }}">Проверить ↗</a>
       </div>
      @endif
     </div>
    @empty
     <div class="feedback-empty">Слушателей в группе пока нет.</div>
    @endforelse
   </div>
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
     <div>
      <span>
       <b>{{ $entry->starts_at->format('d.m.Y H:i') }} · {{ $entry->title }}</b>
       <small>{{ $entry->teacher?->name }}@if($entry->room) · {{ $entry->room }}@endif @if($entry->online_url) · онлайн@endif · отмечено {{ $entry->attendance->count() }} чел.</small>
      </span>
      <span class="d-flex gap-2 align-items-center">
       <a class="btn-ghost" href="{{ route('admin.dpo.attendance.edit',$entry) }}">Посещаемость</a>
       <form method="post" action="{{ route('admin.dpo.schedule.destroy',$entry) }}" onsubmit="return confirm('Удалить занятие? Посещаемость этого занятия тоже будет удалена.')">@csrf @method('DELETE')<button class="link-danger">×</button></form>
      </span>
     </div>
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
   <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">
    <div><span class="eyebrow">ATTENDANCE SUMMARY</span><h3 class="mt-2 mb-0">Посещаемость группы</h3></div>
    <small class="text-secondary">Занятий в расписании: {{ $group->scheduleEntries->count() }}</small>
   </div>
   <div class="table-responsive mt-3">
    <table class="table tech-table align-middle">
     <thead><tr><th>Слушатель</th><th>Отмечено</th><th>Посещено</th><th>Отсутствовал</th><th>Уваж.</th><th>Посещаемость</th></tr></thead>
     <tbody>
      @forelse($group->enrollments->where('role','student')->where('status','active') as $enrollment)
       @php($a=$attendanceSummary->get($enrollment->user_id))
       @php($marked=(int)($a?->marked_count ?? 0))
       @php($attended=(int)($a?->attended_count ?? 0))
       <tr>
        <td><b>{{ $enrollment->user->name }}</b></td>
        <td>{{ $marked }}</td>
        <td>{{ $attended }}</td>
        <td>{{ (int)($a?->absent_count ?? 0) }}</td>
        <td>{{ (int)($a?->excused_count ?? 0) }}</td>
        <td><b>{{ $marked ? round($attended/$marked*100) : 0 }}%</b></td>
       </tr>
      @empty
       <tr><td colspan="6">Активных слушателей пока нет.</td></tr>
      @endforelse
     </tbody>
    </table>
   </div>
  </div>

  <div class="glass-panel mt-4">
   <div class="d-flex justify-content-between gap-2 align-items-center flex-wrap"><div><span class="eyebrow">SCORM RESULTS</span><h3 class="mt-2">Результаты iSpring / SCORM</h3></div><a class="btn-ghost" href="{{ route('admin.dpo.groups.scorm',$group) }}">Полная аналитика →</a></div>
   <div class="table-responsive">
    <table class="table tech-table align-middle">
     <thead><tr><th>Слушатель</th><th>Тест</th><th>Попытка</th><th>Статус</th><th>Балл</th><th>Время</th><th>Последняя активность</th></tr></thead>
     <tbody>
      @forelse($scormAttempts as $attempt)
       <tr>
        <td><b>{{ $attempt->user->name }}</b></td>
        <td>{{ $attempt->package->title }}<br><small>{{ $attempt->package->lesson->title }}</small></td>
        <td>{{ $attempt->attempt_no }}</td>
        <td>{{ $attempt->lesson_status ?: trim(($attempt->completion_status ?: '').' '.($attempt->success_status ?: '')) ?: '—' }}</td>
        <td>{{ $attempt->score_raw !== null ? $attempt->score_raw : ($attempt->score_scaled !== null ? round($attempt->score_scaled*100,1).'%' : '—') }}</td>
        <td><small>{{ $attempt->total_time ?: $attempt->session_time ?: '—' }}</small></td>
        <td>{{ $attempt->last_accessed_at?->format('d.m.Y H:i') ?: '—' }}</td>
       </tr>
      @empty
       <tr><td colspan="7">SCORM-попыток пока нет.</td></tr>
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