@extends('admin.layout')
@section('heading','Новости')
@section('content')
<div class="admin-actions">
 <p>Новости, события и объявления колледжа.</p>
 <a class="btn-tech" href="{{ route('admin.news.create') }}">+ Добавить новость</a>
</div>

<form method="get" action="{{ route('admin.news.index') }}" class="glass-panel admin-list-filter mb-4">
 <div class="schedule-filter-field">
  <label for="admin-news-from">С даты</label>
  <input id="admin-news-from" type="date" class="form-control" name="date_from" value="{{ request('date_from') }}">
 </div>
 <div class="schedule-filter-field">
  <label for="admin-news-to">По дату</label>
  <input id="admin-news-to" type="date" class="form-control" name="date_to" value="{{ request('date_to') }}">
 </div>
 <div class="admin-list-filter-actions">
  <button class="btn-tech" type="submit">Фильтр</button>
  @if(request()->filled('date_from') || request()->filled('date_to'))
   <a class="btn-ghost" href="{{ route('admin.news.index') }}">Сбросить</a>
  @endif
 </div>
</form>

<div class="table-responsive">
 <table class="table tech-table">
  <thead><tr><th>Дата</th><th>Заголовок</th><th>Статус</th><th></th></tr></thead>
  <tbody>
   @forelse($posts as $p)
    <tr>
     <td>{{ optional($p->published_at)->format('d.m.Y H:i') }}</td>
     <td><b>{{ $p->title }}</b></td>
     <td>{{ $p->is_published?'опубликовано':'черновик' }}</td>
     <td class="text-end"><a href="{{ route('admin.news.edit',$p) }}">Редактировать</a></td>
    </tr>
   @empty
    <tr><td colspan="4">За выбранный период новостей нет.</td></tr>
   @endforelse
  </tbody>
 </table>
</div>

@if($posts->total())
 <div class="list-pagination mt-4">
  <small>Показано {{ $posts->firstItem() }}–{{ $posts->lastItem() }} из {{ $posts->total() }}</small>
  {{ $posts->links() }}
 </div>
@endif
@endsection
