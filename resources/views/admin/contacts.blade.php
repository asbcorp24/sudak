@extends('admin.layout')
@section('heading','Контакты и карта')
@section('content')
<div class="admin-actions">
 <p>Контактные данные публичной страницы и положение колледжа на карте.</p>
 <a class="btn-ghost" target="_blank" href="{{ route('contacts.index') }}">Открыть страницу ↗</a>
</div>

<form method="post" action="{{ route('admin.contacts.update') }}" class="admin-form">
 @csrf
 <div class="row g-4">
  <div class="col-xl-8">
   <div class="glass-panel">
    <div class="row g-3">
     <div class="col-md-6 field"><label>Заголовок страницы</label><input class="form-control" name="contact_title" value="{{ old('contact_title',$settings['contact_title'] ?? 'Контакты') }}"></div>
     <div class="col-12 field"><label>Вводный текст</label><textarea class="form-control" rows="3" name="contact_intro">{{ old('contact_intro',$settings['contact_intro'] ?? 'Свяжитесь с колледжем по вопросам поступления, обучения, практики и сотрудничества.') }}</textarea></div>
     <div class="col-12 field"><label>Название организации</label><input class="form-control" name="contact_org_name" value="{{ old('contact_org_name',$settings['contact_org_name'] ?? 'ГАПОУ «Зеленодольский судостроительный колледж»') }}"></div>
     <div class="col-12 field"><label>Адрес</label><input class="form-control" name="contact_address" value="{{ old('contact_address',$settings['contact_address'] ?? '422542, Республика Татарстан, г. Зеленодольск, ул. Гастелло, д. 4') }}"></div>
     <div class="col-md-6 field"><label>Телефон</label><input class="form-control" name="contact_phone" value="{{ old('contact_phone',$settings['contact_phone'] ?? '+7 (84371) 4-26-17') }}"></div>
     <div class="col-md-6 field"><label>Дополнительный телефон</label><input class="form-control" name="contact_phone_extra" value="{{ old('contact_phone_extra',$settings['contact_phone_extra'] ?? '+7 (84371) 4-24-97') }}"></div>
     <div class="col-md-6 field"><label>Email</label><input type="email" class="form-control" name="contact_email" value="{{ old('contact_email',$settings['contact_email'] ?? 'GAPOU.ZSK@tatar.ru') }}"></div>
     <div class="col-md-6 field"><label>Режим работы</label><input class="form-control" name="contact_work_hours" value="{{ old('contact_work_hours',$settings['contact_work_hours'] ?? '') }}" placeholder="Пн–Сб, 08:00–17:00"></div>
     <div class="col-md-6 field"><label>VK</label><input class="form-control" name="contact_vk" value="{{ old('contact_vk',$settings['contact_vk'] ?? 'https://vk.com/public222804276') }}"></div>
     <div class="col-md-6 field"><label>Telegram</label><input class="form-control" name="contact_telegram" value="{{ old('contact_telegram',$settings['contact_telegram'] ?? 'https://t.me/zsk24RT') }}"></div>
    </div>
   </div>

   <div class="glass-panel mt-4">
    <span class="eyebrow">MAP</span>
    <h3 class="mt-2">Координаты карты</h3>
    <p class="text-secondary">Если координаты оставить пустыми, карта автоматически ищет колледж по адресу. При заполнении координат будет показана точная метка.</p>
    <div class="row g-3">
     <div class="col-md-4 field"><label>Широта</label><input type="number" step="0.000001" class="form-control" name="contact_lat" value="{{ old('contact_lat',$settings['contact_lat'] ?? '') }}"></div>
     <div class="col-md-4 field"><label>Долгота</label><input type="number" step="0.000001" class="form-control" name="contact_lng" value="{{ old('contact_lng',$settings['contact_lng'] ?? '') }}"></div>
     <div class="col-md-4 field"><label>Масштаб</label><input type="number" min="5" max="19" class="form-control" name="contact_map_zoom" value="{{ old('contact_map_zoom',$settings['contact_map_zoom'] ?? 17) }}"></div>
    </div>
   </div>
  </div>

  <div class="col-xl-4">
   <div class="glass-panel">
    <div class="field"><label>Реквизиты / дополнительная информация</label><textarea class="form-control" rows="14" name="contact_requisites">{{ old('contact_requisites',$settings['contact_requisites'] ?? '') }}</textarea></div>
    <button class="btn-tech w-100 justify-content-center">Сохранить контакты</button>
   </div>
  </div>
 </div>
</form>
@endsection