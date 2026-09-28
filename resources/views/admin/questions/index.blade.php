@extends('admin.layout')
@section('heading','Вопросы и обращения')
@section('content')
<div class="admin-actions">
 <p>Вопросы посетителей сайта, ответы и статусы обработки.</p>
 <a class="btn-ghost" target="_blank" href="{{ route('questions.create') }}">Публичная форма ↗</a>
</div>

<div class="d-flex gap-2 flex-wrap mb-4">
 @foreach([''=>'Все','new'=>'Новые','processing'=>'В работе','answered'=>'Отвечено','closed'=>'Закрыто'] as $key=>$label)
  <a class="{{ ($activeStatus===$key || (!$activeStatus && $key==='')) ? 'btn-tech' : 'btn-ghost' }}" href="{{ route('admin.questions.index',array_filter(['status'=>$key])) }}">{{ $label }}</a>
 @endforeach
</div>

<div class="d-grid gap-3">
 @forelse($questions as $q)
  <article class="glass-panel">
   <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
    <div><span class="eyebrow">{{ $q->created_at->format('d.m.Y H:i') }}</span><h3 class="mt-2 mb-1">{{ $q->subject ?: 'Вопрос' }}</h3><small class="text-secondary">{{ $q->name }} · {{ $q->email ?: 'без email' }} · {{ $q->phone ?: 'без телефона' }}</small></div>
    <span class="feedback-status">{{ ['new'=>'Новый','processing'=>'В работе','answered'=>'Отвечено','closed'=>'Закрыто'][$q->status] ?? $q->status }}</span>
   </div>
   <div class="question-text mt-3">{{ $q->question }}</div>
   <form method="post" action="{{ route('admin.questions.update',$q) }}" class="admin-form mt-3">@csrf @method('PATCH')
    <div class="row g-3">
     <div class="col-md-4 field"><label>Статус</label><select class="form-select" name="status">@foreach(['new'=>'Новый','processing'=>'В работе','answered'=>'Отвечено','closed'=>'Закрыто'] as $key=>$label)<option value="{{ $key }}" @selected($q->status===$key)>{{ $label }}</option>@endforeach</select></div>
     <div class="col-12 field"><label>Ответ</label><textarea class="form-control" rows="5" name="answer">{{ $q->answer }}</textarea></div>
     <div class="col-12"><button class="btn-tech">Сохранить</button></div>
    </div>
   </form>
   <form method="post" action="{{ route('admin.questions.destroy',$q) }}" class="text-end mt-2" onsubmit="return confirm('Удалить обращение?')">@csrf @method('DELETE')<button class="link-danger">Удалить обращение ×</button></form>
  </article>
 @empty
  <div class="glass-panel text-secondary">Нет обращений.</div>
 @endforelse
</div>
@if($questions->hasPages())<div class="mt-4">{{ $questions->links() }}</div>@endif
@endsection