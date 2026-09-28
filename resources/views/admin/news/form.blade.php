@extends('admin.layout')
@section('heading',$post->exists?'Редактирование новости':'Новая новость')
@section('content')
<form class="admin-form" method="post" action="{{ $post->exists ? route('admin.news.update',$post) : route('admin.news.store') }}">
 @csrf @if($post->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="field"><label>Заголовок</label><input class="form-control" name="title" value="{{ old('title',$post->title) }}" required></div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" value="{{ old('slug',$post->slug) }}"></div>
   <div class="field"><label>Анонс</label><textarea class="form-control" rows="3" name="excerpt">{{ old('excerpt',$post->excerpt) }}</textarea></div>
   <div class="field"><label>Текст (HTML)</label><textarea class="form-control code-area" rows="18" name="content">{{ old('content',$post->content) }}</textarea></div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel">
    <div class="field"><label>Дата публикации</label><input class="form-control" type="datetime-local" name="published_at" value="{{ old('published_at',$post->published_at?->format('Y-m-d\TH:i')) }}"></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$post->exists?$post->is_published:true))> Опубликовано</label>
    <button class="btn-tech w-100 justify-content-center mt-3">Сохранить</button>
   </div>
  </div>
 </div>
 @include('admin.partials.media-picker',['pickerId'=>'news-media'])
 <div class="mt-4"><button class="btn-tech">Сохранить новость</button></div>
</form>
@endsection