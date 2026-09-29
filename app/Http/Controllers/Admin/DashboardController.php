<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\MediaAsset;
use App\Models\NewsPost;
use App\Models\OfficialDocument;
use App\Models\Page;
use App\Models\ScheduleEntry;
use App\Models\Specialty;
use App\Models\User;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user=auth()->user();

        if($user->adminScope()==='dpo'){
            return redirect()->route('admin.dpo.index');
        }

        if($user->adminScope()==='schedule'){
            return redirect()->route('admin.schedule.index');
        }

        return view('admin.dashboard',[
            'pagesCount'=>Page::count(),
            'newsCount'=>NewsPost::count(),
            'specialtiesCount'=>Specialty::count(),
            'mediaCount'=>MediaAsset::count(),
            'employeesCount'=>Employee::count(),
            'documentsCount'=>OfficialDocument::count(),
            'scheduleCount'=>ScheduleEntry::whereDate('lesson_date',now()->toDateString())->count(),
            'pendingStudentsCount'=>User::where('user_type','student')->where('student_approval_status','pending')->count(),
        ]);
    }
}
