@extends('dpo.layout')
@section('title','Календарь — ДПО')
@section('content')
<section class="dpo-dashboard-hero"><div class="container-xxl"><span class="eyebrow">MY CALENDAR</span><h1>Календарь слушателя</h1><p>Занятия, дедлайны домашних работ и мероприятия колледжа в одной ленте.</p></div></section>
<section class="section-space"><div class="container-xxl">
 <div class="d-flex justify-content-between gap-2 flex-wrap mb-4"><a class="btn-ghost" href="{{ route('dpo.dashboard') }}">← Моё обучение</a><a class="btn-ghost" href="{{ route('dpo.schedule') }}">Только расписание</a></div>
 @forelse($calendar as $date=>$items)
  <div class="glass-panel mb-3">
   <div class="d-flex align-items-center gap-3 mb-3"><div class="display-6 fw-bold text-primary">{{ IlluminateSupportCarbon::parse($date)->format('d') }}</div><div><b>{{ IlluminateSupportCarbon::parse($date)->translatedFormat('F Y') }}</b><small class="d-block text-secondary">{{ IlluminateSupportCarbon::parse($date)->translatedFormat('l') }}</small></div></div>
   <div class="d-grid gap-2">
    @foreach($items as $item)
     <div class="border rounded-3 p-3 d-flex justify-content-between gap-3 align-items-center flex-wrap">
      <div><span class="badge {{ $item['type']==='lesson'?'text-bg-primary':($item['type']==='deadline'?'text-bg-warning':'text-bg-info') }}">{{ ['lesson'=>'Занятие','deadline'=>'Дедлайн','event'=>'Событие'][$item['type']] }}</span><b class="ms-2">{{ $item['title'] }}</b><small class="d-block text-secondary mt-1">{{ $item['at']->format('H:i') }} · {{ $item['meta'] }}</small></div>
      @if($item['url'])<a class="btn-ghost" href="{{ $item['url'] }}" @if(IlluminateSupportStr::startsWith($item['url'],'http')) target="_blank" @endif>Открыть →</a>@endif
     </div>
    @endforeach
   </div>
  </div>
 @empty <div class="feedback-empty">На ближайшие три месяца событий нет.</div> @endforelse
</div></section>
@endsection