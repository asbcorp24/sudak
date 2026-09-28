@extends('admin.layout')
@section('heading','Викторины')
@section('content')
<div class="admin-actions">
 <div><p>Викторины, проходной балл, результаты и сертификаты.</p><small class="text-secondary">Формат вопросов: JSON с question, options и correct.</small></div>
 <a class="btn-ghost" target="_blank" href="{{ route('quizzes.index') }}">Открыть викторины ↗</a>
</div>

<form method="post" action="{{ route('admin.quizzes.store') }}" class="glass-panel admin-form mb-4">@csrf
 <span class="eyebrow">NEW QUIZ</span><h3 class="mt-2">Создать викторину</h3>
 <div class="row g-3">
  <div class="col-md-8 field"><label>Название</label><input class="form-control" name="title" required></div>
  <div class="col-md-4 field"><label>Проходной балл, %</label><input type="number" min="1" max="100" class="form-control" name="pass_score" value="70" required></div>
  <div class="col-12 field"><label>Описание</label><textarea class="form-control" rows="3" name="description"></textarea></div>
  <div class="col-12 field"><label>Вопросы JSON</label><textarea class="form-control code-area" name="questions_json" rows="12" required>[
  {"question":"Что такое шпангоут?","options":{"a":"Поперечный элемент набора корпуса","b":"Тип двигателя","c":"Сетевой протокол"},"correct":"a"},
  {"question":"Какой формат обычно используется для 3D-моделей в вебе?","options":{"a":"CSV","b":"GLB","c":"TXT"},"correct":"b"}
]</textarea></div>
  <div class="col-md-6"><label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликовать</label></div>
  <div class="col-md-6 text-end"><button class="btn-tech">Создать викторину</button></div>
 </div>
</form>

<div class="glass-panel mb-4">
 <h3>Викторины</h3>
 @forelse($quizzes as $quiz)
  <form method="post" action="{{ route('admin.quizzes.update',$quiz) }}" class="quiz-admin-row admin-form">@csrf @method('PUT')
   <div class="row g-2">
    <div class="col-md-7"><input class="form-control" name="title" value="{{ $quiz->title }}" required></div>
    <div class="col-md-2"><input type="number" min="1" max="100" class="form-control" name="pass_score" value="{{ $quiz->pass_score }}" required></div>
    <div class="col-md-3"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($quiz->is_published)> Опубликована</label></div>
    <div class="col-12"><textarea class="form-control" rows="2" name="description">{{ $quiz->description }}</textarea></div>
    <div class="col-12"><textarea class="form-control code-area" rows="9" name="questions_json" required>{{ json_encode($quiz->questions_json,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) }}</textarea></div>
    <div class="col-md-6 text-secondary">Вопросов: {{ count($quiz->questions_json??[]) }} · попыток: {{ $quiz->attempts_count }}</div>
    <div class="col-md-6 text-end"><button class="btn-ghost">Сохранить</button></div>
   </div>
  </form>
  <form method="post" action="{{ route('admin.quizzes.destroy',$quiz) }}" class="text-end mb-3" onsubmit="return confirm('Удалить викторину и все результаты?')">@csrf @method('DELETE')<button class="link-danger">Удалить ×</button></form>
 @empty
  <p class="text-secondary">Викторин пока нет.</p>
 @endforelse
</div>

<div class="glass-panel">
 <h3>Последние результаты</h3>
 <div class="table-responsive">
  <table class="table tech-table align-middle">
   <thead><tr><th>Дата</th><th>Участник</th><th>Викторина</th><th>Результат</th><th>Сертификат</th></tr></thead>
   <tbody>
    @forelse($attempts as $attempt)
     <tr>
      <td>{{ optional($attempt->completed_at)->format('d.m.Y H:i') }}</td>
      <td><b>{{ $attempt->participant_name }}</b>@if($attempt->participant_email)<br><small>{{ $attempt->participant_email }}</small>@endif</td>
      <td>{{ $attempt->quiz->title }}</td>
      <td><b>{{ $attempt->score }}%</b><br><small>{{ $attempt->passed?'Пройдено':'Не пройдено' }}</small></td>
      <td>@if($attempt->certificate_code)<a target="_blank" href="{{ route('quizzes.certificate',$attempt->certificate_code) }}">{{ $attempt->certificate_code }}</a>@else—@endif</td>
     </tr>
    @empty
     <tr><td colspan="5">Результатов пока нет.</td></tr>
    @endforelse
   </tbody>
  </table>
 </div>
</div>
@endsection