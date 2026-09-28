<section class="section-space"><div class="container-xxl">
 <div class="section-head">
  <div><span class="eyebrow">NEWS / COLLEGE</span><h2>{{ $homeSettings['home_news_title'] ?? 'Жизнь колледжа' }}</h2></div>
  <a href="{{ route('news.index') }}">Все новости →</a>
 </div>
 <div class="row g-4">
 @foreach($news as $post)
  @php($cover=$post->getMedia('cover')->first())
  <div class="col-md-6 col-xl-4">
   <a class="news-card {{ $cover?'has-cover':'' }}" href="{{ route('news.show',$post->slug) }}">
    @if($cover)<span class="news-card-cover"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $post->title }}"></span>@endif
    <span>{{ optional($post->published_at)->format('d.m.Y') }}</span>
    <h3>{{ $post->title }}</h3>
    <p>{{ $post->excerpt }}</p>
   </a>
  </div>
 @endforeach
 </div>
</div></section>