@extends('admin.layout')
@section('heading','ДПО / Конструктор курса')
@section('content')
<style>
.course-builder{--cb-border:#d9e6ef;--cb-soft:#f5f9fc;--cb-blue:#1769d2;color:#17364d}
.cb-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:18px}
.cb-toolbar-main{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.cb-grid{display:grid;grid-template-columns:340px minmax(0,1fr);gap:20px;align-items:start}
.cb-tree{position:sticky;top:18px;max-height:calc(100vh - 36px);overflow:auto;background:#fff;border:1px solid var(--cb-border);border-radius:18px;padding:14px;box-shadow:0 12px 35px rgba(27,74,109,.08)}
.cb-tree-head{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:4px 4px 12px}
.cb-module{border:1px solid var(--cb-border);border-radius:14px;background:#fff;margin-bottom:10px;overflow:hidden}
.cb-module.drag-over{outline:2px solid #78b7ee}
.cb-module-head{display:flex;align-items:center;gap:8px;padding:10px;background:#eef6fc;cursor:grab}
.cb-module-head strong{flex:1;font-size:14px}
.cb-handle{color:#7890a2;font-size:18px;line-height:1}
.cb-module-tools{display:flex;gap:4px}
.cb-icon{border:0;background:transparent;color:#537086;padding:2px 5px;font-size:13px}
.cb-lessons{padding:7px;min-height:38px}
.cb-lessons.drag-over{background:#edf7ff}
.cb-lesson{display:flex;align-items:center;gap:8px;padding:9px;border-radius:10px;color:#26485f;text-decoration:none;margin:2px 0;border:1px solid transparent;background:#fff;cursor:grab}
.cb-lesson:hover{background:#f5f9fc;color:#1769d2}.cb-lesson.active{background:#eaf5ff;border-color:#bcdcf5;color:#0e5fae}
.cb-lesson .cb-dot{width:8px;height:8px;border-radius:50%;background:#9fb5c5;flex:0 0 auto}.cb-lesson.active .cb-dot{background:#1769d2}
.cb-lesson span:nth-child(2){flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:600}
.cb-lesson small{font-size:10px;color:#8095a4}
.cb-add-lesson{padding:7px}
.cb-add-lesson form{display:flex;gap:6px}.cb-add-lesson input{font-size:12px}.cb-add-lesson button{white-space:nowrap}
.cb-add-module{border-top:1px solid var(--cb-border);margin-top:12px;padding-top:12px}
.cb-editor{min-width:0}
.cb-editor-card{background:#fff;border:1px solid var(--cb-border);border-radius:18px;padding:20px;box-shadow:0 12px 35px rgba(27,74,109,.06);margin-bottom:18px}
.cb-editor-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px}
.cb-editor-head h2{margin:4px 0 0;color:#123a5a}
.cb-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.cb-tab{border:1px solid #cfe0ec;background:#f8fbfd;color:#315a75;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:700;cursor:pointer}.cb-tab.active{background:#1769d2;border-color:#1769d2;color:#fff}
.cb-pane{display:none}.cb-pane.active{display:block}
.cb-component-list{display:grid;gap:10px}.cb-component{border:1px solid var(--cb-border);border-radius:12px;padding:12px;background:#fbfdff;display:flex;justify-content:space-between;gap:12px;align-items:center}.cb-component small{display:block;color:#7890a2}
.cb-status{font-size:12px;color:#6c8496}.cb-status.saved{color:#218653}.cb-status.error{color:#b42318}
.cb-empty{background:#fff;border:1px dashed #bcd1df;border-radius:18px;padding:50px 24px;text-align:center}.cb-empty h2{color:#123a5a}
.cb-module-settings{display:none;padding:10px;border-top:1px solid var(--cb-border);background:#fbfdff}.cb-module-settings.open{display:block}
.cb-stats{display:flex;gap:8px;flex-wrap:wrap}.cb-stat{background:#edf6fd;border:1px solid #d6e8f5;border-radius:999px;padding:5px 9px;font-size:12px}
@media(max-width:1100px){.cb-grid{grid-template-columns:1fr}.cb-tree{position:relative;top:auto;max-height:none}.cb-lessons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:650px){.cb-lessons{grid-template-columns:1fr}.cb-editor-card{padding:14px}.cb-tree{padding:10px}}
</style>

<div class="course-builder">
 <div class="cb-toolbar">
  <div class="cb-toolbar-main">
   <a class="btn-ghost" href="{{ route('admin.dpo.index') }}">← ДПО</a>
   <a class="btn-ghost" href="{{ route('admin.dpo.programs.show',$program) }}">Настройки программы</a>
   <a class="btn-ghost" target="_blank" href="{{ route('dpo.program',$program->slug) }}">Предпросмотр ↗</a>
  </div>
  <div class="cb-stats">
   <span class="cb-stat">{{ $program->modules->count() }} модулей</span>
   <span class="cb-stat">{{ $program->modules->sum(fn($m)=>$m->lessons->count()) }} уроков</span>
   <span class="cb-stat">{{ $program->hours }} ч.</span>
   <span id="builderSaveStatus" class="cb-status">Порядок сохранён</span>
  </div>
 </div>

 @if($errors->any())<div class="alert alert-danger">{{ $errors->first() }}</div>@endif

 <div class="cb-grid">
  <aside class="cb-tree">
   <div class="cb-tree-head">
    <div><span class="eyebrow">COURSE STRUCTURE</span><h3 class="h5 mb-0 mt-1">{{ $program->title }}</h3></div>
   </div>

   <div id="builderModules">
    @foreach($program->modules as $module)
     <section class="cb-module" data-module-id="{{ $module->id }}" draggable="true">
      <div class="cb-module-head">
       <span class="cb-handle">⋮⋮</span>
       <strong>{{ $module->title }}</strong>
       <span class="badge {{ $module->is_published?'text-bg-primary':'text-bg-secondary' }}">{{ $module->lessons->count() }}</span>
       <button class="cb-icon" type="button" data-module-settings="{{ $module->id }}" title="Настройки">⚙</button>
      </div>
      <div class="cb-module-settings" id="moduleSettings{{ $module->id }}">
       <form method="post" action="{{ route('admin.dpo.modules.update',$module) }}" class="admin-form">@csrf @method('PUT')
        <input class="form-control form-control-sm mb-2" name="title" value="{{ $module->title }}" required>
        <textarea class="form-control form-control-sm mb-2" name="description" rows="2" placeholder="Описание модуля">{{ $module->description }}</textarea>
        <label class="check mb-2"><input type="checkbox" name="is_published" value="1" @checked($module->is_published)> Опубликован</label>
        <button class="btn-ghost">Сохранить</button>
       </form>
       <form method="post" action="{{ route('admin.dpo.modules.destroy',$module) }}" class="mt-2 text-end" onsubmit="return confirm('Удалить модуль и все его уроки?')">@csrf @method('DELETE')<button class="link-danger">Удалить модуль</button></form>
      </div>

      <div class="cb-lessons" data-module-lessons="{{ $module->id }}">
       @foreach($module->lessons as $lesson)
        <a class="cb-lesson {{ $selectedLesson?->id===$lesson->id?'active':'' }}" draggable="true" data-lesson-id="{{ $lesson->id }}" href="{{ route('admin.dpo.builder',['program'=>$program,'lesson'=>$lesson->id]) }}">
         <span class="cb-dot"></span><span>{{ $lesson->title }}</span><small>{{ $lesson->duration_minutes }}м</small>
        </a>
       @endforeach
      </div>
      <div class="cb-add-lesson">
       <form method="post" action="{{ route('admin.dpo.lessons.store',$module) }}">@csrf
        <input type="hidden" name="builder" value="1"><input type="hidden" name="lesson_type" value="online"><input type="hidden" name="completion_mode" value="view"><input type="hidden" name="duration_minutes" value="45"><input type="hidden" name="sort" value="{{ $module->lessons->count()*10+10 }}">
        <input class="form-control form-control-sm" name="title" placeholder="+ Новый урок" required>
        <button class="btn btn-sm btn-outline-primary">+</button>
       </form>
      </div>
     </section>
    @endforeach
   </div>

   <div class="cb-add-module">
    <form method="post" action="{{ route('admin.dpo.modules.store',$program) }}" class="admin-form">@csrf
     <input class="form-control form-control-sm mb-2" name="title" placeholder="Новый модуль" required>
     <input type="hidden" name="sort" value="{{ $program->modules->count()*10+10 }}">
     <button class="btn-tech w-100 justify-content-center">+ Добавить модуль</button>
    </form>
   </div>
  </aside>

  <main class="cb-editor">
   @if($selectedLesson)
    <div class="cb-editor-card">
     <div class="cb-editor-head">
      <div><span class="eyebrow">{{ $selectedLesson->module->title }}</span><h2>{{ $selectedLesson->title }}</h2></div>
      <div class="d-flex gap-2">
       <span class="dpo-status {{ $selectedLesson->is_published?'active':'draft' }}">{{ $selectedLesson->is_published?'Опубликован':'Черновик' }}</span>
       <form method="post" action="{{ route('admin.dpo.lessons.duplicate',$selectedLesson) }}">@csrf<button class="btn-ghost">Дублировать</button></form>
       <a class="btn-ghost" href="{{ route('admin.dpo.lessons.edit',$selectedLesson) }}">Расширенный режим ↗</a>
      </div>
     </div>

     <div class="cb-tabs" data-builder-tabs>
      <button type="button" class="cb-tab active" data-tab="content">Содержание</button>
      <button type="button" class="cb-tab" data-tab="materials">Материалы <span class="badge text-bg-light">{{ $selectedLesson->resources->count() }}</span></button>
      <button type="button" class="cb-tab" data-tab="homework">Домашнее задание <span class="badge text-bg-light">{{ $selectedLesson->assignments->count() }}</span></button>
      <button type="button" class="cb-tab" data-tab="scorm">SCORM <span class="badge text-bg-light">{{ $selectedLesson->scormPackages->count() }}</span></button>
     </div>

     <div class="cb-pane active" data-pane="content">
      <form method="post" action="{{ route('admin.dpo.lessons.update',$selectedLesson) }}" class="admin-form">@csrf @method('PUT')
       <div class="field"><label>Название урока</label><input class="form-control" name="title" value="{{ $selectedLesson->title }}" required></div>
       <div class="field"><label>Краткое описание</label><textarea class="form-control" rows="2" name="description">{{ $selectedLesson->description }}</textarea></div>
       <div class="row g-3">
        <div class="col-md-4 field"><label>Длительность, мин</label><input type="number" min="0" class="form-control" name="duration_minutes" value="{{ $selectedLesson->duration_minutes }}"></div>
        <div class="col-md-4 field"><label>Завершение</label><select class="form-select" name="completion_mode">@foreach(['view'=>'По просмотру','manual'=>'Вручную','resources'=>'По материалам','scorm'=>'По SCORM'] as $v=>$t)<option value="{{ $v }}" @selected($selectedLesson->completion_mode===$v)>{{ $t }}</option>@endforeach</select></div>
        <div class="col-md-4 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ $selectedLesson->sort }}"></div>
       </div>
       <label class="check"><input type="checkbox" name="is_published" value="1" @checked($selectedLesson->is_published)> Урок опубликован</label>
       <div class="field mt-3"><label>Содержание урока</label>@include('admin.partials.rich-editor',['editorId'=>'dpo-builder-editor','name'=>'content','value'=>$selectedLesson->content,'media'=>$media])</div>
       <button class="btn-tech mt-3">Сохранить урок</button>
      </form>
     </div>

     <div class="cb-pane" data-pane="materials">
      <div class="inline-media-upload mb-3" data-media-inline-upload data-upload-url="{{ route('admin.media.store') }}" data-csrf="{{ csrf_token() }}">
       <div class="inline-media-upload-main"><input type="file" class="form-control" data-media-upload-input multiple><button type="button" class="btn-tech" data-media-upload-button>Загрузить в медиатеку</button></div>
       <small data-media-upload-status>Файл после загрузки появится в списке медиатеки.</small>
      </div>
      <form method="post" action="{{ route('admin.dpo.resources.store',$selectedLesson) }}" class="admin-form">@csrf
       <div class="row g-2">
        <div class="col-md-3"><select class="form-select" name="type"><option value="file">Файл / PDF</option><option value="video">Видео</option><option value="link">Ссылка</option></select></div>
        <div class="col-md-6"><input class="form-control" name="title" placeholder="Название материала" required></div>
        <div class="col-md-3"><input type="number" min="0" class="form-control" name="sort" value="{{ $selectedLesson->resources->count()*10+10 }}"></div>
       </div>
       <div class="row g-2 mt-2">
        <div class="col-md-6"><select class="form-select" name="media_asset_id" data-media-select><option value="">Файл из медиатеки</option>@foreach($media as $asset)<option value="{{ $asset->id }}">{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
        <div class="col-md-6"><input class="form-control" name="url" placeholder="https://... для видео/ссылки"></div>
       </div>
       <textarea class="form-control mt-2" name="description" rows="2" placeholder="Описание материала"></textarea>
       <label class="check mt-2"><input type="checkbox" name="is_required" value="1"> Обязательный материал</label>
       <button class="btn-tech mt-2">+ Добавить материал</button>
      </form>
      <div class="cb-component-list mt-4">
       @forelse($selectedLesson->resources as $resource)
        <div class="cb-component"><div><b>{{ $resource->title }}</b><small>{{ ['file'=>'Файл/PDF','video'=>'Видео','link'=>'Ссылка'][$resource->type] }}@if($resource->is_required) · обязательный@endif</small></div><form method="post" action="{{ route('admin.dpo.resources.destroy',$resource) }}">@csrf @method('DELETE')<button class="link-danger">Удалить</button></form></div>
       @empty <div class="text-secondary">Материалов пока нет.</div> @endforelse
      </div>
     </div>

     <div class="cb-pane" data-pane="homework">
      <form method="post" action="{{ route('admin.dpo.assignments.store',$selectedLesson) }}" class="admin-form">@csrf
       <div class="field"><label>Название задания</label><input class="form-control" name="title" required></div>
       <div class="field"><label>Что нужно сделать</label><textarea class="form-control" rows="5" name="description"></textarea></div>
       <div class="row g-2"><div class="col-md-4 field"><label>Макс. балл</label><input type="number" step="0.01" min="0" class="form-control" name="max_score" value="100"></div><div class="col-md-8 pt-4"><label class="check d-inline-flex me-3"><input type="checkbox" name="allow_text" value="1" checked> Текст</label><label class="check d-inline-flex"><input type="checkbox" name="allow_file" value="1" checked> Файл</label></div></div>
       <button class="btn-tech">+ Добавить задание</button>
      </form>
      <div class="cb-component-list mt-4">
       @forelse($selectedLesson->assignments as $assignment)
        <div class="cb-component"><div><b>{{ $assignment->title }}</b><small>{{ $assignment->max_score }} баллов · ответов: {{ $assignment->submissions->count() }}</small></div><span class="badge text-bg-primary">{{ $assignment->is_published?'Активно':'Черновик' }}</span></div>
       @empty <div class="text-secondary">Домашних заданий пока нет.</div> @endforelse
      </div>
     </div>

     <div class="cb-pane" data-pane="scorm">
      <div class="alert alert-info">Можно загрузить ZIP, опубликованный из iSpring как SCORM 1.2 или SCORM 2004. После загрузки режим завершения урока автоматически станет «SCORM».</div>
      <form method="post" enctype="multipart/form-data" action="{{ route('admin.dpo.scorm.store',$selectedLesson) }}" class="admin-form">@csrf
       <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ $selectedLesson->title }} — SCORM" required></div>
       <div class="field"><label>SCORM ZIP</label><input type="file" class="form-control" name="package" accept=".zip,application/zip" required></div>
       <div class="row g-2"><div class="col-md-6 field"><label>Макс. балл</label><input type="number" min="0" class="form-control" name="max_score" value="100"></div><div class="col-md-6 field"><label>Макс. попыток</label><input type="number" min="1" class="form-control" name="max_attempts" placeholder="Без лимита"></div></div>
       <button class="btn-tech">Загрузить SCORM</button>
      </form>
      <div class="cb-component-list mt-4">
       @forelse($selectedLesson->scormPackages as $package)
        <div class="cb-component"><div><b>{{ $package->title }}</b><small>SCORM {{ $package->scorm_version }} · попыток: {{ $package->attempts_count }}</small></div><form method="post" action="{{ route('admin.dpo.scorm.destroy',$package) }}" onsubmit="return confirm('Удалить SCORM и результаты попыток?')">@csrf @method('DELETE')<button class="link-danger">Удалить</button></form></div>
       @empty <div class="text-secondary">SCORM-пакетов пока нет.</div> @endforelse
      </div>
     </div>
    </div>

    <form method="post" action="{{ route('admin.dpo.lessons.destroy',$selectedLesson) }}" class="text-end" onsubmit="return confirm('Удалить урок со всеми материалами, заданиями и результатами?')">@csrf @method('DELETE')<input type="hidden" name="builder" value="1"><button class="link-danger">Удалить этот урок ×</button></form>
   @else
    <div class="cb-empty">
     <span class="eyebrow">COURSE BUILDER</span><h2 class="mt-2">Начните со структуры курса</h2>
     <p class="text-secondary">Создайте модуль слева, затем добавьте в него первый урок. Здесь появятся редактор содержания, материалы, домашнее задание и SCORM.</p>
    </div>
   @endif
  </main>
 </div>
</div>

<script>
document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('[data-builder-tabs] .cb-tab')];
 const panes=[...document.querySelectorAll('.cb-pane')];
 tabs.forEach(btn=>btn.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active')); panes.forEach(x=>x.classList.remove('active'));
  btn.classList.add('active'); document.querySelector('[data-pane="'+btn.dataset.tab+'"]')?.classList.add('active');
 }));

 document.querySelectorAll('[data-module-settings]').forEach(btn=>btn.addEventListener('click',()=>{
  document.getElementById('moduleSettings'+btn.dataset.moduleSettings)?.classList.toggle('open');
 }));

 const root=document.getElementById('builderModules');
 const status=document.getElementById('builderSaveStatus');
 let dragType=null,dragEl=null;

 const saveOrder=async()=>{
  const modules=[...root.querySelectorAll('.cb-module')].map(module=>({
   id:Number(module.dataset.moduleId),
   lessons:[...module.querySelectorAll('.cb-lesson')].map(lesson=>Number(lesson.dataset.lessonId))
  }));
  status.textContent='Сохраняю порядок…'; status.className='cb-status';
  try{
   const response=await fetch(@json(route('admin.dpo.builder.order',$program)),{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json','X-CSRF-TOKEN':@json(csrf_token())},
    body:JSON.stringify({modules})
   });
   if(!response.ok) throw new Error((await response.json()).message || 'Ошибка сохранения');
   status.textContent='Порядок сохранён'; status.className='cb-status saved';
  }catch(error){
   status.textContent=error.message || 'Не удалось сохранить'; status.className='cb-status error';
  }
 };

 root?.querySelectorAll('.cb-module').forEach(module=>{
  module.addEventListener('dragstart',e=>{
   if(e.target.closest('.cb-lesson')) return;
   dragType='module'; dragEl=module; e.dataTransfer.effectAllowed='move';
  });
  module.addEventListener('dragover',e=>{if(dragType==='module'){e.preventDefault();module.classList.add('drag-over')}});
  module.addEventListener('dragleave',()=>module.classList.remove('drag-over'));
  module.addEventListener('drop',e=>{
   if(dragType!=='module'||!dragEl||dragEl===module)return;
   e.preventDefault(); module.classList.remove('drag-over');
   const box=module.getBoundingClientRect();
   root.insertBefore(dragEl,e.clientY<box.top+box.height/2?module:module.nextSibling);
   saveOrder();
  });
 });

 root?.querySelectorAll('.cb-lesson').forEach(lesson=>{
  lesson.addEventListener('dragstart',e=>{e.stopPropagation();dragType='lesson';dragEl=lesson;e.dataTransfer.effectAllowed='move'});
  lesson.addEventListener('click',e=>{if(dragType==='lesson')e.preventDefault()});
 });

 root?.querySelectorAll('.cb-lessons').forEach(list=>{
  list.addEventListener('dragover',e=>{if(dragType==='lesson'){e.preventDefault();list.classList.add('drag-over')}});
  list.addEventListener('dragleave',()=>list.classList.remove('drag-over'));
  list.addEventListener('drop',e=>{
   if(dragType!=='lesson'||!dragEl)return;
   e.preventDefault(); list.classList.remove('drag-over');
   const target=e.target.closest('.cb-lesson');
   if(target && target!==dragEl){
    const box=target.getBoundingClientRect();
    list.insertBefore(dragEl,e.clientY<box.top+box.height/2?target:target.nextSibling);
   }else list.appendChild(dragEl);
   saveOrder();
  });
 });

 document.addEventListener('dragend',()=>{dragType=null;dragEl=null;document.querySelectorAll('.drag-over').forEach(x=>x.classList.remove('drag-over'))});
});
</script>
@endsection
