@extends('admin.layout')
@section('heading',$employee->exists?'Редактирование сотрудника':'Новый сотрудник')
@section('content')
@php
 $scheduleOnly=auth()->user()->adminScope()==='schedule';
 $currentPhoto=$employee->exists ? $employee->getMedia('photo')->first() : null;
 $selectedPhotoId=old('photo_media_id',$selectedPhoto);
 $selectedPhotoAsset=$selectedPhotoId ? $images->firstWhere('id',(int)$selectedPhotoId) : null;
 if(!$selectedPhotoAsset && $currentPhoto && (int)$selectedPhotoId===(int)$currentPhoto->id) $selectedPhotoAsset=$currentPhoto;
@endphp

<form method="post" class="admin-form" action="{{ $employee->exists ? route('admin.employees.update',$employee) : route('admin.employees.store') }}">
 @csrf @if($employee->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="glass-panel">
    <div class="row g-3">
     <div class="col-md-4 field"><label>Тип</label>
      @if($scheduleOnly)
       <input type="hidden" name="employee_type" value="teacher">
       <input class="form-control" value="Преподаватель" disabled>
      @else
       <select class="form-select" name="employee_type"><option value="leadership" @selected(old('employee_type',$employee->employee_type)==='leadership')>Руководство</option><option value="teacher" @selected(old('employee_type',$employee->employee_type)==='teacher')>Преподаватель</option><option value="staff" @selected(old('employee_type',$employee->employee_type)==='staff')>Сотрудник</option></select>
      @endif
     </div>
     <div class="col-md-8 field"><label>ФИО</label><input class="form-control" name="full_name" value="{{ old('full_name',$employee->full_name) }}" required></div>
     <div class="col-12 field"><label>Должность</label><input class="form-control" name="position" value="{{ old('position',$employee->position) }}"></div>
     <div class="col-12 field"><label>Дисциплины</label><textarea class="form-control" rows="3" name="disciplines">{{ old('disciplines',$employee->disciplines) }}</textarea></div>
     <div class="col-md-6 field"><label>Образование</label><textarea class="form-control" rows="5" name="education">{{ old('education',$employee->education) }}</textarea></div>
     <div class="col-md-6 field"><label>Квалификация / повышение квалификации</label><textarea class="form-control" rows="5" name="qualification">{{ old('qualification',$employee->qualification) }}</textarea></div>
     <div class="col-12 field"><label>Достижения</label><textarea class="form-control" rows="5" name="achievements">{{ old('achievements',$employee->achievements) }}</textarea></div>
     <div class="col-12 field"><label>О сотруднике</label><textarea class="form-control" rows="5" name="bio">{{ old('bio',$employee->bio) }}</textarea></div>
    </div>
   </div>
  </div>

  <div class="col-lg-4">
   <div class="glass-panel employee-photo-panel">
    <label class="employee-photo-label">Фотография</label>
    <input type="hidden" id="employee-photo-media-id" name="photo_media_id" value="{{ $selectedPhotoId }}">

    <div class="employee-photo-picker-preview" id="employee-photo-preview">
     @if($selectedPhotoAsset)
      <img src="{{ $selectedPhotoAsset->url }}" alt="{{ $selectedPhotoAsset->alt ?: $selectedPhotoAsset->title }}">
      <div class="employee-photo-placeholder d-none"><span>ФОТО</span><small>не выбрано</small></div>
     @else
      <img src="" alt="" class="d-none">
      <div class="employee-photo-placeholder"><span>ФОТО</span><small>не выбрано</small></div>
     @endif
    </div>

    <div class="employee-photo-actions">
     <label class="btn-tech employee-photo-upload-btn" for="employee-photo-upload">Загрузить новое</label>
     <input id="employee-photo-upload" class="visually-hidden" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
     <button type="button" class="btn-ghost" id="employee-photo-library-open">Выбрать из медиа</button>
     <button type="button" class="employee-photo-remove" id="employee-photo-remove" @if(!$selectedPhotoId) hidden @endif>Удалить фото</button>
    </div>
    <div class="employee-photo-status" id="employee-photo-status" aria-live="polite"></div>

    <div class="field"><label>Email</label><input type="email" class="form-control" name="email" value="{{ old('email',$employee->email) }}"></div>
    <div class="field"><label>Телефон</label><input class="form-control" name="phone" value="{{ old('phone',$employee->phone) }}"></div>
    <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ old('sort',$employee->sort??0) }}"></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$employee->exists?$employee->is_published:true))> Показывать на сайте</label>
    <button class="btn-tech w-100 justify-content-center mt-3">Сохранить</button>
    <a class="btn-ghost w-100 justify-content-center mt-2" href="{{ route('admin.employees.index') }}">Назад</a>
   </div>
  </div>
 </div>
</form>

<dialog class="employee-media-dialog" id="employee-media-dialog">
 <div class="employee-media-dialog-inner">
  <header class="employee-media-dialog-head">
   <div>
    <span class="eyebrow">МЕДИАТЕКА</span>
    <h3>Выберите фотографию</h3>
   </div>
   <button type="button" class="employee-media-close" id="employee-media-close" aria-label="Закрыть">×</button>
  </header>

  <div class="employee-media-search">
   <input class="form-control" id="employee-media-search" type="search" placeholder="Поиск по названию или имени файла">
   <span id="employee-media-count">{{ $images->count() }} изображений</span>
  </div>

  <div class="employee-media-grid" id="employee-media-grid">
   @forelse($images as $image)
    <button
     type="button"
     class="employee-media-item @if((int)$selectedPhotoId===(int)$image->id) is-selected @endif"
     data-media-id="{{ $image->id }}"
     data-media-url="{{ $image->url }}"
     data-media-name="{{ mb_strtolower(($image->title ?: '').' '.($image->original_name ?: '')) }}"
     title="{{ $image->title ?: $image->original_name }}"
    >
     <img src="{{ $image->url }}" alt="{{ $image->alt ?: $image->title ?: $image->original_name }}" loading="lazy">
     <span>{{ $image->title ?: $image->original_name }}</span>
     <i>✓</i>
    </button>
   @empty
    <div class="employee-media-empty">В медиатеке пока нет изображений. Загрузите фотографию кнопкой «Загрузить новое».</div>
   @endforelse
  </div>
 </div>
</dialog>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded',()=>{
 const mediaId=document.getElementById('employee-photo-media-id');
 const preview=document.getElementById('employee-photo-preview');
 const previewImage=preview?.querySelector('img');
 const placeholder=preview?.querySelector('.employee-photo-placeholder');
 const upload=document.getElementById('employee-photo-upload');
 const remove=document.getElementById('employee-photo-remove');
 const status=document.getElementById('employee-photo-status');
 const dialog=document.getElementById('employee-media-dialog');
 const openLibrary=document.getElementById('employee-photo-library-open');
 const closeLibrary=document.getElementById('employee-media-close');
 const search=document.getElementById('employee-media-search');
 const grid=document.getElementById('employee-media-grid');
 const count=document.getElementById('employee-media-count');

 const setPhoto=(id,url)=>{
  mediaId.value=id||'';
  if(id&&url){
   previewImage.src=url;
   previewImage.classList.remove('d-none');
   placeholder.classList.add('d-none');
   remove.hidden=false;
  }else{
   previewImage.src='';
   previewImage.classList.add('d-none');
   placeholder.classList.remove('d-none');
   remove.hidden=true;
  }
  grid?.querySelectorAll('.employee-media-item').forEach(item=>{
   item.classList.toggle('is-selected',String(item.dataset.mediaId)===String(id));
  });
 };

 openLibrary?.addEventListener('click',()=>{
  dialog.showModal();
  setTimeout(()=>search?.focus(),50);
 });
 closeLibrary?.addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('click',e=>{
  if(e.target===dialog) dialog.close();
 });

 grid?.addEventListener('click',e=>{
  const item=e.target.closest('.employee-media-item');
  if(!item) return;
  setPhoto(item.dataset.mediaId,item.dataset.mediaUrl);
  status.textContent='Фотография выбрана. Нажмите «Сохранить», чтобы применить.';
  status.className='employee-photo-status is-ok';
  dialog.close();
 });

 remove?.addEventListener('click',()=>{
  setPhoto('','');
  status.textContent='Фото будет удалено после сохранения.';
  status.className='employee-photo-status';
 });

 search?.addEventListener('input',()=>{
  const q=search.value.trim().toLocaleLowerCase('ru');
  let visible=0;
  grid.querySelectorAll('.employee-media-item').forEach(item=>{
   const show=!q||item.dataset.mediaName.includes(q);
   item.hidden=!show;
   if(show) visible++;
  });
  count.textContent=visible+' изображений';
 });

 upload?.addEventListener('change',async()=>{
  const file=upload.files?.[0];
  if(!file) return;

  status.textContent='Загружаю фотографию…';
  status.className='employee-photo-status is-loading';
  upload.disabled=true;

  const body=new FormData();
  body.append('files[]',file);

  try{
   const response=await fetch(@json(route('admin.media.store')),{
    method:'POST',
    headers:{
     'Accept':'application/json',
     'X-CSRF-TOKEN':@json(csrf_token()),
    },
    body,
   });
   const data=await response.json().catch(()=>({}));
   if(!response.ok) throw new Error(data?.message||Object.values(data?.errors||{})?.flat()?.[0]||'Не удалось загрузить фотографию.');

   const asset=data.assets?.[0];
   if(!asset||!asset.is_image) throw new Error('Загруженный файл не является изображением.');

   setPhoto(asset.id,asset.url);
   status.textContent='Фото загружено и выбрано. Нажмите «Сохранить».';
   status.className='employee-photo-status is-ok';

   if(grid){
    const item=document.createElement('button');
    item.type='button';
    item.className='employee-media-item is-selected';
    item.dataset.mediaId=asset.id;
    item.dataset.mediaUrl=asset.url;
    item.dataset.mediaName=(asset.title||'').toLocaleLowerCase('ru');
    item.title=asset.title||'Фото';
    item.innerHTML='<img alt=""><span></span><i>✓</i>';
    item.querySelector('img').src=asset.url;
    item.querySelector('img').alt=asset.alt||asset.title||'Фото';
    item.querySelector('span').textContent=asset.title||'Фото';
    grid.prepend(item);
   }
  }catch(error){
   status.textContent=error.message||'Ошибка загрузки фотографии.';
   status.className='employee-photo-status is-error';
  }finally{
   upload.disabled=false;
   upload.value='';
  }
 });
});
</script>
@endpush
@endsection
