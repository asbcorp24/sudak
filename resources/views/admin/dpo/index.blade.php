@extends('admin.layout')
@section('heading','ДПО / LMS')
@section('content')
<div class="d-flex justify-content-end gap-2 flex-wrap mb-3">
 <a class="btn-ghost" href="{{ route('admin.dpo.index') }}">Текущие программы</a>
 <a class="btn-ghost" href="{{ route('admin.dpo.index',['archive'=>1]) }}">Архив программ</a>
 <a class="btn-ghost" target="_blank" href="{{ route('dpo.catalog') }}">Каталог ДПО ↗</a>
 <a class="btn-ghost" href="{{ route('admin.dpo.applications.index') }}">Заявки <b>{{ $pendingApplications }}</b></a>
 <a class="btn-ghost" href="{{ route('admin.dpo.documents.index') }}">Реестр документов <b>{{ $issuedDocuments }}</b></a>
 <a class="btn-ghost" href="{{ route('admin.dpo.users.index') }}">Пользователи ДПО →</a>
</div>
<div class="dpo-admin-stats mb-4">
 <a class="admin-stat" href="#programs"><span>Программы</span><b>{{ $programs->count() }}</b><small>учебные программы ДПО</small></a>
 <div class="admin-stat"><span>Активные группы</span><b>{{ $activeGroups }}</b><small>идёт обучение</small></div>
 <div class="admin-stat"><span>Слушатели</span><b>{{ $students }}</b><small>учётных записей</small></div>
 <div class="admin-stat"><span>Преподаватели</span><b>{{ $teachers }}</b><small>учётных записей</small></div>
 <div class="admin-stat"><span>Новые заявки</span><b>{{ $pendingApplications }}</b><small>ждут подтверждения</small></div>
 <div class="admin-stat"><span>На проверке</span><b>{{ $submissionsToReview }}</b><small>домашних работ</small></div>
</div>

<div class="glass-panel mb-4">
 <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
  <div><span class="eyebrow">EXCEL IMPORT</span><h3 class="mt-2">Массовый импорт слушателей</h3><p class="text-secondary mb-0">XLSX или CSV. Колонки: ФИО, Email, Телефон, Организация, Должность, Группа, Пароль. Если Email или Пароль не указаны — они будут сформированы автоматически.</p></div>
 </div>
 <form method="post" enctype="multipart/form-data" action="{{ route('admin.dpo.import.students') }}" class="admin-form mt-3">@csrf
  <div class="row g-2"><div class="col-md-5"><input type="file" class="form-control" name="file" accept=".xlsx,.csv,text/csv" required></div><div class="col-md-5"><select class="form-select" name="group_id"><option value="">Группа берётся из Excel</option>@foreach($importGroups as $group)<option value="{{ $group->id }}">{{ $group->program->title }} / {{ $group->name }}</option>@endforeach</select></div><div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Импорт</button></div></div>
 </form>
 @if(session('dpo_import_credentials'))
  <div class="alert alert-warning mt-3 mb-0"><b>Сохраните пароли — они показываются один раз.</b><div class="table-responsive mt-2"><table class="table table-sm mb-0"><thead><tr><th>ФИО</th><th>Логин</th><th>Пароль</th><th>Группа</th></tr></thead><tbody>@foreach(session('dpo_import_credentials') as $row)<tr><td>{{ $row['name'] }}</td><td>{{ $row['email'] }}</td><td><code>{{ $row['password'] }}</code></td><td>{{ $row['group'] }}</td></tr>@endforeach</tbody></table></div></div>
 @endif
 @if(session('dpo_import_errors'))<div class="alert alert-danger mt-3 mb-0">@foreach(session('dpo_import_errors') as $error)<div>{{ $error }}</div>@endforeach</div>@endif
</div>

<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.dpo.programs.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW PROGRAM</span><h3 class="mt-2">Новая программа ДПО</h3>
   <div class="field"><label>Код</label><input class="form-control" name="code" placeholder="ДПО-001"></div>
   <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" placeholder="автоматически"></div>
   <div class="field"><label>Объём, часов</label><input type="number" min="0" class="form-control" name="hours" value="40" required></div>
   <div class="field"><label>Квалификация</label><input class="form-control" name="qualification"></div>
   <div class="field"><label>Вид выдаваемого документа</label><input class="form-control" name="document_type" value="Удостоверение о повышении квалификации"></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="5" name="description"></textarea></div>
   <div class="field"><label>Планируемые результаты обучения</label><textarea class="form-control" rows="5" name="learning_outcomes"></textarea></div>
   <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
   <label class="check"><input type="checkbox" name="is_published" value="1"> Опубликовать программу</label>
   <label class="check"><input type="checkbox" name="applications_open" value="1" checked> Принимать заявки</label>
   <input type="hidden" name="min_progress_percent" value="100"><input type="hidden" name="min_attendance_percent" value="0"><input type="hidden" name="min_homework_percent" value="0"><input type="hidden" name="min_scorm_percent" value="70">
   <button class="btn-tech w-100 justify-content-center">Создать программу</button>
  </form>
 </div>
 <div class="col-xl-8" id="programs">
  <div class="glass-panel">
   <div class="d-flex justify-content-between align-items-center gap-3 mb-3"><div><span class="eyebrow">PROGRAMS</span><h3 class="mt-2 mb-0">Программы обучения</h3></div><a class="btn-ghost" target="_blank" href="{{ route('dpo.catalog') }}">Открыть каталог ↗</a></div>
   <div class="dpo-program-admin-list">
    @forelse($programs as $program)
     <a class="dpo-program-admin-card" href="{{ route('admin.dpo.builder',$program) }}">
      <div><span class="eyebrow">{{ $program->code ?: 'ДПО' }}</span><h4>{{ $program->title }}</h4><p>{{ $program->description }}</p></div>
      <div class="dpo-program-admin-meta"><b>{{ $program->hours }}</b><small>часов</small><b>{{ $program->groups_count }}</b><small>групп</small><b>{{ $program->modules_count }}</b><small>модулей</small></div>
      <div><span class="dpo-status {{ $program->is_published?'active':'draft' }}">{{ $program->is_published?'Опубликована':'Черновик' }}</span><small class="d-block mt-2 text-primary">Открыть конструктор →</small></div>
     </a>
    @empty
     <div class="feedback-empty">Программ ДПО пока нет.</div>
    @endforelse
   </div>
  </div>
 </div>
</div>
@endsection