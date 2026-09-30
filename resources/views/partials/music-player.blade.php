@if(isset($musicTracks) && $musicTracks->count())
@php
$musicPlaylist=$musicTracks->map(fn($track)=>[
 'id'=>$track->id,
 'title'=>$track->title,
 'artist'=>$track->artist,
 'url'=>$track->file_url,
])->values()->all();
@endphp
<div class="zsk-mini-player" data-music-player>
 <script type="application/json" data-music-playlist>{!! json_encode($musicPlaylist,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) !!}</script>
 <div class="zsk-player-eq" data-music-eq><i></i><i></i><i></i><i></i></div>
 <div class="zsk-player-copy">
  <span>ЗСК / AUDIO</span>
  <b data-music-title>Музыка колледжа</b>
  <small data-music-artist>Плейлист</small>
 </div>
 <button type="button" class="zsk-player-prev" data-music-prev aria-label="Предыдущий трек">‹</button>
 <button type="button" class="zsk-player-play" data-music-play aria-label="Воспроизведение">▶</button>
 <button type="button" class="zsk-player-next" data-music-next aria-label="Следующий трек">›</button>
 <div class="zsk-player-progress" data-music-progress><i data-music-progress-fill></i></div>
 <div class="zsk-player-time"><span data-music-current>00:00</span><span>/</span><span data-music-duration>00:00</span></div>
 <label class="zsk-player-volume"><span>VOL</span><input type="range" min="0" max="1" step="0.01" value="0.65" data-music-volume aria-label="Громкость"></label>
 <button type="button" class="zsk-player-collapse" data-music-collapse aria-label="Свернуть плеер">⌄</button>
 <audio data-music-audio preload="metadata"></audio>
</div>
@endif
