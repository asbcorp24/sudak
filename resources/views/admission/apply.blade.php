@extends('layouts.app')
@section('title','Заявка на поступление — Зеленодольский судостроительный колледж')
@section('description','Оставить заявку на поступление в Зеленодольский судостроительный колледж и выбрать интересующую специальность.')
@section('content')
<section class="admission-hero">
 <div id="three-hero" class="three-layer" data-scene="shipyard"></div>
 <div class="container-xxl position-relative">
  <div class="admission-hero-grid">
   <div class="admission-hero-copy">
    <span class="eyebrow">ПРИЁМНАЯ КАМПАНИЯ · 2026–2027</span>
    <h1>Поступай в<br><span>судостроительный</span></h1>
    <p>Выберите направление и оставьте контакты. Приёмная комиссия колледжа свяжется с вами и поможет с дальнейшими шагами.</p>
    <div class="admission-hero-points">
     <span><b>01</b> Выберите специальность</span>
     <span><b>02</b> Оставьте контакты</span>
     <span><b>03</b> Получите консультацию</span>
    </div>
   </div>
   <div class="admission-hero-card">
    <span>ПРИЁМНАЯ КОМИССИЯ</span>
    <strong>Есть вопросы<br>о поступлении?</strong>
    <a href="tel:+78437142617">+7 (84371) 4-26-17</a>
    <a href="mailto:GAPOU.ZSK@tatar.ru">GAPOU.ZSK@tatar.ru</a>
    <small>г. Зеленодольск, ул. Гастелло, 4</small>
   </div>
  </div>
 </div>
</section>

<section class="admission-section">
 <div class="container-xxl">
  @if(session('ok'))
   <div class="admission-success">
    <span>✓</span>
    <div><b>Заявка отправлена</b><p>{{ session('ok') }}</p></div>
   </div>
  @endif

  @if($errors->any())
   <div class="admission-errors">
    <b>Проверьте заполнение формы</b>
    @foreach($errors->all() as $error)<span>{{ $error }}</span>@endforeach
   </div>
  @endif

  <div class="admission-layout">
   <aside class="admission-info">
    <span class="eyebrow">КАК ЭТО РАБОТАЕТ</span>
    <h2>Начните поступление с короткой заявки</h2>
    <p>Не нужно заполнять длинную анкету. Укажите основные данные — сотрудник приёмной комиссии свяжется с вами.</p>

    <div class="admission-steps">
     <article>
      <span>01</span>
      <div><b>Направление</b><p>Выберите специальность, которая вас интересует. Если ещё не решили — это тоже можно указать.</p></div>
     </article>
     <article>
      <span>02</span>
      <div><b>Контакты</b><p>Оставьте имя и номер телефона для обратной связи.</p></div>
     </article>
     <article>
      <span>03</span>
      <div><b>Консультация</b><p>Приёмная комиссия ответит на вопросы и подскажет дальнейшие действия.</p></div>
     </article>
    </div>

    <div class="admission-contact-box">
     <span>ЗЕЛЕНОДОЛЬСКИЙ СУДОСТРОИТЕЛЬНЫЙ КОЛЛЕДЖ</span>
     <a href="tel:+78437142617">+7 (84371) 4-26-17</a>
     <a href="tel:+78437142497">+7 (84371) 4-24-97</a>
     <a href="mailto:GAPOU.ZSK@tatar.ru">GAPOU.ZSK@tatar.ru</a>
     <small>422542, Республика Татарстан,<br>г. Зеленодольск, ул. Гастелло, д. 4</small>
    </div>
   </aside>

   <form class="admission-form" method="post" action="{{ route('admission.store') }}">
    @csrf
    <header class="admission-form-head">
     <div>
      <span class="eyebrow">ОНЛАЙН-ЗАЯВКА</span>
      <h2>Расскажите о себе</h2>
      <p>Поля со звёздочкой обязательны.</p>
     </div>
     <span class="admission-form-number">01</span>
    </header>

    <div class="admission-fields">
     <div class="admission-field admission-field-wide">
      <label for="admission-name">ФИО <em>*</em></label>
      <input id="admission-name" class="form-control" name="name" value="{{ old('name') }}" autocomplete="name" placeholder="Иванов Иван Иванович" required>
     </div>
     <div class="admission-field">
      <label for="admission-birth">Дата рождения</label>
      <input id="admission-birth" type="date" class="form-control" name="birth_date" value="{{ old('birth_date') }}" autocomplete="bday">
     </div>
     <div class="admission-field">
      <label for="admission-phone">Телефон <em>*</em></label>
      <input id="admission-phone" type="tel" class="form-control" name="phone" value="{{ old('phone') }}" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" required>
     </div>
     <div class="admission-field admission-field-wide">
      <label for="admission-email">Email</label>
      <input id="admission-email" type="email" class="form-control" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="name@example.ru">
     </div>
    </div>

    <div class="admission-specialty">
     <div class="admission-form-section-title">
      <div><span>02</span><b>Интересующая специальность</b></div>
      <small>Выберите один вариант</small>
     </div>

     <div class="admission-specialty-grid">
      <label class="admission-specialty-option">
       <input type="radio" name="specialty_id" value="" @checked(old('specialty_id',request('specialty'))==='')>
       <span class="admission-specialty-code">?</span>
       <span class="admission-specialty-copy"><b>Пока не определился</b><small>Нужна помощь с выбором направления</small></span>
       <i>✓</i>
      </label>
      @foreach($specialties as $specialty)
       <label class="admission-specialty-option">
        <input type="radio" name="specialty_id" value="{{ $specialty->id }}" @checked((string)old('specialty_id',request('specialty'))===(string)$specialty->id)>
        <span class="admission-specialty-code">{{ $specialty->code ?: str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span>
        <span class="admission-specialty-copy"><b>{{ $specialty->title }}</b>@if($specialty->code)<small>{{ $specialty->code }}</small>@endif</span>
        <i>✓</i>
       </label>
      @endforeach
     </div>
    </div>

    <div class="admission-comment">
     <div class="admission-form-section-title">
      <div><span>03</span><b>Комментарий</b></div>
      <small>необязательно</small>
     </div>
     <textarea class="form-control" rows="4" name="message" placeholder="Напишите, что хотите уточнить у приёмной комиссии">{{ old('message') }}</textarea>
    </div>

    <footer class="admission-form-footer">
     <p>Нажимая кнопку, вы отправляете данные в приёмную комиссию колледжа для обратной связи.</p>
     <button class="btn-tech admission-submit">
      <span>Отправить заявку</span>
      <b>→</b>
     </button>
    </footer>
   </form>
  </div>
 </div>
</section>
@endsection
