<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController; use App\Http\Controllers\PageController; use App\Http\Controllers\NewsController; use App\Http\Controllers\SpecialtyController; use App\Http\Controllers\Admin\AuthController; use App\Http\Controllers\Admin\DashboardController; use App\Http\Controllers\Admin\PageAdminController; use App\Http\Controllers\Admin\NewsAdminController; use App\Http\Controllers\Admin\SpecialtyAdminController;
Route::get('/',HomeController::class)->name('home');
Route::get('/specialties',[SpecialtyController::class,'index'])->name('specialties.index');
Route::get('/specialties/{slug}',[SpecialtyController::class,'show'])->name('specialties.show');
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
 Route::get('media',[MediaAdminController::class,'index'])->name('media.index');
 Route::post('media',[MediaAdminController::class,'store'])->name('media.store');
 Route::put('media/{media}',[MediaAdminController::class,'update'])->name('media.update');
 Route::delete('media/{media}',[MediaAdminController::class,'destroy'])->name('media.destroy');
});
