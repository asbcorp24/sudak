@extends('dpo.layout')
@section('title',$lesson->title.' — ДПО')
@section('content')
<section class="dpo-lesson-hero">
 <div class="container-xxl">
  <a class="dpo-breadcrumb" href="{{ route('dpo.groups.show',$group) }}">← {{ $lesson->module->program->title }}</a>
  <span class="eyebrow">{{ $lesson->module->title }}</span>
  <h1>{{ $lesson->title }}</h1>
  <p>{{ $lesson->description }}</p>
  <div class="dpo-course-meta"><span>{{ $lesson->duration_minutes }} мин</span><span>{{ ['manual'=>'ручное завершение','view'=>'по просмотру','resources'=>'по материалам','scorm'=>'по SCORM'][$lesson->completion_mode] }}</span><span class="dpo-status {{ $progress->status }}">{{ ['not_started'=>'Не начат','in_progress'=>'В процессе','completed'=>'Завершён'][$progress->status] }}</span></div>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="dpo-dashboard-grid">
   <div class="dpo-main-column">
    @if($lesson->content)<article class="content-prose dpo-lesson-content">{!! $lesson->content !!}</article>@endif

    @if($lesson->resources->count())
     <section class="dpo-lesson-block">
      <div class="section-head"><div><span class="eyebrow">MATERIALS</span><h2>Материалы урока</h2></div></div>
      <div class="dpo-resource-grid">
       @foreach($lesson->resources as $resource)
        <article class="dpo-resource-card">
         <span class="dpo-resource-type">{{ ['file'=>'FILE','video'=>'VIDEO','link'=>'LINK'][$resource->type] }}</span>
         <h3>{{ $resource->title }}</h3>
         @if($resource->description)<p>{{ $resource->description }}</p>@endif
         @if($resource->type==='file' && $resource->media)<a class="btn-ghost" target="_blank" href="{{ $resource->media->url }}">Открыть {{ strtoupper($resource->media->extension) }} ↗</a>@elseif($resource->url)<a class="btn-ghost" target="_blank" rel="noopener" href="{{ $resource->url }}">{{ $resource->type==='video'?'Смотреть видео':'Открыть ссылку' }} ↗</a>@endif
        </article>
       @endforeach
      </div>
     </section>
    @endif

    @if($lesson->scormPackages->count())
     <section class="dpo-lesson-block">
      <div class="section-head"><div><span class="eyebrow">SCORM / iSPRING</span><h2>Тестирование</h2></div></div>
      <div class="dpo-scorm-list">
       @foreach($lesson->scormPackages as $package)
        <a class="dpo-scorm-card" href="{{ route('dpo.scorm.launch',$package) }}?group={{ $group->id }}"><div><span>SCORM {{ $package->scorm_version }}</span><h3>{{ $package->title }}</h3><p>Результат и прогресс сохраняются автоматически.</p></div><strong>Запустить →</strong></a>
       @endforeach
      </div>
     </section>
    @endif

    @if($lesson->assignments->count())
     <section class="dpo-lesson-block">
      <div class="section-head"><div><span class="eyebrow">HOMEWORK</span><h2>Домашние задания</h2></div></div>
      @foreach($lesson->assignments as $assignment)
       @php($submission=$submissions->get($assignment->id))
       @php($pivot=$assignment->groups->firstWhere('id',$group->id)?->pivot)
       <article class="dpo-homework-card">
        <div class="d-flex justify-content-between gap-3 flex-wrap"><div><h3>{{ $assignment->title }}</h3><p>{{ $assignment->description }}</p></div><div class="dpo-homework-meta"><b>{{ $assignment->max_score }}</b><small>макс. балл</small>@if($pivot?->due_at)<strong>до {{ IlluminateSupportCarbon::parse($pivot->due_at)->format('d.m.Y H:i') }}</strong>@endif</div></div>
        @if($submission)
         <div class="dpo-submission-state {{ $submission->status }}"><b>{{ ['draft'=>'Черновик','submitted'=>'Отправлено','reviewed'=>'Проверено','returned'=>'На доработку'][$submission->status] }}</b>@if($submission->score!==null)<span>{{ $submission->score }} / {{ $assignment->max_score }}</span>@endif @if($submission->feedback)<p>{{ $submission->feedback }}</p>@endif</div>
        @endif
        @if(auth()->user()->dpoProfile?->role==='student')
        <form method="post" enctype="multipart/form-data" action="{{ route('dpo.assignments.submit',[$group,$assignment]) }}" class="admin-form mt-3">@csrf
         @if($assignment->allow_text)<div class="field"><label>Ответ</label><textarea class="form-control" rows="5" name="answer_text">{{ $submission?->status==='returned'?$submission->answer_text:'' }}</textarea></div>@endif
         @if($assignment->allow_file)<div class="field"><label>Файл</label><input type="file" class="form-control" name="answer_file"><small class="text-secondary">PDF, DOCX, XLSX, PPTX, ZIP или изображение, до 50 МБ.</small></div>@endif
         <button class="btn-tech">{{ $submission?'Отправить новую версию':'Отправить работу' }}</button>
        </form>
        @endif
       </article>
      @endforeach
     </section>
    @endif

    @if($lesson->completion_mode!=='scorm' && auth()->user()->dpoProfile?->role==='student' && $progress->status!=='completed')
     <form method="post" action="{{ route('dpo.lessons.complete',[$group,$lesson]) }}" class="mt-4">@csrf<button class="btn-tech">Отметить урок завершённым ✓</button></form>
    @endif
   </div>

   <aside class="dpo-side-column">
    <div class="glass-panel">
     <span class="eyebrow">LESSON STATUS</span><h3 class="mt-2">Прогресс</h3>
     <div class="dpo-lesson-progress-large"><b>{{ $progress->status==='completed'?'100':'50' }}%</b><span>{{ $progress->status==='completed'?'Урок завершён':'Урок начат' }}</span></div>
     <a class="btn-ghost w-100 justify-content-center mt-3" href="{{ route('dpo.groups.show',$group) }}">К содержанию курса</a>
    </div>
   </aside>
  </div>
 </div>
</section>
@endsection