<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CollegeEvent;
use App\Models\EventRegistration;
use App\Services\StudentNotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CollegeEventAdminController extends Controller
{
    public function index(Request $request)
    {
        $type=$request->input('type');
        $events=CollegeEvent::query()
            ->when(array_key_exists($type,CollegeEvent::types()),fn($q)=>$q->where('type',$type))
            ->orderByDesc('starts_at')->paginate(30)->withQueryString();

        return view('admin.calendar.index',[
            'events'=>$events,'types'=>CollegeEvent::types(),'activeType'=>$type,
        ]);
    }

    public function create()
    {
        return view('admin.calendar.form',['event'=>new CollegeEvent,'types'=>CollegeEvent::types()]);
    }

    public function store(Request $request,StudentNotificationService $notifications)
    {
        $data=$this->data($request);
        $data['slug']=$data['slug']?:Str::slug($data['title']).'-'.now()->format('ymdHis');
        $event=CollegeEvent::create($data);
        if($event->is_published && $event->registration_enabled){
            $notifications->notifyAllStudents('event','Открыта регистрация',$event->title,route('calendar.show',$event->slug),'event-open:'.$event->id);
        }
        return redirect()->route('admin.calendar.index')->with('ok','Событие добавлено');
    }

    public function edit(CollegeEvent $calendar)
    {
        return view('admin.calendar.form',['event'=>$calendar,'types'=>CollegeEvent::types()]);
    }

    public function update(Request $request,CollegeEvent $calendar,StudentNotificationService $notifications)
    {
        $wasPublished=$calendar->is_published;
        $wasRegistrationEnabled=$calendar->registration_enabled;
        $data=$this->data($request,$calendar->id);
        $data['slug']=$data['slug']?:Str::slug($data['title']).'-'.$calendar->id;
        $calendar->update($data);
        if($calendar->is_published && $calendar->registration_enabled && (!$wasPublished || !$wasRegistrationEnabled)){
            $notifications->notifyAllStudents('event','Открыта регистрация',$calendar->title,route('calendar.show',$calendar->slug),'event-open:'.$calendar->id);
        }
        return redirect()->route('admin.calendar.index')->with('ok','Событие обновлено');
    }

    public function participants(CollegeEvent $calendar)
    {
        $registrations=$calendar->registrations()->with(['user.scheduleGroup'])->orderByDesc('registered_at')->get();
        return view('admin.calendar.participants',['event'=>$calendar,'registrations'=>$registrations]);
    }

    public function participantStatus(Request $request,CollegeEvent $calendar,EventRegistration $registration)
    {
        abort_unless($registration->college_event_id===$calendar->id,404);
        $status=$request->validate(['status'=>'required|in:registered,attended,cancelled'])['status'];
        $registration->update(['status'=>$status,'attended_at'=>$status==='attended'?now():null]);
        return back()->with('ok','Статус участника обновлён');
    }

    public function destroy(CollegeEvent $calendar)
    {
        $calendar->delete();
        return back()->with('ok','Событие удалено');
    }

    private function data(Request $request,$id=null): array
    {
        $data=$request->validate([
            'title'=>'required|string|max:255',
            'slug'=>'nullable|string|max:191|unique:college_events,slug,'.($id??'NULL'),
            'type'=>'required|in:'.implode(',',array_keys(CollegeEvent::types())),
            'starts_at'=>'required|date',
            'ends_at'=>'nullable|date|after_or_equal:starts_at',
            'location'=>'nullable|string|max:255',
            'excerpt'=>'nullable|string|max:1000',
            'description'=>'nullable|string',
            'external_url'=>'nullable|url|max:2000',
            'capacity'=>'nullable|integer|min:1|max:100000',
            'registration_deadline'=>'nullable|date|before_or_equal:starts_at',
            'registration_note'=>'nullable|string|max:1000',
            'sort'=>'nullable|integer|min:0|max:9999',
        ]);
        $data['all_day']=$request->boolean('all_day');
        $data['is_featured']=$request->boolean('is_featured');
        $data['is_published']=$request->boolean('is_published');
        $data['registration_enabled']=$request->boolean('registration_enabled');
        $data['sort']=(int)$request->input('sort',0);
        return $data;
    }
}
