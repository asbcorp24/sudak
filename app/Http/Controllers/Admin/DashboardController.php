<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; use App\Models\Page; use App\Models\NewsPost; use App\Models\Specialty;
class DashboardController extends Controller{
 public function __invoke(){return view('admin.dashboard',['pagesCount'=>Page::count(),'newsCount'=>NewsPost::count(),'specialtiesCount'=>Specialty::count()]);}
}