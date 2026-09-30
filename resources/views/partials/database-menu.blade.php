@foreach($items as $item)
 @php($children=$item->childrenRecursive->filter(fn($child)=>($mobile ?? false) ? $child->show_mobile : $child->show_desktop))
 @continue(($mobile ?? false) ? !$item->show_mobile : !$item->show_desktop)
 @if($mobile ?? false)
  <a class="{{ ($depth ?? 0)>0 ? 'mobile-sub-link' : '' }}" style="padding-left:{{ 12 + (($depth ?? 0)*14) }}px" href="{{ $item->href() }}" @if($item->open_in_new_tab) target="_blank" rel="noopener" @endif>
   @if(($depth ?? 0)>0)<span class="menu-branch">↳</span>@endif {{ $item->title }}
  </a>
  @if($children->count()) @include('partials.database-menu',['items'=>$children,'mobile'=>true,'depth'=>($depth ?? 0)+1]) @endif
 @elseif(($depth ?? 0)===0 && $children->count())
  <div class="dropdown">
   <a class="dropdown-toggle" data-bs-toggle="dropdown" href="{{ $item->href() }}" @if($item->open_in_new_tab) target="_blank" rel="noopener" @endif>{{ $item->title }}</a>
   <div class="dropdown-menu tech-dropdown">@include('partials.database-menu',['items'=>$children,'mobile'=>false,'depth'=>1])</div>
  </div>
 @else
  <a class="{{ ($depth ?? 0)>0 ? 'dropdown-item' : '' }}" style="@if(($depth ?? 0)>0)padding-left:{{ 12 + ((($depth ?? 0)-1)*14) }}px @endif" href="{{ $item->href() }}" @if($item->open_in_new_tab) target="_blank" rel="noopener" @endif>
   @if(($depth ?? 0)>1)<span class="menu-branch">↳</span>@endif {{ $item->title }}
  </a>
  @if($children->count()) @include('partials.database-menu',['items'=>$children,'mobile'=>false,'depth'=>($depth ?? 0)+1]) @endif
 @endif
@endforeach