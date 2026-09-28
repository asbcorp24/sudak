<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class MediaImageProcessor
{
    public const MAX_WIDTH = 1920;
    public const MAX_HEIGHT = 1080;

    public function store(UploadedFile $file): array
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $directory = 'media/' . now()->format('Y/m');
        $filename = (string) Str::uuid() . '.' . $extension;
        $path = $directory . '/' . $filename;

        $info = @getimagesize($file->getRealPath());
        if (!$info) {
            throw new RuntimeException('Не удалось прочитать изображение.');
        }

        [$width, $height] = $info;
        $mime = $info['mime'] ?? $file->getMimeType();
        $scale = min(1, self::MAX_WIDTH / max($width, 1), self::MAX_HEIGHT / max($height, 1));
        $targetWidth = max(1, (int) round($width * $scale));
        $targetHeight = max(1, (int) round($height * $scale));

        if ($scale >= 1) {
            Storage::disk('public')->putFileAs($directory, $file, $filename);
        } elseif (class_exists(\Imagick::class)) {
            $this->storeWithImagick($file->getRealPath(), $path, $targetWidth, $targetHeight);
        } elseif (function_exists('imagecreatetruecolor')) {
            $this->storeWithGd($file->getRealPath(), $path, $mime, $targetWidth, $targetHeight);
        } else {
            throw new RuntimeException('Для уменьшения изображений на сервере нужен PHP GD или Imagick.');
        }

        return [
            'path' => $path,
            'mime_type' => $mime,
            'width' => $targetWidth,
            'height' => $targetHeight,
            'size' => Storage::disk('public')->size($path),
        ];
    }

    private function storeWithImagick(string $sourcePath, string $targetPath, int $width, int $height): void
    {
        $image = new \Imagick($sourcePath);
        $image->autoOrient();
        $image->stripImage();
        $image->thumbnailImage($width, $height, true, true);

        $format = strtolower($image->getImageFormat());
        if (in_array($format, ['jpeg','jpg'], true)) {
            $image->setImageCompressionQuality(88);
        }

        Storage::disk('public')->put($targetPath, $image->getImagesBlob());
        $image->clear();
        $image->destroy();
    }

    private function storeWithGd(string $sourcePath, string $targetPath, string $mime, int $width, int $height): void
    {
        $source = match ($mime) {
            'image/jpeg' => @imagecreatefromjpeg($sourcePath),
            'image/png' => @imagecreatefrompng($sourcePath),
            'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($sourcePath) : false,
            default => false,
        };

        if (!$source) {
            throw new RuntimeException('Формат изображения не поддерживается библиотекой GD.');
        }

        $srcWidth = imagesx($source);
        $srcHeight = imagesy($source);
        $target = imagecreatetruecolor($width, $height);

        if (in_array($mime, ['image/png','image/webp'], true)) {
            imagealphablending($target, false);
            imagesavealpha($target, true);
            $transparent = imagecolorallocatealpha($target, 0, 0, 0, 127);
            imagefilledrectangle($target, 0, 0, $width, $height, $transparent);
        }

        imagecopyresampled($target, $source, 0, 0, 0, 0, $width, $height, $srcWidth, $srcHeight);

        ob_start();
        match ($mime) {
            'image/jpeg' => imagejpeg($target, null, 88),
            'image/png' => imagepng($target, null, 6),
            'image/webp' => imagewebp($target, null, 86),
            default => false,
        };
        $binary = ob_get_clean();

        imagedestroy($source);
        imagedestroy($target);

        if ($binary === false) {
            throw new RuntimeException('Не удалось сохранить уменьшенное изображение.');
        }

        Storage::disk('public')->put($targetPath, $binary);
    }
}
