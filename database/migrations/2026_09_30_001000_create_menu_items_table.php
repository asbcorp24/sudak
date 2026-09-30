<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->nullOnDelete();
            $table->foreignId('page_id')->nullable()->constrained('pages')->nullOnDelete();
            $table->string('title');
            $table->string('link_type', 20)->default('url');
            $table->string('route_name')->nullable();
            $table->string('url', 1000)->nullable();
            $table->boolean('open_in_new_tab')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('show_desktop')->default(true);
            $table->boolean('show_mobile')->default(true);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
            $table->index(['parent_id','is_active','sort']);
        });

        $now = now();
        $insert = function (array $data) use ($now) {
            return DB::table('menu_items')->insertGetId(array_merge([
                'parent_id'=>null,'page_id'=>null,'link_type'=>'route','route_name'=>null,'url'=>null,
                'open_in_new_tab'=>0,'is_active'=>1,'show_desktop'=>1,'show_mobile'=>1,'sort'=>0,
                'created_at'=>$now,'updated_at'=>$now,
            ], $data));
        };

        $insert(['title'=>'Специальности','route_name'=>'specialties.index','sort'=>10]);
        $insert(['title'=>'Расписание','route_name'=>'schedule.index','sort'=>20]);
        $insert(['title'=>'Сотрудники','route_name'=>'employees.index','sort'=>30]);

        if (Schema::hasTable('pages')) {
            $pages = DB::table('pages')->whereNull('parent_id')->where('show_in_menu',1)->where('is_published',1)->orderBy('sort')->get();
            $pageMap = [];
            foreach ($pages as $page) {
                $pageMap[$page->id] = $insert(['title'=>$page->menu_title ?: $page->title,'link_type'=>'page','route_name'=>null,'page_id'=>$page->id,'sort'=>40 + (int)$page->sort]);
            }
            $pending = DB::table('pages')->whereNotNull('parent_id')->where('show_in_menu',1)->where('is_published',1)->orderBy('sort')->get();
            do {
                $added = false;
                foreach ($pending as $key=>$page) {
                    if (!isset($pageMap[$page->parent_id])) continue;
                    $pageMap[$page->id] = $insert(['parent_id'=>$pageMap[$page->parent_id],'title'=>$page->menu_title ?: $page->title,'link_type'=>'page','route_name'=>null,'page_id'=>$page->id,'sort'=>(int)$page->sort]);
                    $pending->forget($key);
                    $added = true;
                }
            } while ($added && $pending->isNotEmpty());
        }

        $activities = $insert(['title'=>'Активности','link_type'=>'none','route_name'=>null,'sort'=>100]);
        foreach ([['Календарь колледжа','calendar.index'],['Конкурсы и достижения','competitions.index'],['Викторины','quizzes.index'],['Панорамы 360°','panoramas.index']] as $i=>$row)
            $insert(['parent_id'=>$activities,'title'=>$row[0],'route_name'=>$row[1],'sort'=>($i+1)*10]);

        $feedback = $insert(['title'=>'Обратная связь','link_type'=>'none','route_name'=>null,'sort'=>110]);
        foreach ([['Контакты и карта','contacts.index'],['Заявка на поступление','admission.create'],['Сотрудничество','cooperation.index'],['Задать вопрос','questions.create']] as $i=>$row)
            $insert(['parent_id'=>$feedback,'title'=>$row[0],'route_name'=>$row[1],'sort'=>($i+1)*10]);

        $info = $insert(['title'=>'Информация','link_type'=>'none','route_name'=>null,'sort'=>120]);
        foreach ([['Новости','news.index'],['Документы','document-center.index'],['Программы ДПО','dpo.catalog']] as $i=>$row)
            $insert(['parent_id'=>$info,'title'=>$row[0],'route_name'=>$row[1],'sort'=>($i+1)*10]);

        $cabinet = $insert(['title'=>'Личный кабинет','link_type'=>'none','route_name'=>null,'sort'=>130]);
        $insert(['parent_id'=>$cabinet,'title'=>'Кабинет студента','route_name'=>'student.login','sort'=>10]);
        $insert(['parent_id'=>$cabinet,'title'=>'Кабинет ДПО','route_name'=>'dpo.login','sort'=>20]);
    }

    public function down(): void { Schema::dropIfExists('menu_items'); }
};