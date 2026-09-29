<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Minishlink\WebPush\VAPID;

class GenerateVapidKeys extends Command
{
    protected $signature='pwa:vapid';
    protected $description='Сгенерировать VAPID-ключи для PWA push-уведомлений';

    public function handle(): int
    {
        if(!class_exists(VAPID::class)){
            $this->error('Сначала установите minishlink/web-push через Composer.');
            return self::FAILURE;
        }

        $keys=VAPID::createVapidKeys();
        $this->line('WEBPUSH_PUBLIC_KEY='.$keys['publicKey']);
        $this->line('WEBPUSH_PRIVATE_KEY='.$keys['privateKey']);
        $this->line('WEBPUSH_SUBJECT='.config('app.url'));
        return self::SUCCESS;
    }
}
