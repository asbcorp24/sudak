<?php

namespace App\Http\Controllers;

use App\Models\CollegeEvent;
use App\Models\EventRegistration;
use App\Services\StudentNotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EventRegistrationController extends Controller
{
    public function store(Request $request,CollegeEvent $event,StudentNotificationService $notifications)
    {
        $user=$request->user();

        DB::transaction(function() use ($event,$user,$notifications){
            $locked=CollegeEvent::whereKey($event->id)->lockForUpdate()->firstOrFail();

            if(!$locked->is_published || !$locked->registration_enabled || $locked->starts_at->isPast()){
                throw ValidationException::withMessages(['event'=>'Регистрация на это мероприятие закрыта.']);
            }
            if($locked->registration_deadline && $locked->registration_deadline->isPast()){
                throw ValidationException::withMessages(['event'=>'Срок регистрации на мероприятие уже закончился.']);
            }

            $existing=EventRegistration::where('college_event_id',$locked->id)->where('user_id',$user->id)->first();
            if($existing && $existing->status==='registered') return;

            $occupied=EventRegistration::where('college_event_id',$locked->id)->where('status','registered')->count();
            if($locked->capacity && $occupied >= $locked->capacity){
                throw ValidationException::withMessages(['event'=>'Свободных мест на мероприятие больше нет.']);
            }

            EventRegistration::updateOrCreate(
                ['college_event_id'=>$locked->id,'user_id'=>$user->id],
                ['status'=>'registered','registered_at'=>now(),'attended_at'=>null]
            );

            $notifications->notifyUsers(collect([$user]),'event','Регистрация подтверждена',
                $locked->title.' · '.$locked->starts_at->translatedFormat('d F, H:i'),
                route('calendar.show',$locked->slug),
                'event-registration:'.$locked->id.':'.$user->id
            );
        });

        return back()->with('ok','Вы зарегистрированы на мероприятие');
    }

    public function destroy(Request $request,CollegeEvent $event)
    {
        $registration=EventRegistration::where('college_event_id',$event->id)
            ->where('user_id',$request->user()->id)->firstOrFail();

        $registration->update(['status'=>'cancelled','attended_at'=>null]);
        return back()->with('ok','Регистрация отменена');
    }
}
