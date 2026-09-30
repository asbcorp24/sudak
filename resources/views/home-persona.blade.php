<style>
/* Critical light palette: kept inline so an old PWA stylesheet cannot darken this block. */
.home-persona{background:linear-gradient(180deg,#f5faff 0%,#edf6fd 100%)!important;color:#17364d!important;border-color:#d5e5f0!important}
.home-persona .home-persona-shell{background:#fff!important;border-color:#cfe0ec!important;box-shadow:0 18px 55px rgba(27,74,109,.10)!important}
.home-persona .home-persona-heading{background:linear-gradient(135deg,#fff 0%,#f5faff 100%)!important;border-color:#dbe8f1!important}
.home-persona .home-persona-heading h2,.home-persona .home-persona-result-copy h3,.home-persona .home-persona-switch b,.home-persona .home-persona-actions a>b{color:#123a5a!important}
.home-persona .home-persona-heading p,.home-persona .home-persona-result-copy p,.home-persona .home-persona-switch small,.home-persona .home-persona-actions a>small{color:#647e91!important}
.home-persona .eyebrow,.home-persona .home-persona-switch button.active>span,.home-persona .home-persona-actions a>span{color:#1769d2!important}
.home-persona .home-persona-switch,.home-persona .home-persona-result,.home-persona .home-persona-actions{background:#d7e5ef!important}
.home-persona .home-persona-switch button,.home-persona .home-persona-actions a{background:#fff!important;color:#17364d!important}
.home-persona .home-persona-switch button:hover,.home-persona .home-persona-actions a:hover{background:#f0f7fd!important;color:#0d4f91!important}
.home-persona .home-persona-switch button.active{background:linear-gradient(145deg,#e8f4ff,#f8fbff)!important;box-shadow:inset 0 -4px 0 #1769d2!important}
.home-persona .home-persona-result-copy{background:#f5faff!important}
.home-persona .home-persona-reset{background:#fff!important;color:#527087!important;border-color:#c9dce9!important}

/* Theme-aware palette: must live after the critical default rules above. */
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona{
 background:linear-gradient(180deg,var(--theme-bg2),var(--theme-bg))!important;
 color:var(--theme-text)!important;border-color:var(--theme-line)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-shell{
 background:var(--theme-panel)!important;border-color:var(--theme-line)!important;
 box-shadow:0 18px 55px var(--theme-shadow)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-heading{
 background:linear-gradient(135deg,var(--theme-panel),var(--theme-panel2))!important;border-color:var(--theme-line)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-heading h2,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-result-copy h3,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch b,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions a>b{color:var(--theme-text)!important}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-heading p,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-result-copy p,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch small,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions a>small{color:var(--theme-muted)!important}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .eyebrow,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch button.active>span,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions a>span{color:var(--theme-accent)!important}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-result,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions{background:var(--theme-line)!important}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch button,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions a{
 background:var(--theme-panel)!important;color:var(--theme-text)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch button:hover,
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-actions a:hover{
 background:var(--theme-panel2)!important;color:var(--theme-accent)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-switch button.active{
 background:linear-gradient(145deg,var(--theme-panel2),var(--theme-panel))!important;
 box-shadow:inset 0 -4px 0 var(--theme-accent)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-result-copy{
 background:var(--theme-panel2)!important
}
html:not(.a11y-high-contrast)[data-theme]:not([data-theme="standard"]) .home-persona .home-persona-reset{
 background:var(--theme-panel)!important;color:var(--theme-muted)!important;border-color:var(--theme-line)!important
}
html:not(.a11y-high-contrast)[data-theme="hitech"] .home-persona .home-persona-shell{
 box-shadow:0 0 36px color-mix(in srgb,var(--theme-accent) 10%,transparent)!important
}
html:not(.a11y-high-contrast)[data-theme="glamour"] .home-persona .home-persona-shell{border-radius:20px}
html:not(.a11y-high-contrast)[data-theme="glamour"] .home-persona .home-persona-switch button,
html:not(.a11y-high-contrast)[data-theme="glamour"] .home-persona .home-persona-actions a{border-radius:12px}
html:not(.a11y-high-contrast)[data-theme="urban"] .home-persona .home-persona-shell,
html:not(.a11y-high-contrast)[data-theme="urban"] .home-persona .home-persona-switch button,
html:not(.a11y-high-contrast)[data-theme="urban"] .home-persona .home-persona-actions a{border-radius:0!important}

</style>
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
     <a href="{{ route('dpo.catalog') }}"><span>01</span><b>Программы ДПО</b><small>Каталог, сроки и подача заявки</small></a>
     <a href="{{ route('dpo.login') }}"><span>02</span><b>Личный кабинет ДПО</b><small>Курсы, уроки и задания</small></a>
     <a href="{{ route('document-center.index') }}"><span>03</span><b>Документы</b><small>Образовательные документы</small></a>
     <a href="{{ route('contacts.index') }}"><span>04</span><b>Контакты</b><small>Связаться с колледжем</small></a>
    </div>
   </div>
  </div>
 </div>
</section>