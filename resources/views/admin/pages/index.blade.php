@extends('admin.layout')
@section('heading','Разделы и страницы')
@section('content')
<div class="admin-actions">
 <p>Любая страница может стать разделом или подразделом через поле «Родитель».</p>
 <a class="btn-tech" href="{{ route('admin.pages.create') }}">+ Создать страницу</a>
</div>

<div class="table-responsive">
 <table class="table tech-table">
  <thead><tr><th>Название</th><th>Тип</th><th>Родитель</th><th>URL</th><th>Статус</th><th></th></tr></thead>
  <tbody>
   @forelse($pages as $p)
    <tr>
     <td><b>{{ $p->title }}</b></td>
     <td>{{ $p->page_type }}</td>
     <td>{{ $p->parent?->title ?: '—' }}</td>
     <td>/section/{{ $p->slug }}</td>
     <td>{{ $p->is_published?'опубликовано':'черновик' }}</td>
     <td class="text-end">
      <a href="{{ route('admin.pages.edit',$p) }}">Редактировать</a>
      <form class="d-inline" method="post" action="{{ route('admin.pages.destroy',$p) }}" onsubmit="return confirm('Удалить страницу?')">@csrf @method('DELETE')<button class="link-danger">×</button></form>
     </td>
    </tr>
   @empty
    <tr><td colspan="6">Разделов и страниц пока нет.</td></tr>
   @endforelse
  </tbody>
 </table>
</div>

@if($pages->total())
 <div class="list-pagination mt-4">
  <small>Показано {{ $pages->firstItem() }}–{{ $pages->lastItem() }} из {{ $pages->total() }}</small>
  {{ $pages->links() }}
 </div>
@endif
@endsection
