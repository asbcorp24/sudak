@extends('admin.layout')
@section('heading','Викторины')
@section('content')
<style>
.quiz-index{--qi-blue:#1769d2;--qi-dark:#0b3f86;--qi-line:#dbe8f7;color:#173653}
.quiz-index .qi-hero{background:linear-gradient(135deg,#f5f9ff,#eaf4ff);border:1px solid var(--qi-line);border-radius:18px;padding:20px;margin-bottom:18px;display:flex;justify-content:space-between;gap:18px;align-items:center}
.quiz-index .qi-hero h2{margin:0 0 5px;color:var(--qi-dark);font-size:22px}.quiz-index .qi-hero p{margin:0;color:#64809c}
.quiz-index .qi-create{display:flex;gap:8px;min-width:min(100%,430px)}
.quiz-index .form-control{background:#fff!important;color:#173653!important;border:1px solid #cbdff3!important;border-radius:11px!important}
.quiz-index .qi-btn{border:1px solid var(--qi-line);background:#fff;color:var(--qi-dark);border-radius:11px;padding:9px 14px;font-weight:750;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap}
.quiz-index .qi-btn.primary{background:var(--qi-blue);border-color:var(--qi-blue);color:#fff}.quiz-index .qi-btn:hover{border-color:#8cbcf1}
.quiz-index .qi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.quiz-index .qi-card{background:#fff;border:1px solid var(--qi-line);border-radius:17px;padding:17px;box-shadow:0 10px 28px rgba(28,75,122,.055)}
.quiz-index .qi-card-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.quiz-index .qi-card h3{font-size:17px;line-height:1.3;margin:0;color:var(--qi-dark)}.quiz-index .qi-card p{color:#6a839c;font-size:13px;margin:8px 0 14px;min-height:34px}
.quiz-index .qi-status{font-size:11px;font-weight:850;padding:5px 8px;border-radius:999px;white-space:nowrap}.quiz-index .qi-status.on{background:#e9f8ee;color:#17783c}.quiz-index .qi-status.off{background:#f1f4f7;color:#6c7f92}
.quiz-index .qi-stats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.quiz-index .qi-stat{background:#f4f8fd;border-radius:10px;padding:7px 10px;font-size:12px;color:#58738f}.quiz-index .qi-stat b{color:#173653}
.quiz-index .qi-actions{display:flex;gap:7px;flex-wrap:wrap}.quiz-index .qi-actions .qi-btn:first-child{flex:1}
.quiz-index .qi-panel{background:#fff;border:1px solid var(--qi-line);border-radius:17px;margin-top:18px;overflow:hidden}.quiz-index .qi-panel-head{padding:15px 17px;border-bottom:1px solid var(--qi-line);display:flex;justify-content:space-between;align-items:center}.quiz-index .qi-panel-head h3{font-size:16px;margin:0;color:var(--qi-dark)}
.quiz-index .table{margin:0;color:#294a68}.quiz-index .table th{font-size:11px;text-transform:uppercase;color:#718aa3;border-bottom-color:#e3edf7}.quiz-index .table td{border-bottom-color:#edf3f9}
.quiz-index .pagination{margin:16px 0 0}
@media(max-width:900px){.quiz-index .qi-grid{grid-template-columns:1fr}.quiz-index .qi-hero{align-items:stretch;flex-direction:column}.quiz-index .qi-create{min-width:0}}
@media(max-width:560px){.quiz-index .qi-create{flex-direction:column}}
</style>

<div class="quiz-index">
 @if($errors->any())<div class="alert alert-danger">@foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach</div>@endif

 <section class="qi-hero">
  <div><h2>Конструктор викторин</h2><p>Создавайте вопросы и варианты ответов визуально — JSON больше редактировать не нужно.</p></div>
  <form class="qi-create" method="post" action="{{ route('admin.quizzes.store') }}">@csrf
   <input class="form-control" name="title" placeholder="Название новой викторины" required maxlength="220">
   <button class="qi-btn primary">＋ Создать</button>
  </form>
 </section>

 <div class="d-flex justify-content-between align-items-center mb-3">
  <div class="text-secondary">Всего: <b>{{ $quizzes->total() }}</b></div>
  <a class="qi-btn" target="_blank" href="{{ route('quizzes.index') }}">Открыть на сайте ↗</a>
 </div>

 <div class="qi-grid">
  @forelse($quizzes as $quiz)
   <article class="qi-card">
    <div class="qi-card-top">
     <h3>{{ $quiz->title }}</h3>
     <span class="qi-status {{ $quiz->is_published?'on':'off' }}">{{ $quiz->is_published?'Опубликована':'Черновик' }}</span>
    </div>
    <p>{{ $quiz->description ? \Illuminate\Support\Str::limit($quiz->description,120) : 'Описание пока не добавлено.' }}</p>
    <div class="qi-stats">
     <span class="qi-stat">Вопросов: <b>{{ count($quiz->questions_json??[]) }}</b></span>
     <span class="qi-stat">Проходной: <b>{{ $quiz->pass_score }}%</b></span>
     <span class="qi-stat">Попыток: <b>{{ $quiz->attempts_count }}</b></span>
    </div>
    <div class="qi-actions">
     <a class="qi-btn primary" href="{{ route('admin.quizzes.builder',$quiz) }}">Открыть конструктор</a>
     @if($quiz->is_published)<a class="qi-btn" target="_blank" href="{{ route('quizzes.show',$quiz) }}">↗</a>@endif
     <form method="post" action="{{ route('admin.quizzes.duplicate',$quiz) }}">@csrf<button class="qi-btn" title="Дублировать">⧉</button></form>
    </div>
   </article>
  @empty
   <div class="qi-card"><h3>Викторин пока нет</h3><p class="mb-0">Введите название выше и нажмите «Создать».</p></div>
  @endforelse
 </div>

 {{ $quizzes->links() }}

 <section class="qi-panel">
  <div class="qi-panel-head"><h3>Последние результаты</h3><span class="text-secondary small">{{ $attempts->count() }} записей</span></div>
  <div class="table-responsive">
   <table class="table align-middle">
    <thead><tr><th>Дата</th><th>Участник</th><th>Викторина</th><th>Результат</th><th>Сертификат</th></tr></thead>
    <tbody>
     @forelse($attempts as $attempt)
      <tr>
       <td>{{ optional($attempt->completed_at)->format('d.m.Y H:i') }}</td>
       <td><b>{{ $attempt->participant_name }}</b>@if($attempt->participant_email)<br><small>{{ $attempt->participant_email }}</small>@endif</td>
       <td>{{ $attempt->quiz?->title ?? '—' }}</td>
       <td><b>{{ $attempt->score }}%</b><br><small>{{ $attempt->passed?'Пройдено':'Не пройдено' }}</small></td>
       <td>@if($attempt->certificate_code)<a target="_blank" href="{{ route('quizzes.certificate',$attempt->certificate_code) }}">{{ $attempt->certificate_code }}</a>@else—@endif</td>
      </tr>
     @empty
      <tr><td colspan="5" class="text-center text-secondary py-4">Результатов пока нет.</td></tr>
     @endforelse
    </tbody>
   </table>
  </div>
 </section>
</div>
@endsection
