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

class DashboardController extends Controller
{
    public function __invoke()
    {
        return view('admin.dashboard',[
            'pagesCount'=>Page::count(),
            'newsCount'=>NewsPost::count(),
            'specialtiesCount'=>Specialty::count(),
            'mediaCount'=>MediaAsset::count(),
            'employeesCount'=>Employee::count(),
            'documentsCount'=>OfficialDocument::count(),
            'scheduleCount'=>ScheduleEntry::whereDate('lesson_date',now()->toDateString())->count(),
        ]);
    }
}
