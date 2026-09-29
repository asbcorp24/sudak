@extends('layouts.app')
@section('title','Дополнительное профессиональное образование — ЗСК')
@section('description','Программы дополнительного профессионального образования Зеленодольского судостроительного колледжа: обучение, повышение квалификации и подача заявки онлайн.')

@push('head')
<style>
.dpo-catalog{--dpo-blue:#1769d2;--dpo-blue-dark:#0b3e72;--dpo-ink:#14364f;--dpo-muted:#668095;--dpo-line:#d9e6ef;--dpo-soft:#f3f8fc;background:#fff;color:var(--dpo-ink);padding-top:var(--header);min-height:80vh}
.dpo-catalog *{box-sizing:border-box}
.dpo-catalog-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#eaf5ff 0%,#f8fbfe 54%,#eef7ff 100%);border-bottom:1px solid var(--dpo-line)}
.dpo-catalog-hero:before{content:"";position:absolute;width:620px;height:620px;border-radius:50%;right:-180px;top:-290px;border:1px solid rgba(23,105,210,.16);box-shadow:0 0 0 80px rgba(23,105,210,.025),0 0 0 160px rgba(23,105,210,.018)}
.dpo-catalog-hero:after{content:"ДПО";position:absolute;right:3vw;bottom:-.23em;font-size:clamp(8rem,23vw,22rem);line-height:1;font-weight:900;letter-spacing:-.09em;color:rgba(23,105,210,.035);pointer-events:none}
.dpo-catalog-hero .container-xxl{position:relative;z-index:2;padding-top:76px;padding-bottom:72px}
.dpo-kicker{display:inline-flex;align-items:center;gap:10px;color:var(--dpo-blue);font-size:.72rem;font-weight:850;letter-spacing:.16em;text-transform:uppercase;margin-bottom:18px}
.dpo-kicker:before{content:"";width:32px;height:2px;background:var(--dpo-blue)}
.dpo-catalog h1{max-width:900px;margin:0;color:#103b60;font-size:clamp(2.65rem,5.5vw,5.6rem);line-height:.94;letter-spacing:-.055em;font-weight:850}
.dpo-catalog-lead{max-width:760px;margin:24px 0 0;color:#55758c;font-size:clamp(1rem,1.6vw,1.25rem);line-height:1.65}
.dpo-hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.dpo-primary,.dpo-secondary{min-height:48px;padding:0 20px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-size:.86rem;font-weight:800;transition:.2s;text-decoration:none!important}
.dpo-primary{background:var(--dpo-blue);border:1px solid var(--dpo-blue);color:#fff!important;box-shadow:0 10px 24px rgba(23,105,210,.18)}
.dpo-primary:hover{background:#0f5dbc;transform:translateY(-2px)}
.dpo-secondary{background:#fff;border:1px solid #cbdde9;color:#1b547f!important}
.dpo-secondary:hover{border-color:#8fb8d5;background:#f8fcff;transform:translateY(-2px)}
.dpo-hero-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-width:670px;margin-top:44px;border:1px solid #d4e4ef;border-radius:16px;background:rgba(255,255,255,.72);box-shadow:0 12px 34px rgba(32,81,117,.07);overflow:hidden}
.dpo-hero-fact{padding:17px 20px;border-right:1px solid #dce8f0}
.dpo-hero-fact:last-child{border-right:0}.dpo-hero-fact b{display:block;color:#103b60;font-size:1rem}.dpo-hero-fact small{display:block;color:#71899a;font-size:.75rem;margin-top:3px}
.dpo-programs{padding:70px 0 90px;background:linear-gradient(180deg,#fff 0%,#f7fbfe 100%)}
.dpo-section-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:28px}
.dpo-section-head h2{margin:6px 0 0;color:#103b60;font-size:clamp(2rem,3.6vw,3.25rem);line-height:1;letter-spacing:-.04em}
.dpo-section-head p{max-width:520px;margin:0;color:var(--dpo-muted);line-height:1.6}
.dpo-toolbar{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;margin-bottom:28px}
.dpo-search{position:relative}.dpo-search svg{position:absolute;left:17px;top:50%;transform:translateY(-50%);width:19px;height:19px;stroke:#66869e;fill:none;stroke-width:2}
.dpo-search input{width:100%;height:54px;border:1px solid #cfdfeb!important;border-radius:14px!important;background:#fff!important;color:#17364d!important;padding:0 18px 0 48px!important;box-shadow:0 6px 20px rgba(24,71,105,.045)}
.dpo-search input:focus{border-color:#6da9d5!important;box-shadow:0 0 0 4px rgba(23,105,210,.08)!important;outline:0}
.dpo-count{min-height:54px;padding:0 18px;display:flex;align-items:center;border:1px solid #d6e4ee;border-radius:14px;background:#f7fbfe;color:#5d788c;font-size:.82rem;font-weight:700}
.dpo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.dpo-program-card{position:relative;display:flex;flex-direction:column;min-height:390px;padding:28px;border:1px solid var(--dpo-line);border-radius:20px;background:#fff;box-shadow:0 10px 35px rgba(25,72,106,.06);overflow:hidden;transition:.25s}
.dpo-program-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#1769d2,#59aeea);opacity:.85}
.dpo-program-card:hover{transform:translateY(-5px);border-color:#b8d3e6;box-shadow:0 22px 50px rgba(25,72,106,.12)}
.dpo-card-top{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}
.dpo-program-code{display:inline-flex;align-items:center;gap:8px;color:#1769d2;font-size:.7rem;font-weight:850;letter-spacing:.13em;text-transform:uppercase}
.dpo-program-code:before{content:"";width:8px;height:8px;border-radius:50%;background:#39a0e8;box-shadow:0 0 0 5px #e9f5fd}
.dpo-hours{flex:none;min-width:74px;padding:9px 11px;border-radius:12px;background:#edf6fd;color:#155c99;text-align:center;font-size:.78rem;font-weight:850}
.dpo-program-card h3{margin:23px 0 12px;color:#123b5b;font-size:clamp(1.35rem,2vw,1.75rem);line-height:1.15;letter-spacing:-.025em}
.dpo-qualification{display:flex;gap:9px;align-items:flex-start;margin:0 0 13px;color:#315d7c;font-size:.87rem;font-weight:700}
.dpo-qualification svg{width:18px;height:18px;flex:none;margin-top:1px;stroke:#1769d2;fill:none;stroke-width:1.8}
.dpo-description{color:#6b8293;font-size:.92rem;line-height:1.62;margin-bottom:22px}
.dpo-card-meta{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 0 20px;border-top:1px solid #e4edf3}
.dpo-card-meta>div{min-width:0}.dpo-card-meta small{display:block;color:#8295a3;font-size:.67rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}.dpo-card-meta b{display:block;color:#294e69;font-size:.84rem;line-height:1.35}
.dpo-card-actions{display:flex;gap:10px;flex-wrap:wrap}.dpo-card-actions .dpo-primary,.dpo-card-actions .dpo-secondary{min-height:44px;border-radius:10px;padding-inline:17px}
.dpo-empty{padding:55px 25px;border:1px dashed #bdd4e4;border-radius:20px;background:#f8fbfd;text-align:center;color:#71899a}
.dpo-empty-search{display:none}
.dpo-how{padding:75px 0;background:#edf6fc;border-top:1px solid #d8e6ef}
.dpo-how-head{max-width:680px;margin-bottom:32px}.dpo-how-head h2{color:#103b60;font-size:clamp(2rem,3.8vw,3.5rem);letter-spacing:-.045em;margin:8px 0 10px}.dpo-how-head p{color:#617d91}
.dpo-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.dpo-step{padding:23px;border:1px solid #d2e2ed;border-radius:17px;background:#fff}.dpo-step-no{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#1769d2;color:#fff;font-weight:850;font-size:.8rem;margin-bottom:28px}.dpo-step b{display:block;color:#153f5f;margin-bottom:7px}.dpo-step p{margin:0;color:#72899a;font-size:.84rem;line-height:1.55}
.dpo-bottom-cta{padding:64px 0;background:#fff}.dpo-cta-box{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:34px;border-radius:22px;background:linear-gradient(135deg,#0d5ca6,#1769d2);box-shadow:0 22px 50px rgba(23,105,210,.2);color:#fff}.dpo-cta-box h2{margin:0 0 7px;font-size:clamp(1.6rem,3vw,2.5rem);letter-spacing:-.035em}.dpo-cta-box p{margin:0;color:#dbeeff}.dpo-cta-box .dpo-secondary{border-color:rgba(255,255,255,.55);color:#104d81!important;white-space:nowrap}
@media(max-width:991px){.dpo-catalog-hero .container-xxl{padding-top:56px;padding-bottom:55px}.dpo-grid{grid-template-columns:1fr}.dpo-steps{grid-template-columns:repeat(2,1fr)}.dpo-section-head{align-items:flex-start;flex-direction:column}.dpo-program-card{min-height:0}}
@media(max-width:650px){.dpo-catalog{padding-bottom:72px}.dpo-catalog-hero .container-xxl{padding-top:42px;padding-bottom:42px}.dpo-catalog h1{font-size:2.7rem}.dpo-catalog-lead{font-size:.98rem}.dpo-hero-facts{grid-template-columns:1fr;margin-top:30px}.dpo-hero-fact{border-right:0;border-bottom:1px solid #dce8f0}.dpo-hero-fact:last-child{border-bottom:0}.dpo-programs{padding:48px 0 58px}.dpo-toolbar{grid-template-columns:1fr}.dpo-count{display:none}.dpo-program-card{padding:22px 20px}.dpo-card-top{gap:10px}.dpo-card-meta{grid-template-columns:1fr}.dpo-card-actions{display:grid}.dpo-card-actions a{width:100%}.dpo-steps{grid-template-columns:1fr}.dpo-how{padding:50px 0}.dpo-cta-box{align-items:flex-start;flex-direction:column;padding:26px}.dpo-cta-box .dpo-secondary{width:100%}}
</style>
@endpush

@section('content')
<div class="dpo-catalog">
 <section class="dpo-catalog-hero">
  <div class="container-xxl">
   <span class="dpo-kicker">Дополнительное профессиональное образование</span>
   <h1>Новые компетенции.<br>Новые возможности.</h1>
   <p class="dpo-catalog-lead">Практические программы Зеленодольского судостроительного колледжа для специалистов, которым важно развиваться, подтверждать квалификацию и осваивать современные технологии.</p>
   <div class="dpo-hero-actions">
    <a class="dpo-primary" href="#programs">Выбрать программу <span>↓</span></a>
    <a class="dpo-secondary" href="{{ route('dpo.login') }}">Войти в кабинет ДПО <span>→</span></a>
   </div>
   <div class="dpo-hero-facts">
    <div class="dpo-hero-fact"><b>{{ $programs->count() }} {{ trans_choice('программа|программы|программ',$programs->count()) }}</b><small>доступно сейчас</small></div>
    <div class="dpo-hero-fact"><b>Онлайн-заявка</b><small>без визита в колледж</small></div>
    <div class="dpo-hero-fact"><b>Документ ДПО</b><small>с проверкой подлинности</small></div>
   </div>
  </div>
 </section>

 <section class="dpo-programs" id="programs">
  <div class="container-xxl">
   <div class="dpo-section-head">
    <div><span class="dpo-kicker">Каталог / ДПО</span><h2>Выберите программу</h2></div>
    <p>Откройте программу, посмотрите содержание и ближайший набор. Если приём открыт, заявку можно отправить сразу с сайта.</p>
   </div>

   @if($programs->count())
   <div class="dpo-toolbar">
    <label class="dpo-search">
     <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
     <input type="search" id="dpoProgramSearch" placeholder="Найти программу по названию, коду или квалификации" autocomplete="off">
    </label>
    <div class="dpo-count">Найдено: <span id="dpoVisibleCount" class="ms-1">{{ $programs->count() }}</span></div>
   </div>
   @endif

   <div class="dpo-grid" id="dpoProgramGrid">
    @forelse($programs as $program)
     @php($next=$program->groups->first())
     <article class="dpo-program-card" data-dpo-card data-search="{{ IlluminateSupportStr::lower(($program->code ?: 'ДПО').' '.$program->title.' '.($program->qualification ?: '').' '.($program->description ?: '')) }}">
      <div class="dpo-card-top">
       <span class="dpo-program-code">{{ $program->code ?: 'ДПО' }}</span>
       <span class="dpo-hours">{{ $program->hours }} ч.</span>
      </div>

      <h3>{{ $program->title }}</h3>

      @if($program->qualification)
       <p class="dpo-qualification">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3M8 12h8"/></svg>
        <span>{{ $program->qualification }}</span>
       </p>
      @endif

      @if($program->description)
       <p class="dpo-description">{{ IlluminateSupportStr::limit($program->description,190) }}</p>
      @else
       <p class="dpo-description">Откройте программу, чтобы посмотреть содержание обучения, результаты и условия зачисления.</p>
      @endif

      <div class="dpo-card-meta">
       <div>
        <small>Ближайший набор</small>
        @if($next)
         <b>{{ $next->starts_on?->format('d.m.Y') ?: 'Дата уточняется' }} · {{ $next->name }}</b>
        @else
         <b>Группа формируется</b>
        @endif
       </div>
       <div>
        <small>Приём заявок</small>
        <b>{{ $program->applications_open ? 'Открыт' : 'Временно закрыт' }}</b>
       </div>
      </div>

      <div class="dpo-card-actions">
       <a class="dpo-primary" href="{{ route('dpo.program',$program->slug) }}">Подробнее <span>→</span></a>
       @if($program->applications_open)
        <a class="dpo-secondary" href="{{ route('dpo.program',$program->slug) }}#apply">Подать заявку</a>
       @endif
      </div>
     </article>
    @empty
     <div class="dpo-empty" style="grid-column:1/-1"><b>Новые программы готовятся к публикации.</b><br>Информация появится здесь после открытия набора.</div>
    @endforelse
   </div>
   <div class="dpo-empty dpo-empty-search mt-3" id="dpoEmptySearch"><b>По вашему запросу программ не найдено.</b><br>Попробуйте изменить формулировку.</div>
  </div>
 </section>

 <section class="dpo-how">
  <div class="container-xxl">
   <div class="dpo-how-head"><span class="dpo-kicker">Как начать обучение</span><h2>От заявки до результата</h2><p>Весь основной путь слушателя собран в цифровой системе ДПО колледжа.</p></div>
   <div class="dpo-steps">
    <div class="dpo-step"><span class="dpo-step-no">01</span><b>Выберите программу</b><p>Посмотрите объём, содержание, квалификацию и ближайшие группы.</p></div>
    <div class="dpo-step"><span class="dpo-step-no">02</span><b>Подайте заявку</b><p>Заполните короткую форму. После проверки вас зачислят в учебную группу.</p></div>
    <div class="dpo-step"><span class="dpo-step-no">03</span><b>Учитесь в кабинете</b><p>Уроки, расписание, задания, тесты, SCORM и календарь доступны в одном месте.</p></div>
    <div class="dpo-step"><span class="dpo-step-no">04</span><b>Получите документ</b><p>После выполнения условий программы документ можно проверить по уникальному коду.</p></div>
   </div>
  </div>
 </section>

 <section class="dpo-bottom-cta">
  <div class="container-xxl">
   <div class="dpo-cta-box">
    <div><h2>Уже зачислены на обучение?</h2><p>Откройте личный кабинет: там расписание, материалы, задания и результаты.</p></div>
    <a class="dpo-secondary" href="{{ route('dpo.login') }}">Перейти в кабинет ДПО →</a>
   </div>
  </div>
 </section>
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded',function(){
 const input=document.getElementById('dpoProgramSearch');
 if(!input) return;
 const cards=[...document.querySelectorAll('[data-dpo-card]')];
 const count=document.getElementById('dpoVisibleCount');
 const empty=document.getElementById('dpoEmptySearch');
 const normalize=value=>(value||'').toLocaleLowerCase('ru-RU').trim();
 const filter=()=>{
  const query=normalize(input.value);
  let visible=0;
  cards.forEach(card=>{
   const show=!query || normalize(card.dataset.search).includes(query);
   card.hidden=!show;
   if(show) visible++;
  });
  if(count) count.textContent=visible;
  if(empty) empty.style.display=visible===0?'block':'none';
 };
 input.addEventListener('input',filter);
});
</script>
@endpush
