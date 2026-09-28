<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Services\MediaImageProcessor;
use App\Services\StorageQuota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MediaAdminController extends Controller
{
    private const IMAGE_EXTENSIONS = ['jpg','jpeg','png','webp'];
    private const DOCUMENT_EXTENSIONS = [
        'pdf','doc','docx','xls','xlsx','ppt','pptx','txt','rtf','csv','zip','rar','7z'
    ];
    private const MODEL_EXTENSIONS = [
        'glb','gltf','obj','stl','fbx','dae','3ds','blend','ply'
    ];

    public function index(Request $request)
    {
        $query = MediaAsset::query()->withCount('links')->latest();

        if ($type = $request->string('type')->toString()) {
            if (in_array($type, ['image','document','model_3d'], true)) {
                $query->where('type', $type);
            }
        }

        if ($search = trim($request->string('q')->toString())) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('original_name', 'like', '%' . $search . '%')
                    ->orWhere('title', 'like', '%' . $search . '%');
            });
        }

        return view('admin.media.index', [
            'assets' => $query->paginate(36)->withQueryString(),
        ]);
    }

    public function store(Request $request, MediaImageProcessor $images)
    {
        $data = $request->validate([
            'files' => ['required','array','min:1','max:20'],
            'files.*' => ['required','file','max:102400'],
        ]);

        foreach ($data['files'] as $file) {
            $this->assertAllowed($file->getClientOriginalExtension());
        }

        $incomingBytes = array_sum(array_map(fn ($file) => (int) $file->getSize(), $data['files']));
        if (!StorageQuota::canStore($incomingBytes)) {
            throw ValidationException::withMessages([
                'files' => 'Недостаточно выделенного места. Свободно: ' . StorageQuota::formatBytes(StorageQuota::remainingBytes()) . '. Удалите ненужные файлы или увеличьте лимит в «Главная / SEO / хранилище».',
            ]);
        }

        $created = 0;

        foreach ($data['files'] as $file) {
            $extension = strtolower($file->getClientOriginalExtension());
            $type = $this->typeFromExtension($extension);

            if ($type === 'image') {
                $stored = $images->store($file);
            } else {
                $directory = 'media/' . now()->format('Y/m');
                $filename = (string) Str::uuid() . '.' . $extension;
                $path = $file->storeAs($directory, $filename, 'public');

                $stored = [
                    'path' => $path,
                    'mime_type' => $file->getMimeType(),
                    'width' => null,
                    'height' => null,
                    'size' => Storage::disk('public')->size($path),
                ];
            }

            MediaAsset::create([
                'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                'original_name' => $file->getClientOriginalName(),
                'disk' => 'public',
                'path' => $stored['path'],
                'mime_type' => $stored['mime_type'],
                'extension' => $extension,
                'type' => $type,
                'size' => $stored['size'],
                'width' => $stored['width'],
                'height' => $stored['height'],
                'title' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            ]);

            $created++;
        }

        return back()->with('ok', 'Добавлено файлов: ' . $created);
    }

    public function update(Request $request, MediaAsset $media)
    {
        $data = $request->validate([
            'title' => ['nullable','string','max:255'],
            'alt' => ['nullable','string','max:255'],
        ]);

        $media->update($data);

        return back()->with('ok', 'Данные медиа обновлены');
    }

    public function destroy(MediaAsset $media)
    {
        DB::transaction(function () use ($media) {
            DB::table('media_relations')->where('media_asset_id', $media->id)->delete();
            Storage::disk($media->disk)->delete($media->path);
            $media->delete();
        });

        return back()->with('ok', 'Файл удалён из медиатеки');
    }

    private function assertAllowed(string $extension): void
    {
        $extension = strtolower($extension);
        $allowed = array_merge(self::IMAGE_EXTENSIONS, self::DOCUMENT_EXTENSIONS, self::MODEL_EXTENSIONS);

        if (!in_array($extension, $allowed, true)) {
            throw ValidationException::withMessages([
                'files' => 'Недопустимый формат .' . $extension . '. Разрешены изображения, документы и 3D-модели.',
            ]);
        }
    }

    private function typeFromExtension(string $extension): string
    {
        if (in_array($extension, self::IMAGE_EXTENSIONS, true)) {
            return 'image';
        }

        if (in_array($extension, self::MODEL_EXTENSIONS, true)) {
            return 'model_3d';
        }

        return 'document';
    }
}
