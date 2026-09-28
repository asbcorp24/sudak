<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Сертификат {{ $attempt->certificate_code }}</title>
<style>
body{margin:0;background:#061019;color:#eafaff;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh}
.certificate{width:min(1000px,calc(100vw - 40px));min-height:620px;border:1px solid #49d9ff;padding:70px;position:relative;background:radial-gradient(circle at 80% 15%,#12394a,#07141d 48%,#040c12)}
.certificate:before,.certificate:after{content:"";position:absolute;border:1px solid rgba(73,217,255,.22);inset:18px}.certificate:after{inset:32px}
.eyebrow{letter-spacing:.2em;color:#49d9ff;font-size:12px;font-weight:bold}.certificate h1{font-size:72px;line-height:.95;margin:35px 0 10px}.certificate h2{font-size:34px;margin:24px 0}.certificate p{font-size:18px;color:#a7c2cd}.score{font-size:64px;font-weight:bold;color:#49d9ff}.code{margin-top:60px;font-family:monospace;letter-spacing:.15em;color:#86a7b3}
@media print{body{background:white}.certificate{width:auto;min-height:650px;break-inside:avoid}}
</style>
</head>
<body>
<div class="certificate">
 <div class="eyebrow">ЗЕЛЕНОДОЛЬСКИЙ СУДОСТРОИТЕЛЬНЫЙ КОЛЛЕДЖ</div>
 <h1>СЕРТИФИКАТ</h1>
 <p>подтверждает успешное прохождение викторины</p>
 <h2>{{ $attempt->quiz->title }}</h2>
 <p>Участник</p>
 <h2>{{ $attempt->participant_name }}</h2>
 <div class="score">{{ $attempt->score }}%</div>
 <p>Проходной балл: {{ $attempt->quiz->pass_score }}%</p>
 <div class="code">КОД СЕРТИФИКАТА: {{ $attempt->certificate_code }}</div>
</div>
</body>
</html>