<?php

namespace App\Console\Commands;

use App\Models\NewsPost;
use App\Services\StudentNotificationService;
use Illuminate\Console\Command;

class SendPublishedNewsNotifications extends Command
{
    protected $signature='news:send-published-notifications';
    protected $description='Отправить уведомления о новых опубликованных новостях';

    public function handle(StudentNotificationService $notifications): int
    {
        NewsPost::published()->orderByDesc('published_at')->limit(50)->get()->each(function($post) use($notifications){
            $notifications->notifyAllStudents(
                'news','Опубликована новость',$post->title,
                route('news.show',$post->slug),
                'news-published:'.$post->id
            );
        });

        return self::SUCCESS;
    }
}
