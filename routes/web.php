<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\CooperationController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageAdminController;
use App\Http\Controllers\Admin\NewsAdminController;
use App\Http\Controllers\Admin\SpecialtyAdminController;
use App\Http\Controllers\Admin\ScheduleAdminController;
use App\Http\Controllers\Admin\ScheduleGroupAdminController;
use App\Http\Controllers\Admin\ScheduleTeacherAdminController;
use App\Http\Controllers\Admin\MediaAdminController;
use App\Http\Controllers\Admin\ContactAdminController;
use App\Http\Controllers\Admin\AdmissionAdminController;
use App\Http\Controllers\Admin\CooperationAdminController;

Route::get('/',HomeController::class)->name('home');
Route::get('/specialties',[SpecialtyController::class,'index'])->name('specialties.index');
Route::get('/specialties/{slug}',[SpecialtyController::class,'show'])->name('specialties.show');

Route::get('/schedule',[ScheduleController::class,'index'])->name('schedule.index');
Route::redirect('/section/schedule','/schedule',301);

Route::get('/contacts',[ContactController::class,'index'])->name('contacts.index');
Route::get('/apply',[AdmissionController::class,'create'])->name('admission.create');
Route::post('/apply',[AdmissionController::class,'store'])->name('admission.store');
Route::get('/cooperation',[CooperationController::class,'index'])->name('cooperation.index');
Route::post('/cooperation',[CooperationController::class,'store'])->name('cooperation.store');

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

 Route::get('contacts',[ContactAdminController::class,'edit'])->name('contacts');
 Route::post('contacts',[ContactAdminController::class,'update'])->name('contacts.update');

 Route::get('applications',[AdmissionAdminController::class,'index'])->name('applications.index');
 Route::patch('applications/{application}',[AdmissionAdminController::class,'update'])->name('applications.update');
 Route::delete('applications/{application}',[AdmissionAdminController::class,'destroy'])->name('applications.destroy');

 Route::get('cooperation',[CooperationAdminController::class,'index'])->name('cooperation.index');
 Route::post('cooperation/items',[CooperationAdminController::class,'storeItem'])->name('cooperation.items.store');
 Route::put('cooperation/items/{item}',[CooperationAdminController::class,'updateItem'])->name('cooperation.items.update');
 Route::delete('cooperation/items/{item}',[CooperationAdminController::class,'destroyItem'])->name('cooperation.items.destroy');
 Route::patch('cooperation/applications/{application}',[CooperationAdminController::class,'updateApplication'])->name('cooperation.applications.update');
 Route::delete('cooperation/applications/{application}',[CooperationAdminController::class,'destroyApplication'])->name('cooperation.applications.destroy');

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
