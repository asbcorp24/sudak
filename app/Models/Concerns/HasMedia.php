<?php

namespace App\Models\Concerns;

use App\Models\MediaAsset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

trait HasMedia
{
    public function media()
    {
        return $this->morphToMany(MediaAsset::class, 'mediable', 'media_relations')
            ->withPivot(['collection','sort'])
            ->withTimestamps();
    }

    public function mediaCollection(string $collection)
    {
        return $this->media()
            ->wherePivot('collection', $collection)
            ->orderBy('media_relations.sort')
            ->orderBy('media_assets.id');
    }

    public function getMedia(string $collection): Collection
    {
        if ($this->relationLoaded('media')) {
            return $this->media
                ->filter(fn ($asset) => ($asset->pivot->collection ?? null) === $collection)
                ->sortBy(fn ($asset) => [$asset->pivot->sort ?? 0, $asset->id])
                ->values();
        }

        return $this->mediaCollection($collection)->get();
    }

    public function syncMediaCollection(string $collection, array $ids): void
    {
        $ids = array_values(array_unique(array_filter(array_map('intval', $ids))));
        $type = $this->getMorphClass();
        $now = now();

        DB::transaction(function () use ($collection, $ids, $type, $now) {
            DB::table('media_relations')
                ->where('mediable_type', $type)
                ->where('mediable_id', $this->getKey())
                ->where('collection', $collection)
                ->delete();

            if (!$ids) {
                return;
            }

            $valid = MediaAsset::whereIn('id', $ids)->pluck('id')->map(fn ($id) => (int) $id)->all();
            $validMap = array_flip($valid);
            $rows = [];
            $sort = 0;

            foreach ($ids as $id) {
                if (!isset($validMap[$id])) {
                    continue;
                }

                $rows[] = [
                    'media_asset_id' => $id,
                    'mediable_type' => $type,
                    'mediable_id' => $this->getKey(),
                    'collection' => $collection,
                    'sort' => $sort++,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            if ($rows) {
                DB::table('media_relations')->insert($rows);
            }
        });

        $this->unsetRelation('media');
    }
}
