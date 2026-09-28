@php
 $editorId=$editorId ?? 'rich-editor-'.uniqid();
 $editorName=$name ?? 'content';
 $editorValue=old($editorName,$value ?? '');
 $editorMedia=$media ?? collect();
@endphp

<div class="rich-editor" id="{{ $editorId }}" data-rich-editor>
 <div class="rich-editor-head">
  <div>
   <span class="eyebrow">VISUAL EDITOR</span>
   <b>Редактор содержимого</b>
  </div>
  <div class="rich-editor-mode">
   <button type="button" class="active" data-rich-mode="visual">Визуально</button>
   <button type="button" data-rich-mode="html">HTML</button>
  </div>
 </div>

 <div class="rich-editor-toolbar" data-rich-toolbar>
  <div class="rich-tool-group">
   <select class="rich-format-select" data-rich-format title="Стиль блока">
    <option value="p">Обычный текст</option>
    <option value="h2">Заголовок H2</option>
    <option value="h3">Заголовок H3</option>
    <option value="h4">Заголовок H4</option>
   </select>
  </div>

  <div class="rich-tool-group">
   <button type="button" data-rich-command="bold" title="Жирный"><b>B</b></button>
   <button type="button" data-rich-command="italic" title="Курсив"><i>I</i></button>
   <button type="button" data-rich-command="underline" title="Подчёркивание"><u>U</u></button>
   <button type="button" data-rich-command="removeFormat" title="Очистить форматирование">Tx</button>
  </div>

  <div class="rich-tool-group">
   <button type="button" data-rich-command="insertUnorderedList" title="Маркированный список">• Список</button>
   <button type="button" data-rich-command="insertOrderedList" title="Нумерованный список">1. Список</button>
   <button type="button" data-rich-blockquote title="Цитата">❝</button>
  </div>

  <div class="rich-tool-group">
   <button type="button" data-rich-command="justifyLeft" title="По левому краю">≡</button>
   <button type="button" data-rich-command="justifyCenter" title="По центру">≡</button>
   <button type="button" data-rich-command="justifyRight" title="По правому краю">≡</button>
  </div>

  <div class="rich-tool-group">
   <button type="button" data-rich-link title="Вставить ссылку">🔗 Ссылка</button>
   <button type="button" data-rich-table title="Вставить таблицу">▦ Таблица</button>
   <button type="button" data-rich-rule title="Разделитель">— Линия</button>
   <button type="button" data-rich-media-open title="Вставить из медиатеки">▣ Медиа</button>
  </div>

  <div class="rich-tool-group ms-auto">
   <button type="button" data-rich-undo title="Отменить">↶</button>
   <button type="button" data-rich-redo title="Повторить">↷</button>
  </div>
 </div>

 <div class="rich-editor-surface" contenteditable="true" data-rich-surface>{!! $editorValue !!}</div>
 <textarea class="rich-editor-source" data-rich-source spellcheck="false">{{ $editorValue }}</textarea>
 <textarea name="{{ $editorName }}" data-rich-output hidden>{{ $editorValue }}</textarea>

 <div class="rich-media-panel" data-rich-media-panel hidden>
  <div class="rich-media-panel-head">
   <div><span class="eyebrow">MEDIA LIBRARY</span><b>Вставить в текст</b></div>
   <button type="button" data-rich-media-close aria-label="Закрыть">×</button>
  </div>
  <input type="search" class="form-control rich-media-search" data-rich-media-search placeholder="Найти файл в медиатеке">
  <div class="rich-media-grid">
   @forelse($editorMedia as $asset)
    <button
     type="button"
     class="rich-media-item"
     data-rich-media-item
     data-media-type="{{ $asset->type }}"
     data-media-url="{{ $asset->url }}"
     data-media-title="{{ $asset->title ?: $asset->original_name }}"
     data-media-alt="{{ $asset->alt ?: ($asset->title ?: $asset->original_name) }}"
     data-media-search="{{ strtolower(($asset->title ?: '').' '.$asset->original_name.' '.$asset->extension) }}"
    >
     <span class="rich-media-preview">
      @if($asset->isImage())
       <img src="{{ $asset->url }}" alt="">
      @else
       <span>{{ $asset->type==='model_3d' ? '3D' : strtoupper($asset->extension) }}</span>
      @endif
     </span>
     <span class="rich-media-name">{{ $asset->title ?: $asset->original_name }}</span>
     <small>{{ strtoupper($asset->extension) }} · {{ $asset->human_size }}</small>
    </button>
   @empty
    <div class="rich-media-empty">В медиатеке пока нет файлов.</div>
   @endforelse
  </div>
 </div>

 <div class="rich-editor-hint">
  <span>Визуальный режим сохраняется как HTML.</span>
  <span>Для сложной разметки можно переключиться в режим «HTML».</span>
 </div>
</div>