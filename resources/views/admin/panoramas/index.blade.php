@extends('admin.layout')
@section('heading','Панорамы 360°')
@section('content')
<style>
.p360-admin{--p-blue:#1769d2;--p-dark:#0b3f86;--p-line:#dbe8f7;color:#173653}
.p360-admin .p360-intro{display:flex;justify-content:space-between;gap:18px;align-items:center;background:linear-gradient(135deg,#f5f9ff,#eaf4ff);border:1px solid var(--p-line);border-radius:18px;padding:18px 20px;margin-bottom:18px}
.p360-admin .p360-intro h2{font-size:20px;color:var(--p-dark);margin:0 0 5px}.p360-admin .p360-intro p{margin:0;color:#607d99}
.p360-admin .p360-form,.p360-admin .p360-card{background:#fff;border:1px solid var(--p-line);border-radius:17px;box-shadow:0 10px 28px rgba(28,75,122,.055)}
.p360-admin .p360-form{padding:18px;margin-bottom:18px}.p360-admin label{font-size:12px;font-weight:800;color:#607b95;margin-bottom:6px}
.p360-admin .form-control,.p360-admin .form-select{background:#fff!important;color:#173653!important;border:1px solid #cbdff3!important;border-radius:11px!important}
.p360-admin .p360-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.p360-admin .p360-card{overflow:hidden}
.p360-admin .p360-preview{height:190px;position:relative;background:#dfeaf6;overflow:hidden}.p360-admin .p360-preview img{width:100%;height:100%;object-fit:cover}.p360-admin .p360-preview:after{content:'360°';position:absolute;right:12px;top:12px;background:rgba(7,36,72,.82);color:#fff;padding:5px 9px;border-radius:999px;font-weight:850;font-size:12px}
.p360-admin .p360-card-body{padding:15px}.p360-admin .p360-meta{font-size:12px;color:#718aa3;margin-bottom:12px}.p360-admin .p360-actions{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid #e7eff7}
.p360-admin .p360-delete{border:0;background:transparent;color:#b42318;font-weight:700}
@media(max-width:900px){.p360-admin .p360-grid{grid-template-columns:1fr}.p360-admin .p360-intro{align-items:flex-start;flex-direction:column}}
</style>
<div class="p360-admin">
 <div class="p360-intro">
  <div><h2>Виртуальные панорамы колледжа</h2><p>Загружайте сферические equirectangular-фото 2:1. Оригинал сохраняется без уменьшения.</p></div>
  <a class="btn-ghost" target="_blank" href="{{ route('panoramas.index') }}">Открыть раздел ↗</a>
 </div>

 <form class="p360-form" method="post" enctype="multipart/form-data" action="{{ route('admin.panoramas.store') }}">@csrf
  <h3 class="h5 mb-3">Добавить панораму</h3>
  <div class="row g-3">
   <div class="col-lg-7"><label>Название *</label><input class="form-control" name="title" required placeholder="Например: Учебная мастерская судостроения"></div>
   <div class="col-lg-5"><label>Место</label><input class="form-control" name="location" placeholder="Корпус, этаж, аудитория"></div>
   <div class="col-12"><label>Описание</label><textarea class="form-control" rows="2" name="description" placeholder="Что пользователь увидит на панораме"></textarea></div>
   <div class="col-lg-7"><label>Панорамное фото 360° *</label><input class="form-control" type="file" name="image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" required><small class="text-secondary">Рекомендуется 6000×3000 или 8192×4096, до 50 МБ.</small></div>
   <div class="col-4 col-lg-2"><label>Порядок</label><input class="form-control" type="number" min="0" name="sort" value="0"></div>
   <div class="col-4 col-lg-1"><label>Старт °</label><input class="form-control" type="number" min="-180" max="180" name="initial_yaw" value="0"></div>
   <div class="col-4 col-lg-2"><label>Наклон °</label><input class="form-control" type="number" min="-80" max="80" name="initial_pitch" value="0"></div>
   <div class="col-md-6 d-flex align-items-center gap-4"><label class="check mb-0"><input type="checkbox" name="is_published" value="1" checked> Сразу опубликовать</label><label class="check mb-0"><input type="checkbox" name="is_home" value="1"> На главной</label></div>
   <div class="col-md-6 text-md-end"><button class="btn-tech">Добавить панораму</button></div>
  </div>
 </form>

 <div class="p360-grid">
  @forelse($panoramas as $panorama)
   <article class="p360-card">
    <div class="p360-preview"><img src="{{ $panorama->image_url }}" alt="{{ $panorama->title }}"></div>
    <div class="p360-card-body">
     <form method="post" enctype="multipart/form-data" action="{{ route('admin.panoramas.update',$panorama) }}">@csrf @method('PUT')
      <div class="row g-2">
       <div class="col-md-8"><label>Название</label><input class="form-control" name="title" value="{{ $panorama->title }}" required></div>
       <div class="col-md-4"><label>Место</label><input class="form-control" name="location" value="{{ $panorama->location }}"></div>
       <div class="col-12"><label>Описание</label><textarea class="form-control" rows="2" name="description">{{ $panorama->description }}</textarea></div>
       <div class="col-12"><label>Заменить 360°-фото</label><input class="form-control" type="file" name="image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"></div>
       <div class="col-4"><label>Порядок</label><input class="form-control" type="number" min="0" name="sort" value="{{ $panorama->sort }}"></div>
       <div class="col-4"><label>Старт °</label><input class="form-control" type="number" min="-180" max="180" name="initial_yaw" value="{{ $panorama->initial_yaw }}"></div>
       <div class="col-4"><label>Наклон °</label><input class="form-control" type="number" min="-80" max="80" name="initial_pitch" value="{{ $panorama->initial_pitch }}"></div>
      </div>
      <div class="p360-meta mt-2">{{ $panorama->image_width }}×{{ $panorama->image_height }} · {{ number_format($panorama->image_size/1048576,1,',',' ') }} МБ</div>
      <div class="p360-actions">
       <div class="d-flex flex-wrap gap-3">
        <label class="check mb-0"><input type="checkbox" name="is_published" value="1" @checked($panorama->is_published)> Опубликована</label>
        <label class="check mb-0"><input type="checkbox" name="is_home" value="1" @checked($panorama->is_home)> На главной</label>
       </div>
       <button class="btn-ghost">Сохранить</button>
      </div>
     </form>
     <div class="d-flex justify-content-between align-items-center mt-2">
      <a class="btn-tech" href="{{ route('admin.panoramas.builder',$panorama) }}">◎ Точки и переходы</a>
      <span class="small text-secondary">{{ $panorama->hotspots_count }} точек</span>
     </div>
     <form class="text-end mt-2" method="post" action="{{ route('admin.panoramas.destroy',$panorama) }}" onsubmit="return confirm('Удалить панораму и её файл?')">@csrf @method('DELETE')<button class="p360-delete">Удалить ×</button></form>
    </div>
   </article>
  @empty
   <div class="p360-card"><div class="p360-card-body">Панорам пока нет. Загрузите первое сферическое изображение.</div></div>
  @endforelse
 </div>
</div>
@endsection
