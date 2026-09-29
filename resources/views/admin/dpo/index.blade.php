@extends('admin.layout')
@section('heading','ДПО / LMS')
@section('content')
<div class="dpo-admin-stats mb-4">
 <a class="admin-stat" href="#programs"><span>Программы</span><b>{{ $programs->count() }}</b><small>учебные программы ДПО</small></a>
 <div class="admin-stat"><span>Активные группы</span><b>{{ $activeGroups }}</b><small>идёт обучение</small></div>
 <div class="admin-stat"><span>Слушатели</span><b>{{ $students }}</b><small>учётных записей</small></div>
 <div class="admin-stat"><span>Преподаватели</span><b>{{ $teachers }}</b><small>учётных записей</small></div>
 <div class="admin-stat"><span>На проверке</span><b>{{ $submissionsToReview }}</b><small>домашних работ</small></div>
</div>

<div class="row g-4">
 <div class="col-xl-4">
  <form method="post" action="{{ route('admin.dpo.programs.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW PROGRAM</span><h3 class="mt-2">Новая программа ДПО</h3>
   <div class="field"><label>Код</label><input class="form-control" name="code" placeholder="ДПО-001"></div>
   <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" placeholder="автоматически"></div>
   <div class="field"><label>Объём, часов</label><input type="number" min="0" class="form-control" name="hours" value="40" required></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="5" name="description"></textarea></div>
   <div class="field"><label>Планируемые результаты обучения</label><textarea class="form-control" rows="5" name="learning_outcomes"></textarea></div>
   <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="0"></div>
   <label class="check"><input type="checkbox" name="is_published" value="1"> Показывать слушателям</label>
   <button class="btn-tech w-100 justify-content-center">Создать программу</button>
  </form>
 </div>
 <div class="col-xl-8" id="programs">
  <div class="glass-panel">
   <div class="d-flex justify-content-between align-items-center gap-3 mb-3"><div><span class="eyebrow">PROGRAMS</span><h3 class="mt-2 mb-0">Программы обучения</h3></div><a class="btn-ghost" target="_blank" href="{{ route('dpo.login') }}">Открыть ДПО ↗</a></div>
   <div class="dpo-program-admin-list">
    @forelse($programs as $program)
     <a class="dpo-program-admin-card" href="{{ route('admin.dpo.programs.show',$program) }}">
      <div><span class="eyebrow">{{ $program->code ?: 'ДПО' }}</span><h4>{{ $program->title }}</h4><p>{{ $program->description }}</p></div>
      <div class="dpo-program-admin-meta"><b>{{ $program->hours }}</b><small>часов</small><b>{{ $program->groups_count }}</b><small>групп</small><b>{{ $program->modules_count }}</b><small>модулей</small></div>
      <span class="dpo-status {{ $program->is_published?'active':'draft' }}">{{ $program->is_published?'Опубликована':'Черновик' }}</span>
     </a>
    @empty
     <div class="feedback-empty">Программ ДПО пока нет.</div>
    @endforelse
   </div>
  </div>
 </div>
</div>
@endsection