@extends('layouts.app')
@section('title','Проверка документа ДПО — ЗСК')
@section('content')
<section class="py-5" style="background:#f4f9fd;min-height:70vh;color:#17364d">
 <div class="container" style="max-width:900px">
  <div class="bg-white border rounded-4 p-4 p-lg-5 shadow-sm">
   <span class="eyebrow" style="color:#1769d2">РЕЕСТР ДОКУМЕНТОВ ДПО</span>
   <h1 class="h2 mt-2">Проверка документа</h1>
   @if($document->status==='issued')
    <div class="alert alert-success mt-4"><b>Документ действителен.</b> Запись найдена в реестре ЗСК.</div>
   @else
    <div class="alert alert-danger mt-4"><b>Документ отозван.</b></div>
   @endif
   @if($document->status==='issued')<a class="btn btn-primary mb-3" target="_blank" href="{{ route('dpo.document.print',$document->verification_code) }}">Открыть документ для печати</a>@endif
   <table class="table">
    <tr><th>ФИО</th><td>{{ $document->user->name }}</td></tr>
    <tr><th>Программа</th><td>{{ $document->program->title }}</td></tr>
    <tr><th>Объём</th><td>{{ $document->hours }} ч.</td></tr>
    @if($document->qualification)<tr><th>Квалификация</th><td>{{ $document->qualification }}</td></tr>@endif
    <tr><th>Документ</th><td>{{ $document->document_type }}</td></tr>
    <tr><th>Серия / номер</th><td>{{ trim(($document->series ?: '').' '.$document->number) }}</td></tr>
    <tr><th>Дата выдачи</th><td>{{ $document->issued_at->format('d.m.Y') }}</td></tr>
    <tr><th>Код проверки</th><td><code>{{ $document->verification_code }}</code></td></tr>
   </table>
  </div>
 </div>
</section>
@endsection
