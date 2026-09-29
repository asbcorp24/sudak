<?php
namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;
use ZipArchive;

class DpoScormImporter
{
    public function import(UploadedFile $file): array
    {
        if (!class_exists(ZipArchive::class)) {
            throw new RuntimeException('На сервере не установлено PHP-расширение zip.');
        }

        if (strtolower($file->getClientOriginalExtension())!=='zip') {
            throw new RuntimeException('SCORM-пакет должен быть ZIP-архивом.');
        }

        $zip=new ZipArchive();
        if ($zip->open($file->getRealPath())!==true) {
            throw new RuntimeException('Не удалось открыть ZIP-архив.');
        }

        $uuid=(string)Str::uuid();
        $root='dpo/scorm/'.$uuid;
        Storage::disk('public')->makeDirectory($root);

        $manifestRelative=null;

        try {
            for ($i=0;$i<$zip->numFiles;$i++) {
                $name=str_replace('\\','/',$zip->getNameIndex($i));
                $name=ltrim($name,'/');

                if ($name==='' || str_contains($name,'../') || str_starts_with($name,'..')) {
                    throw new RuntimeException('SCORM-архив содержит небезопасный путь.');
                }

                if (str_ends_with($name,'/')) {
                    Storage::disk('public')->makeDirectory($root.'/'.$name);
                    continue;
                }

                if (basename(strtolower($name))==='imsmanifest.xml' && $manifestRelative===null) {
                    $manifestRelative=$name;
                }

                $stream=$zip->getStream($zip->getNameIndex($i));
                if (!$stream) continue;

                $contents=stream_get_contents($stream);
                fclose($stream);

                Storage::disk('public')->put($root.'/'.$name,$contents);
            }
        } finally {
            $zip->close();
        }

        if (!$manifestRelative) {
            Storage::disk('public')->deleteDirectory($root);
            throw new RuntimeException('В архиве не найден imsmanifest.xml.');
        }

        $manifestPath=Storage::disk('public')->path($root.'/'.$manifestRelative);
        $meta=$this->manifestMeta($manifestPath);

        $manifestDir=trim(dirname($manifestRelative),'.');
        $launchHref=urldecode($meta['launch_path']);
        $parsed=parse_url($launchHref);
        $launchFile=$parsed['path'] ?? $launchHref;
        $launchRelative=ltrim(($manifestDir?$manifestDir.'/':'').$launchFile,'/');
        $launchRelative=$this->normalizeRelative($launchRelative);

        if (!Storage::disk('public')->exists($root.'/'.$launchRelative)) {
            Storage::disk('public')->deleteDirectory($root);
            throw new RuntimeException('Файл запуска SCORM не найден: '.$launchRelative);
        }

        $launchSuffix='';
        if(isset($parsed['query'])) $launchSuffix.='?'.$parsed['query'];
        if(isset($parsed['fragment'])) $launchSuffix.='#'.$parsed['fragment'];

        return [
            'storage_path'=>$root,
            'launch_path'=>$launchRelative.$launchSuffix,
            'scorm_version'=>$meta['version'],
            'manifest_identifier'=>$meta['identifier'],
            'package_hash'=>hash_file('sha256',$file->getRealPath()),
        ];
    }

    private function manifestMeta(string $path): array
    {
        $dom=new \DOMDocument();
        libxml_use_internal_errors(true);

        if (!$dom->load($path,LIBXML_NONET|LIBXML_NOERROR|LIBXML_NOWARNING)) {
            throw new RuntimeException('Не удалось прочитать imsmanifest.xml.');
        }

        $xpath=new \DOMXPath($dom);
        $manifest=$xpath->query('/*[local-name()="manifest"]')->item(0);
        $identifier=$manifest?->attributes?->getNamedItem('identifier')?->nodeValue;

        $schemaVersion='';
        $nodes=$xpath->query('//*[local-name()="schemaversion"]');
        if ($nodes->length) $schemaVersion=trim($nodes->item(0)->textContent);

        $version=str_contains(strtolower($schemaVersion),'2004') ? '2004' : '1.2';

        $item=$xpath->query('//*[local-name()="item"][@identifierref]')->item(0);
        if (!$item) throw new RuntimeException('В manifest не найден запускаемый SCO.');

        $resourceId=$item->attributes->getNamedItem('identifierref')?->nodeValue;
        if (!$resourceId) throw new RuntimeException('В manifest отсутствует identifierref.');

        $resource=null;
        foreach ($xpath->query('//*[local-name()="resource"][@identifier]') as $candidate) {
            if ($candidate->attributes->getNamedItem('identifier')?->nodeValue===$resourceId) {
                $resource=$candidate;
                break;
            }
        }

        if (!$resource) throw new RuntimeException('В manifest не найден ресурс '.$resourceId.'.');

        $href=$resource->attributes->getNamedItem('href')?->nodeValue;
        if (!$href) {
            $file=$xpath->query('.//*[local-name()="file"][@href]',$resource)->item(0);
            $href=$file?->attributes?->getNamedItem('href')?->nodeValue;
        }

        if (!$href) throw new RuntimeException('В manifest не указан стартовый файл SCORM.');

        return [
            'identifier'=>$identifier,
            'version'=>$version,
            'launch_path'=>$href,
        ];
    }

    private function normalizeRelative(string $path): string
    {
        $parts=[];
        foreach (explode('/',$path) as $part) {
            if ($part==='' || $part==='.') continue;
            if ($part==='..') {
                array_pop($parts);
                continue;
            }
            $parts[]=$part;
        }
        return implode('/',$parts);
    }
}
