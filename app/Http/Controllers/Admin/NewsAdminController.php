<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\NewsPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class NewsAdminController extends Controller
{
    public function index()
    {
        return view('admin.news.index', [
            'posts' => NewsPost::with('media')->latest('published_at')->paginate(30),
        ]);
    }

    public function create()
    {
        return view('admin.news.form', $this->formData(new NewsPost));
    }

    public function store(Request $request)
    {
        [$data, $cover, $content] = $this->data($request);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        $post = NewsPost::create($data);
        $post->syncMediaCollection('cover', $cover ? [$cover] : []);
        $post->syncMediaCollection('content', $content);

        return redirect()->route('admin.news.index')->with('ok', 'Новость создана');
    }

    public function edit(NewsPost $news)
    {
        $news->load('media');
        return view('admin.news.form', $this->formData($news));
    }

    public function update(Request $request, NewsPost $news)
    {
        [$data, $cover, $content] = $this->data($request, $news->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        $news->update($data);
        $news->syncMediaCollection('cover', $cover ? [$cover] : []);
        $news->syncMediaCollection('content', $content);

        return redirect()->route('admin.news.index')->with('ok', 'Новость обновлена');
    }

    public function destroy(NewsPost $news)
    {
        $news->syncMediaCollection('cover', []);
        $news->syncMediaCollection('content', []);
        $news->delete();

        return back()->with('ok', 'Новость удалена');
    }

    private function formData(NewsPost $post): array
    {
        return [
            'post' => $post,
            'media' => MediaAsset::latest()->get(),
            'selectedCover' => $post->exists ? optional($post->getMedia('cover')->first())->id : null,
            'selectedContent' => $post->exists ? $post->getMedia('content')->pluck('id')->all() : [],
        ];
    }

    private function data(Request $request, $id = null): array
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'slug' => 'nullable|max:191|unique:news_posts,slug,' . ($id ?? 'NULL'),
            'excerpt' => 'nullable',
            'content' => 'nullable',
            'published_at' => 'nullable|date',
            'is_published' => 'nullable|boolean',
            'main_media_id' => 'nullable|integer|exists:media_assets,id',
            'content_media_ids' => 'nullable|array',
            'content_media_ids.*' => 'integer|distinct|exists:media_assets,id',
        ]);

        $cover = isset($validated['main_media_id']) && $validated['main_media_id'] !== ''
            ? (int) $validated['main_media_id']
            : null;

        if ($cover && !MediaAsset::whereKey($cover)->where('type', 'image')->exists()) {
            throw ValidationException::withMessages(['main_media_id' => 'Главным медиа может быть только изображение.']);
        }

        $content = array_map('intval', $validated['content_media_ids'] ?? []);
        unset($validated['main_media_id'], $validated['content_media_ids']);
        $validated['is_published'] = $request->boolean('is_published');

        return [$validated, $cover, $content];
    }
}
