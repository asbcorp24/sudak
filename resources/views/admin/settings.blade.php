@extends('admin.layout')
@section('heading','Главная / SEO / хранилище')
@section('content')
<form method="post" action="{{ route('admin.settings.update') }}" class="admin-form">@csrf
 <div class="settings-tabs mb-4">
  <button type="button" class="btn-ghost active" data-settings-tab="home">Главная страница</button>
  <button type="button" class="btn-ghost" data-settings-tab="seo">SEO</button>
  <button type="button" class="btn-ghost" data-settings-tab="storage">Хранилище</button>
 </div>

 <section data-settings-pane="home">
  <div class="glass-panel">
   <span class="eyebrow">HOME / HERO</span>
   <h3 class="mt-2">Первый экран</h3>
   <div class="row g-3">
    <div class="col-12 field"><label>Надзаголовок</label><input class="form-control" name="home_eyebrow" value="{{ old('home_eyebrow',$settings['home_eyebrow'] ?? 'ГАПОУ • Республика Татарстан • Зеленодольск') }}"></div>
    <div class="col-md-6 field"><label>Заголовок — строка 1</label><input class="form-control" name="home_title_line1" value="{{ old('home_title_line1',$settings['home_title_line1'] ?? 'Строим корабли.') }}"></div>
    <div class="col-md-6 field"><label>Заголовок — строка 2</label><input class="form-control" name="home_title_line2" value="{{ old('home_title_line2',$settings['home_title_line2'] ?? 'Проектируем будущее.') }}"></div>
    <div class="col-12 field"><label>Вводный текст</label><textarea class="form-control" rows="4" name="home_intro">{{ old('home_intro',$settings['home_intro'] ?? 'Колледж, где судостроение, машиностроение, электротехника и IT соединяются в единую инженерную среду.') }}</textarea></div>
    <div class="col-md-6 field"><label>Основная кнопка</label><input class="form-control" name="home_primary_button" value="{{ old('home_primary_button',$settings['home_primary_button'] ?? 'Выбрать специальность') }}"></div>
    <div class="col-md-6 field"><label>Вторая кнопка</label><input class="form-control" name="home_secondary_button" value="{{ old('home_secondary_button',$settings['home_secondary_button'] ?? 'Поступление 2026') }}"></div>
   </div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">HOME / BLOCKS</span>
   <h3 class="mt-2">Блоки главной страницы</h3>
   <p class="text-secondary">Блок можно отключить. Чем меньше число «Порядок», тем выше блок располагается на главной.</p>
   @php
    $sectionLabels=[
     'quick_actions'=>['Быстрые действия','Подать заявку / Расписание / Задать вопрос / Контакты'],
     'schedule'=>['Расписание сегодня','Первые занятия текущего дня'],
     'open_day'=>['День открытых дверей','Ближайшая дата и информация'],
     'specialties'=>['Специальности','Инженерные направления подготовки'],
     'admission'=>['Поступление','Большой блок приёмной кампании'],
     'achievements'=>['Последние достижения','Победы и результаты студентов'],
     'tech'=>['Цифровая верфь','Технологический имиджевый блок'],
     'news'=>['Новости','Последние публикации колледжа'],
    ];
   @endphp
   <div class="home-section-settings">
    @foreach($homeSectionDefaults as $key=>$defaultOrder)
     <div class="home-section-setting">
      <div>
       <b>{{ $sectionLabels[$key][0] }}</b>
       <small>{{ $sectionLabels[$key][1] }}</small>
      </div>
      <label class="check mb-0">
       <input type="checkbox" name="home_section_{{ $key }}_enabled" value="1" @checked(old('home_section_'.$key.'_enabled',($settings['home_section_'.$key.'_enabled'] ?? '1') !== '0'))>
       Включён
      </label>
      <div class="home-section-order">
       <label>Порядок</label>
       <input class="form-control" type="number" min="1" max="999" name="home_section_{{ $key }}_order" value="{{ old('home_section_'.$key.'_order',$settings['home_section_'.$key.'_order'] ?? $defaultOrder) }}">
      </div>
     </div>
    @endforeach
   </div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">HOME / CONTENT</span>
   <h3 class="mt-2">Содержимое блоков</h3>
   <div class="row g-3">
    <div class="col-md-4 field"><label>Надзаголовок специальностей</label><input class="form-control" name="home_specialties_eyebrow" value="{{ old('home_specialties_eyebrow',$settings['home_specialties_eyebrow'] ?? '01 / ПРОФЕССИИ БУДУЩЕГО') }}"></div>
    <div class="col-md-8 field"><label>Заголовок специальностей</label><input class="form-control" name="home_specialties_title" value="{{ old('home_specialties_title',$settings['home_specialties_title'] ?? 'Выбери свою инженерную траекторию') }}"></div>
    <div class="col-12 field"><label>Описание специальностей</label><textarea class="form-control" rows="3" name="home_specialties_text">{{ old('home_specialties_text',$settings['home_specialties_text'] ?? 'Каждая специальность — отдельная интерактивная 3D-среда и свой технологический маршрут.') }}</textarea></div>

    <div class="col-md-6 field"><label>Заголовок расписания</label><input class="form-control" name="home_schedule_title" value="{{ old('home_schedule_title',$settings['home_schedule_title'] ?? 'Расписание на сегодня') }}"></div>
    <div class="col-md-6 field"><label>Заголовок достижений</label><input class="form-control" name="home_achievements_title" value="{{ old('home_achievements_title',$settings['home_achievements_title'] ?? 'Последние достижения') }}"></div>

    <div class="col-md-6 field"><label>Заголовок дня открытых дверей</label><input class="form-control" name="home_open_day_title" value="{{ old('home_open_day_title',$settings['home_open_day_title'] ?? 'Ближайший день открытых дверей') }}"></div>
    <div class="col-md-3 field"><label>Дата</label><input class="form-control" type="date" name="home_open_day_date" value="{{ old('home_open_day_date',$settings['home_open_day_date'] ?? '') }}"></div>
    <div class="col-md-3 field"><label>Время</label><input class="form-control" name="home_open_day_time" value="{{ old('home_open_day_time',$settings['home_open_day_time'] ?? '') }}" placeholder="10:00–14:00"></div>
    <div class="col-12 field"><label>Описание дня открытых дверей</label><textarea class="form-control" rows="3" name="home_open_day_text">{{ old('home_open_day_text',$settings['home_open_day_text'] ?? 'Познакомьтесь со специальностями, лабораториями, преподавателями и условиями поступления.') }}</textarea></div>

    <div class="col-md-6 field"><label>Заголовок поступления</label><input class="form-control" name="home_admission_title" value="{{ old('home_admission_title',$settings['home_admission_title'] ?? 'Поступай в инженерный колледж') }}"></div>
    <div class="col-12 field"><label>Текст блока поступления</label><textarea class="form-control" rows="3" name="home_admission_text">{{ old('home_admission_text',$settings['home_admission_text'] ?? 'Выбери специальность, оставь заявку и получи консультацию приёмной комиссии по документам, срокам и условиям поступления.') }}</textarea></div>

    <div class="col-md-6 field"><label>Заголовок технологического блока</label><input class="form-control" name="home_tech_title" value="{{ old('home_tech_title',$settings['home_tech_title'] ?? 'Колледж как цифровая верфь') }}"></div>
    <div class="col-12 field"><label>Описание технологического блока</label><textarea class="form-control" rows="3" name="home_tech_text">{{ old('home_tech_text',$settings['home_tech_text'] ?? 'Учебные лаборатории, промышленная практика, инженерное проектирование, сетевые технологии и контроль качества — в одной системе подготовки.') }}</textarea></div>
    <div class="col-md-6 field"><label>Заголовок новостей</label><input class="form-control" name="home_news_title" value="{{ old('home_news_title',$settings['home_news_title'] ?? 'Жизнь колледжа') }}"></div>
   </div>
  </div>
 </section>

 <section class="d-none" data-settings-pane="seo">
  <div class="glass-panel">
   <span class="eyebrow">SEARCH / SOCIAL</span>
   <h3 class="mt-2">SEO сайта</h3>
   <div class="row g-3">
    <div class="col-12 field"><label>SEO Title</label><input class="form-control" name="seo_title" value="{{ old('seo_title',$settings['seo_title'] ?? 'Зеленодольский судостроительный колледж') }}"></div>
    <div class="col-12 field"><label>Meta Description</label><textarea class="form-control" rows="3" name="seo_description">{{ old('seo_description',$settings['seo_description'] ?? 'Зеленодольский судостроительный колледж — инженерное и цифровое СПО в Зеленодольске.') }}</textarea></div>
    <div class="col-12 field"><label>Keywords</label><textarea class="form-control" rows="2" name="seo_keywords">{{ old('seo_keywords',$settings['seo_keywords'] ?? 'Зеленодольский судостроительный колледж, судостроение, СПО, Зеленодольск, машиностроение, системное администрирование') }}</textarea></div>
    <div class="col-md-6 field"><label>Robots</label><input class="form-control" name="seo_robots" value="{{ old('seo_robots',$settings['seo_robots'] ?? 'index,follow') }}"></div>
    <div class="col-md-6 field"><label>Canonical URL</label><input class="form-control" name="seo_canonical" value="{{ old('seo_canonical',$settings['seo_canonical'] ?? '') }}"></div>
    <div class="col-12"><hr class="border-secondary"></div>
    <div class="col-12"><h4>OpenGraph / соцсети</h4></div>
    <div class="col-12 field"><label>OG Title</label><input class="form-control" name="seo_og_title" value="{{ old('seo_og_title',$settings['seo_og_title'] ?? '') }}"></div>
    <div class="col-12 field"><label>OG Description</label><textarea class="form-control" rows="3" name="seo_og_description">{{ old('seo_og_description',$settings['seo_og_description'] ?? '') }}</textarea></div>
    <div class="col-12 field"><label>OG Image URL</label><input class="form-control" name="seo_og_image" value="{{ old('seo_og_image',$settings['seo_og_image'] ?? '') }}"></div>
    <div class="col-md-6 field"><label>Twitter Card</label><input class="form-control" name="seo_twitter_card" value="{{ old('seo_twitter_card',$settings['seo_twitter_card'] ?? 'summary_large_image') }}"></div>
   </div>
  </div>
 </section>

 <section class="d-none" data-settings-pane="storage">
  <div class="glass-panel">
   <span class="eyebrow">STORAGE QUOTA</span>
   <h3 class="mt-2">Выделенное место для файлов</h3>
   <p class="text-secondary">Лимит применяется к общей медиатеке: изображениям, документам и 3D-моделям.</p>
   <div class="storage-stats">
    <div><small>Выделено</small><b>{{ $stats['quota_human'] }}</b></div>
    <div><small>Занято</small><b>{{ $stats['used_human'] }}</b></div>
    <div><small>Свободно</small><b>{{ $stats['remaining_human'] }}</b></div>
   </div>
   @if($stats['quota']>0)
    <div class="progress mt-3" style="height:14px;background:rgba(255,255,255,.06)"><div class="progress-bar" style="width:{{ $stats['percent'] }}%">{{ $stats['percent'] }}%</div></div>
   @endif
   <div class="field mt-4" style="max-width:420px">
    <label>Выделено места, МБ</label>
    <input type="number" min="0" step="1" class="form-control" name="storage_quota_mb" value="{{ old('storage_quota_mb',$settings['storage_quota_mb'] ?? 0) }}" required>
    <small class="text-secondary">0 = без программного ограничения. 1024 = 1 ГБ, 10240 = 10 ГБ.</small>
   </div>
  </div>
 </section>

 <div class="mt-4 text-end"><button class="btn-tech">Сохранить настройки</button></div>
</form>

<script>
document.querySelectorAll('[data-settings-tab]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-settings-tab]').forEach(x=>x.classList.toggle('active',x===btn));
 document.querySelectorAll('[data-settings-pane]').forEach(p=>p.classList.toggle('d-none',p.dataset.settingsPane!==btn.dataset.settingsTab));
}));
</script>
@endsection