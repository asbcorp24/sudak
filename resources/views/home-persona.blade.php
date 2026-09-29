<section class="home-persona" data-home-persona @if(auth()->check() && auth()->user()->user_type==='student') data-default-persona="student" @endif>
 <div class="container-xxl">
  <div class="home-persona-shell">
   <div class="home-persona-heading">
    <div>
     <span class="eyebrow">ВАШ МАРШРУТ / ЗСК</span>
     <h2>Что вам нужно в колледже?</h2>
     <p>Выберите свою роль — главная страница поднимет нужные разделы выше. Выбор можно изменить в любой момент.</p>
    </div>
    <button type="button" class="home-persona-reset" data-persona-reset hidden>Сбросить выбор</button>
   </div>

   <div class="home-persona-switch" role="group" aria-label="Выберите свою роль">
    <button type="button" data-persona="applicant"><span>01</span><b>Я абитуриент</b><small>Поступление и специальности</small></button>
    <button type="button" data-persona="student"><span>02</span><b>Я студент</b><small>Расписание и кабинет</small></button>
    <button type="button" data-persona="parent"><span>03</span><b>Я родитель</b><small>Учёба и события</small></button>
    <button type="button" data-persona="employee"><span>04</span><b>Я сотрудник</b><small>Рабочие разделы</small></button>
    <button type="button" data-persona="dpo"><span>05</span><b>Я слушатель ДПО</b><small>Дополнительное образование</small></button>
   </div>

   <div class="home-persona-result" data-persona-result hidden aria-live="polite">
    <div class="home-persona-result-copy">
     <span class="eyebrow" data-persona-eyebrow>ПЕРСОНАЛЬНЫЙ МАРШРУТ</span>
     <h3 data-persona-title></h3>
     <p data-persona-text></p>
    </div>

    <div class="home-persona-actions" data-persona-panel="applicant" hidden>
     <a href="{{ route('specialties.index') }}"><span>01</span><b>Специальности</b><small>Сроки, квалификации и профессии</small></a>
     <a href="{{ route('admission.create') }}"><span>02</span><b>Подать заявление</b><small>Заявка в приёмную комиссию</small></a>
     <a href="{{ route('calendar.index') }}"><span>03</span><b>Дни открытых дверей</b><small>Календарь колледжа</small></a>
     <a href="{{ route('contacts.index') }}"><span>04</span><b>Приёмная комиссия</b><small>Контакты, адрес и карта</small></a>
    </div>

    <div class="home-persona-actions" data-persona-panel="student" hidden>
     <a href="{{ auth()->check() && auth()->user()->user_type==='student' ? route('student.dashboard') : route('student.login') }}"><span>01</span><b>Личный кабинет</b><small>Мои события и уведомления</small></a>
     <a href="{{ route('schedule.index') }}"><span>02</span><b>Расписание</b><small>Занятия по группам и датам</small></a>
     <a href="{{ route('calendar.index') }}"><span>03</span><b>Мероприятия</b><small>Регистрация и события колледжа</small></a>
     <a href="{{ route('document-center.index') }}"><span>04</span><b>Документы</b><small>Положения и учебные документы</small></a>
    </div>

    <div class="home-persona-actions" data-persona-panel="parent" hidden>
     <a href="{{ route('schedule.index') }}"><span>01</span><b>Расписание</b><small>Занятия по группам</small></a>
     <a href="{{ route('news.index') }}"><span>02</span><b>Новости</b><small>Что происходит в колледже</small></a>
     <a href="{{ route('calendar.index') }}"><span>03</span><b>Календарь</b><small>Экзамены, конкурсы и мероприятия</small></a>
     <a href="{{ route('document-center.index') }}"><span>04</span><b>Документы</b><small>Локальные акты и положения</small></a>
    </div>

    <div class="home-persona-actions" data-persona-panel="employee" hidden>
     <a href="{{ route('schedule.index') }}"><span>01</span><b>Расписание</b><small>Занятия и группы</small></a>
     <a href="{{ route('document-center.index') }}"><span>02</span><b>Центр документов</b><small>Приказы, положения и версии</small></a>
     <a href="{{ route('calendar.index') }}"><span>03</span><b>Календарь</b><small>События и дедлайны</small></a>
     <a href="{{ route('admin.login') }}"><span>04</span><b>Управление сайтом</b><small>Вход для сотрудников с доступом</small></a>
    </div>

    <div class="home-persona-actions" data-persona-panel="dpo" hidden>
     <a href="{{ route('dpo.login') }}"><span>01</span><b>Личный кабинет ДПО</b><small>Курсы, уроки и задания</small></a>
     <a href="{{ route('calendar.index') }}"><span>02</span><b>Календарь</b><small>Ближайшие события и сроки</small></a>
     <a href="{{ route('document-center.index') }}"><span>03</span><b>Документы</b><small>Образовательные документы</small></a>
     <a href="{{ route('contacts.index') }}"><span>04</span><b>Контакты</b><small>Связаться с колледжем</small></a>
    </div>
   </div>
  </div>
 </div>
</section>