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
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\PanoramaController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OfficialDocumentController;
use App\Http\Controllers\CollegeCalendarController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\PushSubscriptionController;
use App\Http\Controllers\Student\AuthController as StudentAuthController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Dpo\AuthController as DpoAuthController;
use App\Http\Controllers\Dpo\DashboardController as DpoDashboardController;
use App\Http\Controllers\Dpo\CourseController as DpoCourseController;
use App\Http\Controllers\Dpo\AssignmentController as DpoAssignmentController;
use App\Http\Controllers\Dpo\ScormController as DpoScormController;
use App\Http\Controllers\Dpo\PublicController as DpoPublicController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageAdminController;
use App\Http\Controllers\Admin\NewsAdminController;
use App\Http\Controllers\Admin\SpecialtyAdminController;
use App\Http\Controllers\Admin\ScheduleAdminController;
use App\Http\Controllers\Admin\ScheduleGroupAdminController;
use App\Http\Controllers\Admin\MediaAdminController;
use App\Http\Controllers\Admin\ContactAdminController;
use App\Http\Controllers\Admin\AdmissionAdminController;
use App\Http\Controllers\Admin\CooperationAdminController;
use App\Http\Controllers\Admin\QuestionAdminController;
use App\Http\Controllers\Admin\CompetitionAdminController;
use App\Http\Controllers\Admin\QuizAdminController;
use App\Http\Controllers\Admin\PanoramaAdminController;
use App\Http\Controllers\Admin\SettingsAdminController;
use App\Http\Controllers\Admin\EmployeeAdminController;
use App\Http\Controllers\Admin\OfficialDocumentAdminController;
use App\Http\Controllers\Admin\DpoAdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\CollegeEventAdminController;
use App\Http\Controllers\Admin\StudentAccountAdminController;

Route::get('/',HomeController::class)->name('home');

Route::get('/calendar',[CollegeCalendarController::class,'index'])->name('calendar.index');
Route::get('/calendar/{slug}',[CollegeCalendarController::class,'show'])->name('calendar.show');

Route::get('/specialties',[SpecialtyController::class,'index'])->name('specialties.index');
Route::get('/specialties/{slug}',[SpecialtyController::class,'show'])->name('specialties.show');

Route::get('/schedule',[ScheduleController::class,'index'])->name('schedule.index');
Route::redirect('/section/schedule','/schedule',301);

Route::get('/employees',[EmployeeController::class,'index'])->name('employees.index');
Route::get('/section/teachers',fn()=>redirect()->route('employees.index',['type'=>'teacher'],301));
Route::get('/section/management',fn()=>redirect()->route('employees.index',['type'=>'leadership'],301));

Route::get('/documents',[OfficialDocumentController::class,'index'])->name('document-center.index');
Route::get('/sveden/documents',[OfficialDocumentController::class,'index'])->name('official-documents.index');
Route::get('/section/documents',fn()=>redirect()->route('official-documents.index',[],301));

Route::get('/contacts',[ContactController::class,'index'])->name('contacts.index');
Route::get('/apply',[AdmissionController::class,'create'])->name('admission.create');
Route::post('/apply',[AdmissionController::class,'store'])->name('admission.store');
Route::get('/cooperation',[CooperationController::class,'index'])->name('cooperation.index');
Route::post('/cooperation',[CooperationController::class,'store'])->name('cooperation.store');
Route::get('/question',[QuestionController::class,'create'])->name('questions.create');
Route::post('/question',[QuestionController::class,'store'])->name('questions.store');

Route::get('/competitions',[CompetitionController::class,'index'])->name('competitions.index');
Route::get('/panoramas',[PanoramaController::class,'index'])->name('panoramas.index');
Route::get('/quizzes',[QuizController::class,'index'])->name('quizzes.index');
Route::get('/quizzes/{quiz}',[QuizController::class,'show'])->name('quizzes.show');
Route::post('/quizzes/{quiz}',[QuizController::class,'submit'])->name('quizzes.submit');
Route::get('/quiz-results/{token}',[QuizController::class,'result'])->name('quizzes.result');
Route::get('/certificates/{code}',[QuizController::class,'certificate'])->name('quizzes.certificate');

Route::get('/student/login',[StudentAuthController::class,'showLogin'])->name('student.login');
Route::post('/student/login',[StudentAuthController::class,'login'])->name('student.login.post');
Route::get('/student/register',[StudentAuthController::class,'showRegister'])->name('student.register');
Route::post('/student/register',[StudentAuthController::class,'register'])->name('student.register.post');

Route::prefix('student')->name('student.')->middleware(['auth','student'])->group(function(){
 Route::get('/',[StudentDashboardController::class,'index'])->name('dashboard');
 Route::post('/logout',[StudentAuthController::class,'logout'])->name('logout');
 Route::get('/notifications',[StudentDashboardController::class,'notifications'])->name('notifications');
 Route::get('/notifications/{notification}/read',[StudentDashboardController::class,'read'])->name('notifications.read');
 Route::patch('/notifications/read-all',[StudentDashboardController::class,'readAll'])->name('notifications.read-all');
 Route::put('/preferences',[StudentDashboardController::class,'preferences'])->name('preferences');
 Route::post('/push-subscriptions',[PushSubscriptionController::class,'store'])->name('push.store');
 Route::delete('/push-subscriptions',[PushSubscriptionController::class,'destroy'])->name('push.destroy');
 Route::post('/events/{event}/register',[EventRegistrationController::class,'store'])->name('events.register');
 Route::delete('/events/{event}/register',[EventRegistrationController::class,'destroy'])->name('events.unregister');
});

Route::get('/dpo/programs',[DpoPublicController::class,'index'])->name('dpo.catalog');
Route::get('/dpo/programs/{program:slug}',[DpoPublicController::class,'show'])->name('dpo.program');
Route::post('/dpo/programs/{program:slug}/apply',[DpoPublicController::class,'apply'])->name('dpo.apply');
Route::get('/dpo/application/{token}',[DpoPublicController::class,'applicationStatus'])->name('dpo.application.status');
Route::get('/dpo/document/{code}',[DpoPublicController::class,'verifyDocument'])->name('dpo.document.verify');
Route::get('/dpo/document/{code}/print',[DpoPublicController::class,'printDocument'])->name('dpo.document.print');

Route::get('/dpo/login',[DpoAuthController::class,'show'])->name('dpo.login');
Route::post('/dpo/login',[DpoAuthController::class,'login'])->name('dpo.login.post');

Route::prefix('dpo')->name('dpo.')->middleware(['auth','dpo'])->group(function(){
 Route::get('/',[DpoDashboardController::class,'index'])->name('dashboard');
 Route::post('/logout',[DpoAuthController::class,'logout'])->name('logout');
 Route::get('/schedule',[DpoCourseController::class,'schedule'])->name('schedule');
 Route::get('/calendar',[DpoDashboardController::class,'calendar'])->name('calendar');
 Route::get('/profile',[DpoAuthController::class,'profile'])->name('profile');
 Route::put('/profile',[DpoAuthController::class,'updateProfile'])->name('profile.update');
 Route::get('/groups/{group}',[DpoCourseController::class,'group'])->name('groups.show');
 Route::get('/groups/{group}/lessons/{lesson}',[DpoCourseController::class,'lesson'])->name('lessons.show');
 Route::post('/groups/{group}/lessons/{lesson}/complete',[DpoCourseController::class,'complete'])->name('lessons.complete');
 Route::post('/groups/{group}/assignments/{assignment}',[DpoAssignmentController::class,'submit'])->name('assignments.submit');
 Route::get('/scorm/{package}/launch',[DpoScormController::class,'launch'])->name('scorm.launch');
 Route::post('/scorm/attempts/{attempt}/runtime',[DpoScormController::class,'runtime'])->name('scorm.runtime');
});

Route::get('/news',[NewsController::class,'index'])->name('news.index');
Route::get('/news/{slug}',[NewsController::class,'show'])->name('news.show');
Route::get('/section/{slug}',[PageController::class,'show'])->name('pages.show');

Route::get('/admin/login',[AuthController::class,'show'])->name('admin.login');
Route::post('/admin/login',[AuthController::class,'login'])->name('admin.login.post');
Route::post('/admin/logout',[AuthController::class,'logout'])->name('admin.logout');

Route::prefix('admin')->name('admin.')->middleware(['auth','admin'])->group(function(){
 Route::get('/',DashboardController::class)->name('dashboard');

 Route::get('students',[StudentAccountAdminController::class,'index'])->name('students.index');
 Route::put('students/{student}',[StudentAccountAdminController::class,'update'])->name('students.update');
 Route::patch('students/{student}/approve',[StudentAccountAdminController::class,'approve'])->name('students.approve');
 Route::patch('students/{student}/reject',[StudentAccountAdminController::class,'reject'])->name('students.reject');

 Route::get('admins',[AdminUserController::class,'index'])->name('admins.index');
 Route::post('admins',[AdminUserController::class,'store'])->name('admins.store');
 Route::put('admins/{user}',[AdminUserController::class,'update'])->name('admins.update');
 Route::delete('admins/{user}',[AdminUserController::class,'destroy'])->name('admins.destroy');

 Route::resource('pages',PageAdminController::class)->except('show');
 Route::resource('news',NewsAdminController::class)->except('show');
 Route::resource('specialties',SpecialtyAdminController::class)->except('show');
 Route::resource('employees',EmployeeAdminController::class)->except('show');
 Route::get('calendar/{calendar}/participants',[CollegeEventAdminController::class,'participants'])->name('calendar.participants');
 Route::patch('calendar/{calendar}/participants/{registration}',[CollegeEventAdminController::class,'participantStatus'])->name('calendar.participants.status');
 Route::resource('calendar',CollegeEventAdminController::class)->except('show');

 Route::get('dpo',[DpoAdminController::class,'index'])->name('dpo.index');
 Route::get('dpo/applications',[DpoAdminController::class,'applications'])->name('dpo.applications.index');
 Route::patch('dpo/applications/{application}/approve',[DpoAdminController::class,'approveApplication'])->name('dpo.applications.approve');
 Route::patch('dpo/applications/{application}/reject',[DpoAdminController::class,'rejectApplication'])->name('dpo.applications.reject');
 Route::post('dpo/enrollments/{enrollment}/attest',[DpoAdminController::class,'attest'])->name('dpo.attestations.store');
 Route::post('dpo/attestations/{attestation}/document',[DpoAdminController::class,'issueDocument'])->name('dpo.documents.issue');
 Route::get('dpo/documents',[DpoAdminController::class,'documents'])->name('dpo.documents.index');
 Route::post('dpo/documents/{document}/toggle',[DpoAdminController::class,'toggleDocument'])->name('dpo.documents.toggle');
 Route::post('dpo/groups/{group}/archive',[DpoAdminController::class,'archiveGroup'])->name('dpo.groups.archive');

 Route::post('dpo/programs',[DpoAdminController::class,'storeProgram'])->name('dpo.programs.store');
 Route::get('dpo/programs/{program}/builder',[DpoAdminController::class,'builder'])->name('dpo.builder');
 Route::post('dpo/programs/{program}/builder/order',[DpoAdminController::class,'reorderBuilder'])->name('dpo.builder.order');
 Route::get('dpo/programs/{program}',[DpoAdminController::class,'showProgram'])->name('dpo.programs.show');
 Route::put('dpo/programs/{program}',[DpoAdminController::class,'updateProgram'])->name('dpo.programs.update');
 Route::post('dpo/programs/{program}/archive',[DpoAdminController::class,'archiveProgram'])->name('dpo.programs.archive');
 Route::delete('dpo/programs/{program}',[DpoAdminController::class,'destroyProgram'])->name('dpo.programs.destroy');
 Route::post('dpo/programs/{program}/groups',[DpoAdminController::class,'storeGroup'])->name('dpo.groups.store');
 Route::get('dpo/groups/{group}',[DpoAdminController::class,'showGroup'])->name('dpo.groups.show');
 Route::get('dpo/groups/{group}/journal',[DpoAdminController::class,'journal'])->name('dpo.groups.journal');
 Route::put('dpo/groups/{group}',[DpoAdminController::class,'updateGroup'])->name('dpo.groups.update');
 Route::post('dpo/import-students',[DpoAdminController::class,'importStudents'])->name('dpo.import.students');
 Route::get('dpo/groups/{group}/report/excel',[DpoAdminController::class,'groupReportExcel'])->name('dpo.groups.report.excel');
 Route::get('dpo/groups/{group}/report/print',[DpoAdminController::class,'groupReportPrint'])->name('dpo.groups.report.print');
 Route::get('dpo/groups/{group}/scorm-analytics',[DpoAdminController::class,'scormAnalytics'])->name('dpo.groups.scorm');
 Route::get('dpo/users',[DpoAdminController::class,'users'])->name('dpo.users.index');
 Route::post('dpo/users',[DpoAdminController::class,'storeUser'])->name('dpo.users.store');
 Route::put('dpo/users/{user}',[DpoAdminController::class,'updateUser'])->name('dpo.users.update');
 Route::post('dpo/groups/{group}/enroll',[DpoAdminController::class,'enroll'])->name('dpo.enroll');
 Route::delete('dpo/enrollments/{enrollment}',[DpoAdminController::class,'destroyEnrollment'])->name('dpo.enrollments.destroy');
 Route::post('dpo/programs/{program}/modules',[DpoAdminController::class,'storeModule'])->name('dpo.modules.store');
 Route::put('dpo/modules/{module}',[DpoAdminController::class,'updateModule'])->name('dpo.modules.update');
 Route::delete('dpo/modules/{module}',[DpoAdminController::class,'destroyModule'])->name('dpo.modules.destroy');
 Route::post('dpo/modules/{module}/lessons',[DpoAdminController::class,'storeLesson'])->name('dpo.lessons.store');
 Route::post('dpo/lessons/{lesson}/duplicate',[DpoAdminController::class,'duplicateLesson'])->name('dpo.lessons.duplicate');
 Route::get('dpo/lessons/{lesson}/edit',[DpoAdminController::class,'editLesson'])->name('dpo.lessons.edit');
 Route::put('dpo/lessons/{lesson}',[DpoAdminController::class,'updateLesson'])->name('dpo.lessons.update');
 Route::delete('dpo/lessons/{lesson}',[DpoAdminController::class,'destroyLesson'])->name('dpo.lessons.destroy');
 Route::post('dpo/lessons/{lesson}/resources',[DpoAdminController::class,'storeResource'])->name('dpo.resources.store');
 Route::delete('dpo/resources/{resource}',[DpoAdminController::class,'destroyResource'])->name('dpo.resources.destroy');
 Route::post('dpo/lessons/{lesson}/assignments',[DpoAdminController::class,'storeAssignment'])->name('dpo.assignments.store');
 Route::post('dpo/assignments/{assignment}/groups/{group}',[DpoAdminController::class,'updateAssignmentGroup'])->name('dpo.assignments.group');
 Route::post('dpo/groups/{group}/schedule',[DpoAdminController::class,'storeSchedule'])->name('dpo.schedule.store');
 Route::delete('dpo/schedule/{entry}',[DpoAdminController::class,'destroySchedule'])->name('dpo.schedule.destroy');
 Route::get('dpo/schedule/{entry}/attendance',[DpoAdminController::class,'attendance'])->name('dpo.attendance.edit');
 Route::post('dpo/schedule/{entry}/attendance',[DpoAdminController::class,'updateAttendance'])->name('dpo.attendance.update');
 Route::post('dpo/groups/{group}/announcements',[DpoAdminController::class,'storeAnnouncement'])->name('dpo.announcements.store');
 Route::post('dpo/lessons/{lesson}/scorm',[DpoAdminController::class,'uploadScorm'])->name('dpo.scorm.store');
 Route::delete('dpo/scorm/{package}',[DpoAdminController::class,'destroyScorm'])->name('dpo.scorm.destroy');
 Route::post('dpo/submissions/{submission}/review',[DpoAdminController::class,'reviewSubmission'])->name('dpo.submissions.review');

 Route::get('official-documents',[OfficialDocumentAdminController::class,'index'])->name('official-documents.index');
 Route::post('official-document-categories',[OfficialDocumentAdminController::class,'storeCategory'])->name('official-documents.categories.store');
 Route::put('official-document-categories/{category}',[OfficialDocumentAdminController::class,'updateCategory'])->name('official-documents.categories.update');
 Route::delete('official-document-categories/{category}',[OfficialDocumentAdminController::class,'destroyCategory'])->name('official-documents.categories.destroy');
 Route::post('official-documents',[OfficialDocumentAdminController::class,'storeDocument'])->name('official-documents.store');
 Route::put('official-documents/{document}',[OfficialDocumentAdminController::class,'updateDocument'])->name('official-documents.update');
 Route::delete('official-documents/{document}',[OfficialDocumentAdminController::class,'destroyDocument'])->name('official-documents.destroy');
 Route::post('official-documents/{document}/versions',[OfficialDocumentAdminController::class,'storeVersion'])->name('official-documents.versions.store');
 Route::put('official-documents/{document}/versions/{version}',[OfficialDocumentAdminController::class,'updateVersion'])->name('official-documents.versions.update');
 Route::patch('official-documents/{document}/versions/{version}/current',[OfficialDocumentAdminController::class,'makeVersionCurrent'])->name('official-documents.versions.current');
 Route::delete('official-documents/{document}/versions/{version}',[OfficialDocumentAdminController::class,'destroyVersion'])->name('official-documents.versions.destroy');

 Route::get('settings',[SettingsAdminController::class,'edit'])->name('settings');
 Route::post('settings',[SettingsAdminController::class,'update'])->name('settings.update');

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

 Route::get('questions',[QuestionAdminController::class,'index'])->name('questions.index');
 Route::patch('questions/{question}',[QuestionAdminController::class,'update'])->name('questions.update');
 Route::delete('questions/{question}',[QuestionAdminController::class,'destroy'])->name('questions.destroy');

 Route::get('competitions',[CompetitionAdminController::class,'index'])->name('competitions.index');
 Route::post('competitions',[CompetitionAdminController::class,'storeCompetition'])->name('competitions.store');
 Route::put('competitions/{competition}',[CompetitionAdminController::class,'updateCompetition'])->name('competitions.update');
 Route::delete('competitions/{competition}',[CompetitionAdminController::class,'destroyCompetition'])->name('competitions.destroy');
 Route::post('achievements',[CompetitionAdminController::class,'storeAchievement'])->name('achievements.store');
 Route::put('achievements/{achievement}',[CompetitionAdminController::class,'updateAchievement'])->name('achievements.update');
 Route::delete('achievements/{achievement}',[CompetitionAdminController::class,'destroyAchievement'])->name('achievements.destroy');

 Route::get('panoramas',[PanoramaAdminController::class,'index'])->name('panoramas.index');
 Route::post('panoramas',[PanoramaAdminController::class,'store'])->name('panoramas.store');
 Route::put('panoramas/{panorama}',[PanoramaAdminController::class,'update'])->name('panoramas.update');
 Route::delete('panoramas/{panorama}',[PanoramaAdminController::class,'destroy'])->name('panoramas.destroy');

 Route::get('quizzes',[QuizAdminController::class,'index'])->name('quizzes.index');
 Route::post('quizzes',[QuizAdminController::class,'store'])->name('quizzes.store');
 Route::get('quizzes/{quiz}/builder',[QuizAdminController::class,'builder'])->name('quizzes.builder');
 Route::put('quizzes/{quiz}',[QuizAdminController::class,'update'])->name('quizzes.update');
 Route::post('quizzes/{quiz}/duplicate',[QuizAdminController::class,'duplicate'])->name('quizzes.duplicate');
 Route::delete('quizzes/{quiz}',[QuizAdminController::class,'destroy'])->name('quizzes.destroy');

 Route::get('schedule',[ScheduleAdminController::class,'index'])->name('schedule.index');
 Route::post('schedule/import-xml',[ScheduleAdminController::class,'importXml'])->name('schedule.import-xml');
 Route::get('schedule/create',[ScheduleAdminController::class,'create'])->name('schedule.create');
 Route::post('schedule',[ScheduleAdminController::class,'store'])->name('schedule.store');
 Route::get('schedule/{schedule}/edit',[ScheduleAdminController::class,'edit'])->name('schedule.edit');
 Route::put('schedule/{schedule}',[ScheduleAdminController::class,'update'])->name('schedule.update');
 Route::delete('schedule/{schedule}',[ScheduleAdminController::class,'destroy'])->name('schedule.destroy');

 Route::get('schedule-groups',[ScheduleGroupAdminController::class,'index'])->name('schedule.groups');
 Route::post('schedule-groups',[ScheduleGroupAdminController::class,'store'])->name('schedule.groups.store');
 Route::put('schedule-groups/{group}',[ScheduleGroupAdminController::class,'update'])->name('schedule.groups.update');
 Route::delete('schedule-groups/{group}',[ScheduleGroupAdminController::class,'destroy'])->name('schedule.groups.destroy');

 Route::get('media',[MediaAdminController::class,'index'])->name('media.index');
 Route::post('media',[MediaAdminController::class,'store'])->name('media.store');
 Route::put('media/{media}',[MediaAdminController::class,'update'])->name('media.update');
 Route::delete('media/{media}',[MediaAdminController::class,'destroy'])->name('media.destroy');
});
