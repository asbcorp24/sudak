<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\Admin\ScheduleAdminController;
use App\Http\Controllers\Admin\ScheduleGroupAdminController;
use App\Http\Controllers\Admin\ScheduleTeacherAdminController;
use App\Http\Controllers\Admin\MediaAdminController;
use App\Http\Controllers\HomeController; use App\Http\Controllers\PageController; use App\Http\Controllers\NewsController; use App\Http\Controllers\SpecialtyController; use App\Http\Controllers\Admin\AuthController; use App\Http\Controllers\Admin\DashboardController; use App\Http\Controllers\Admin\PageAdminController; use App\Http\Controllers\Admin\NewsAdminController; use App\Http\Controllers\Admin\SpecialtyAdminController;
Route::get('/',HomeController::class)->name('home');
Route::get('/specialties',[SpecialtyController::class,'index'])->name('specialties.index');
Route::get('/specialties/{slug}',[SpecialtyController::class,'show'])->name('specialties.show');
Route::get('/schedule',[ScheduleController::class,'index'])->name('schedule.index');
Route::redirect('/section/schedule','/schedule',301);
Route::get('/news',[NewsController::class,'index'])->name('news.index');
Route::get('/news/{slug}',[NewsController::class,'show'])->name('news.show');
Route::get('/section/{slug}',[PageController::class,'show'])->name('pages.show');
Route::get('/admin/login',[AuthController::class,'show'])->name('admin.login');
Route::post('/admin/login',[AuthController::class,'login'])->name('admin.login.post');
Route::post('/admin/logout',[AuthController::class,'logout'])->name('admin.logout');
Route::prefix('admin')->name('admin.')->middleware(['auth','admin'])->group(function(){
 Route::get('/',DashboardController::class)->name('dashboard');
 Route::resource('pages',PageAdminController::class)->except('show');
 Route::resource('news',NewsAdminController::class)->except('show');
 Route::resource('specialties',SpecialtyAdminController::class)->except('show');
 Route::get('schedule',[ScheduleAdminController::class,'index'])->name('schedule.index');
 Route::get('schedule/create',[ScheduleAdminController::class,'create'])->name('schedule.create');
 Route::post('schedule',[ScheduleAdminController::class,'store'])->name('schedule.store');
 Route::get('schedule/{schedule}/edit',[ScheduleAdminController::class,'edit'])->name('schedule.edit');
 Route::put('schedule/{schedule}',[ScheduleAdminController::class,'update'])->name('schedule.update');
 Route::delete('schedule/{schedule}',[ScheduleAdminController::class,'destroy'])->name('schedule.destroy');

 Route::get('schedule-groups',[ScheduleGroupAdminController::class,'index'])->name('schedule.groups');
 Route::post('schedule-groups',[ScheduleGroupAdminController::class,'store'])->name('schedule.groups.store');
 Route::put('schedule-groups/{group}',[ScheduleGroupAdminController::class,'update'])->name('schedule.groups.update');
 Route::delete('schedule-groups/{group}',[ScheduleGroupAdminController::class,'destroy'])->name('schedule.groups.destroy');

 Route::get('schedule-teachers',[ScheduleTeacherAdminController::class,'index'])->name('schedule.teachers');
 Route::post('schedule-teachers',[ScheduleTeacherAdminController::class,'store'])->name('schedule.teachers.store');
 Route::put('schedule-teachers/{teacher}',[ScheduleTeacherAdminController::class,'update'])->name('schedule.teachers.update');
 Route::delete('schedule-teachers/{teacher}',[ScheduleTeacherAdminController::class,'destroy'])->name('schedule.teachers.destroy');

 Route::get('media',[MediaAdminController::class,'index'])->name('media.index');
 Route::post('media',[MediaAdminController::class,'store'])->name('media.store');
 Route::put('media/{media}',[MediaAdminController::class,'update'])->name('media.update');
 Route::delete('media/{media}',[MediaAdminController::class,'destroy'])->name('media.destroy');
});
