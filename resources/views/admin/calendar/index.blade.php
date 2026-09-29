@extends('admin.layout')
@section('heading','Календарь колледжа')
@section('content')
<div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
 <div><span class="eyebrow">EVENTS / CMS</span><h2 class="mb-0">События колледжа</h2></div>
 <a class="btn-tech" href="{{ route('admin.calendar.create') }}">+ Добавить событие</a>
</div>
<div class="d-flex flex-wrap gap-2 mb-4">
 <a class="btn-ghost {{ !$activeType?'active':'' }}" href="{{ route('admin.calendar.index') }}">Все</a>
 @foreach($types as $key=>$label)<a class="btn-ghost {{ $activeType===$key?'active':'' }}" href="{{ route('admin.calendar.index',['type'=>$key]) }}">{{ $label }}</a>@endforeach
</div>
<div class="glass-panel table-responsive">
 <table class="table align-middle admin-table mb-0"><thead><tr><th>Дата</th><th>Тип</th><th>Событие</th><th>Статус</th><th></th></tr></thead><tbody>
 @forelse($events as $event)
  <tr><td><b>{{ $event->starts_at->format('d.m.Y') }}</b><small class="d-block text-secondary">{{ $event->all_day?'весь день':$event->starts_at->format('H:i') }}</small></td><td><span class="calendar-type type-{{ $event->type }}">{{ $event->type_label }}</span></td><td><b>{{ $event->title }}</b>@if($event->location)<small class="d-block text-secondary">{{ $event->location }}</small>@endif</td><td>{{ $event->is_published?'Опубликовано':'Черновик' }}@if($event->is_featured)<small class="d-block text-info">Важное</small>@endif</td><td class="text-end"><a class="btn-ghost" href="{{ route('admin.calendar.edit',$event) }}">Изменить</a><form class="d-inline" method="post" action="{{ route('admin.calendar.destroy',$event) }}" onsubmit="return confirm('Удалить событие?')">@csrf @method('DELETE')<button class="btn-ghost">×</button></form></td></tr>
 @empty<tr><td colspan="5" class="text-center text-secondary py-5">Событий пока нет.</td></tr>@endforelse
 </tbody></table>
</div>
<div class="mt-4">{{ $events->links() }}</div>
@endsection
