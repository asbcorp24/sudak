@foreach($items as $node)
<a class="{{ ($mobile ?? false) ? 'mobile-sub-link' : 'dropdown-item' }}" style="padding-left:{{ 12 + (($depth ?? 0) * 14) }}px" href="{{ route('pages.show',$node->slug) }}">
 @if(($depth ?? 0)>0)<span class="menu-branch">↳</span>@endif {{ $node->menu_title ?: $node->title }}
</a>
@if($node->childrenRecursive->count())
 @include('partials.menu-tree',['items'=>$node->childrenRecursive,'depth'=>($depth ?? 0)+1,'mobile'=>$mobile ?? false])
@endif
@endforeach