<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>Ведомость {{ $group->name }}</title>
<style>body{font-family:Arial,sans-serif;color:#111;margin:20px}h1{font-size:22px;margin-bottom:4px}.meta{color:#555;margin-bottom:18px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #777;padding:6px;text-align:center}th{background:#eef4f8}td:first-child{text-align:left}.ok{font-weight:700}.sign{margin-top:35px;display:flex;justify-content:space-between}.actions{text-align:right;margin-bottom:15px}@media print{.actions{display:none}body{margin:0}@page{size:A4 landscape;margin:10mm}}</style></head>
<body>
<div class="actions"><button onclick="window.print()">Печать / сохранить PDF</button></div>
<h1>Итоговая ведомость ДПО</h1>
<div class="meta"><b>{{ $group->program->title }}</b> · {{ $group->name }} · {{ $group->program->hours }} ч. · сформировано {{ now()->format('d.m.Y H:i') }}</div>
<table><thead><tr><th>№</th><th>ФИО</th><th>Уроки</th><th>Посещ.</th><th>ДЗ</th><th>SCORM</th><th>Итог</th><th>Результат</th><th>Статус</th></tr></thead><tbody>
@foreach($rows as $row) @php($m=$row['metrics'])<tr><td>{{ $loop->iteration }}</td><td>{{ $row['enrollment']->user->name }}</td><td>{{ $m['progress_percent'] }}%</td><td>{{ $m['attendance_percent'] }}%</td><td>{{ $m['homework_percent']===null?'—':$m['homework_percent'].'%' }}</td><td>{{ $m['scorm_percent']===null?'—':$m['scorm_percent'].'%' }}</td><td>{{ $m['final_score']===null?'—':$m['final_score'].'%' }}</td><td class="ok">{{ $m['ready']?'Выполнено':'Не выполнено' }}</td><td>{{ $row['enrollment']->status }}</td></tr>@endforeach
</tbody></table>
<div class="sign"><span>Ответственный ____________________</span><span>Подпись ____________________</span><span>Дата ____________________</span></div>
</body></html>