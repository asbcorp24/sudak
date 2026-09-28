<?php

namespace App\Services;

use App\Models\MediaAsset;
use App\Models\Setting;

class StorageQuota
{
    public static function quotaBytes(): int
    {
        $mb=(int) Setting::valueOf('storage_quota_mb','0');
        return max(0,$mb)*1024*1024;
    }

    public static function usedBytes(): int
    {
        return (int) MediaAsset::sum('size');
    }

    public static function remainingBytes(): ?int
    {
        $quota=self::quotaBytes();
        if($quota<=0) return null;
        return max(0,$quota-self::usedBytes());
    }

    public static function canStore(int $bytes): bool
    {
        $quota=self::quotaBytes();
        return $quota<=0 || self::usedBytes()+max(0,$bytes) <= $quota;
    }

    public static function stats(): array
    {
        $quota=self::quotaBytes();
        $used=self::usedBytes();
        $remaining=$quota>0 ? max(0,$quota-$used) : null;
        $percent=$quota>0 ? min(100,round(($used/$quota)*100,1)) : 0;
        return compact('quota','used','remaining','percent');
    }

    public static function formatBytes(?int $bytes): string
    {
        if($bytes===null) return 'Без лимита';
        $value=max(0,$bytes);
        $units=['Б','КБ','МБ','ГБ','ТБ'];
        $i=0;
        while($value>=1024 && $i<count($units)-1){$value/=1024;$i++;}
        return number_format($value,$i===0?0:1,',',' ').' '.$units[$i];
    }
}
