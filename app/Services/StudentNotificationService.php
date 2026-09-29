<?php

namespace App\Services;

use App\Models\PushSubscription as PushSubscriptionModel;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;

class StudentNotificationService
{
    public function notifyScheduleGroup(int $groupId,string $title,string $body,?string $url=null,?string $dedupeKey=null): void
    {
        $this->notifyUsers(User::where('user_type','student')->where('schedule_group_id',$groupId)->get(),'schedule',$title,$body,$url,$dedupeKey);
    }

    public function notifyAllStudents(string $type,string $title,string $body,?string $url=null,?string $dedupeKey=null): void
    {
        User::where('user_type','student')->chunkById(200,function($users) use($type,$title,$body,$url,$dedupeKey){
            $this->notifyUsers($users,$type,$title,$body,$url,$dedupeKey);
        });
    }

    public function notifyUsers(Collection $users,string $type,string $title,string $body,?string $url=null,?string $dedupeKey=null): void
    {
        $pushUsers=collect();

        foreach($users as $user){
            if($dedupeKey){
                $notification=UserNotification::firstOrCreate(
                    ['user_id'=>$user->id,'dedupe_key'=>$dedupeKey],
                    ['type'=>$type,'title'=>$title,'body'=>$body,'url'=>$url]
                );
                if(!$notification->wasRecentlyCreated) continue;
            }else{
                UserNotification::create([
                    'user_id'=>$user->id,'type'=>$type,'title'=>$title,'body'=>$body,'url'=>$url,
                ]);
            }
            if($this->pushEnabled($user,$type)) $pushUsers->push($user);
        }

        if($pushUsers->isNotEmpty()) $this->push($pushUsers,$title,$body,$url);
    }

    private function pushEnabled(User $user,string $type): bool
    {
        return match($type){
            'schedule'=>(bool)$user->notify_schedule,
            'news'=>(bool)$user->notify_news,
            'event'=>(bool)$user->notify_events,
            default=>true,
        };
    }

    private function push(Collection $users,string $title,string $body,?string $url): void
    {
        if(!class_exists(WebPush::class)) return;

        $public=config('services.webpush.public_key');
        $private=config('services.webpush.private_key');
        $subject=config('services.webpush.subject');
        if(!$public || !$private || !$subject) return;

        try{
            $webPush=new WebPush(['VAPID'=>[
                'subject'=>$subject,
                'publicKey'=>$public,
                'privateKey'=>$private,
            ]],[
                'TTL'=>86400,
                'urgency'=>'normal',
                'contentType'=>'application/json',
            ]);

            $payload=json_encode([
                'title'=>$title,
                'body'=>$body,
                'url'=>$url ?: route('student.notifications'),
                'icon'=>'/pwa/icon.svg',
                'badge'=>'/pwa/icon.svg',
            ],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);

            $subscriptions=PushSubscriptionModel::whereIn('user_id',$users->pluck('id'))->get();
            foreach($subscriptions as $stored){
                $subscription=Subscription::create([
                    'endpoint'=>$stored->endpoint,
                    'keys'=>['p256dh'=>$stored->public_key,'auth'=>$stored->auth_token],
                    'contentEncoding'=>$stored->content_encoding ?: 'aes128gcm',
                ]);
                $webPush->queueNotification($subscription,$payload);
            }

            foreach($webPush->flush() as $report){
                if(!$report->isSuccess() && $report->isSubscriptionExpired()){
                    PushSubscriptionModel::where('endpoint_hash',hash('sha256',$report->getEndpoint()))->delete();
                }
            }
        }catch(\Throwable $e){
            Log::warning('PWA push failed',['message'=>$e->getMessage()]);
        }
    }
}
