<!doctype html>
<html lang="ru">
<head>
 <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
 <title>{{ $document->document_type }} — {{ $document->user->name }}</title>
 <style>
 body{margin:0;background:#eef4f8;color:#17364d;font-family:Arial,sans-serif}.sheet{box-sizing:border-box;width:297mm;min-height:210mm;margin:12mm auto;background:#fff;border:2px solid #1769d2;padding:18mm 22mm;position:relative}.top{display:flex;justify-content:space-between;gap:20mm;border-bottom:1px solid #b8d2e5;padding-bottom:8mm}.brand{font-size:28px;font-weight:800;color:#1769d2}.meta{text-align:right;font-size:13px}.center{text-align:center;padding:15mm 0}.center h1{font-size:30px;margin:0 0 7mm}.name{font-size:26px;font-weight:800;margin:8mm 0}.program{font-size:20px;line-height:1.45}.grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm 12mm;margin-top:12mm}.cell{border-top:1px solid #d6e4ee;padding-top:4mm}.cell small{display:block;color:#6c8496;margin-bottom:2mm}.verify{margin-top:14mm;padding:5mm;border:1px solid #b8d2e5;background:#f5faff;font-size:12px}.actions{text-align:center;margin:10mm}.actions button{padding:10px 18px}@media print{body{background:#fff}.sheet{margin:0;border:2px solid #1769d2;width:297mm;height:210mm;min-height:210mm}.actions{display:none}@page{size:A4 landscape;margin:0}}
 </style>
</head>
<body>
 <div class="sheet">
  <div class="top"><div><div class="brand">ЗСК · ДПО</div><div>Зеленодольский судостроительный колледж</div></div><div class="meta">{{ $document->document_type }}<br><b>{{ trim(($document->series ?: '').' '.$document->number) }}</b></div></div>
  <div class="center">
   <h1>{{ $document->document_type }}</h1>
   <div>настоящим подтверждается, что</div>
   <div class="name">{{ $document->user->name }}</div>
   <div>успешно завершил(а) обучение по программе</div>
   <div class="program"><b>{{ $document->program->title }}</b></div>
  </div>
  <div class="grid">
   <div class="cell"><small>Объём программы</small><b>{{ $document->hours }} академических часов</b></div>
   <div class="cell"><small>Дата выдачи</small><b>{{ $document->issued_at->format('d.m.Y') }}</b></div>
   @if($document->qualification)<div class="cell"><small>Квалификация</small><b>{{ $document->qualification }}</b></div>@endif
   <div class="cell"><small>Учебная группа</small><b>{{ $document->group->name }}</b></div>
  </div>
  <div class="verify">Проверка подлинности: код <b>{{ $document->verification_code }}</b><br>{{ route('dpo.document.verify',$document->verification_code) }}</div>
 </div>
 <div class="actions"><button onclick="window.print()">Печать / сохранить PDF</button></div>
</body>
</html>
