<?php

namespace App\Console\Commands;

use App\Models\Employee;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DeleteTeachers extends Command
{
    protected $signature = 'teachers:delete
                            {--force : Удалить без интерактивного подтверждения}
                            {--legacy : Также очистить старую таблицу schedule_teachers}';

    protected $description = 'Массово удалить всех преподавателей из единого справочника сотрудников';

    public function handle(): int
    {
        if (!Schema::hasTable('employees')) {
            $this->error('Таблица employees ещё не создана. Сначала выполните php artisan migrate --force.');
            return self::FAILURE;
        }

        $teacherIds = Employee::where('employee_type', 'teacher')->pluck('id');
        $teacherCount = $teacherIds->count();

        $scheduleLinks = 0;
        if ($teacherCount && Schema::hasTable('schedule_entries') && Schema::hasColumn('schedule_entries', 'employee_id')) {
            $scheduleLinks = DB::table('schedule_entries')
                ->whereIn('employee_id', $teacherIds)
                ->count();
        }

        $dpoLinks = 0;
        if ($teacherCount && Schema::hasTable('dpo_profiles') && Schema::hasColumn('dpo_profiles', 'employee_id')) {
            $dpoLinks = DB::table('dpo_profiles')
                ->whereIn('employee_id', $teacherIds)
                ->count();
        }

        $mediaLinks = 0;
        if ($teacherCount && Schema::hasTable('media_relations')) {
            $mediaLinks = DB::table('media_relations')
                ->where('mediable_type', Employee::class)
                ->whereIn('mediable_id', $teacherIds)
                ->count();
        }

        $legacyCount = 0;
        if ($this->option('legacy') && Schema::hasTable('schedule_teachers')) {
            $legacyCount = DB::table('schedule_teachers')->count();
        }

        $this->newLine();
        $this->info('Будут удалены преподаватели:');
        $this->line('  Единый справочник employees: '.$teacherCount);
        $this->line('  Связей с расписанием: '.$scheduleLinks);
        $this->line('  Связей с профилями ДПО: '.$dpoLinks);
        $this->line('  Привязок к медиатеке: '.$mediaLinks);

        if ($this->option('legacy')) {
            $this->line('  Старых записей schedule_teachers: '.$legacyCount);
        }

        if ($teacherCount === 0 && $legacyCount === 0) {
            $this->warn('Преподаватели для удаления не найдены.');
            return self::SUCCESS;
        }

        if (!$this->option('force')) {
            $this->warn('Это действие необратимо. Сами файлы медиатеки удалены не будут.');
            if (!$this->confirm('Удалить всех преподавателей?', false)) {
                $this->info('Удаление отменено.');
                return self::SUCCESS;
            }
        }

        DB::transaction(function () use ($teacherIds) {
            if ($teacherIds->isNotEmpty() && Schema::hasTable('media_relations')) {
                DB::table('media_relations')
                    ->where('mediable_type', Employee::class)
                    ->whereIn('mediable_id', $teacherIds)
                    ->delete();
            }

            if ($teacherIds->isNotEmpty()) {
                Employee::whereIn('id', $teacherIds)->delete();
            }

            if ($this->option('legacy') && Schema::hasTable('schedule_teachers')) {
                DB::table('schedule_teachers')->delete();
            }
        });

        $this->newLine();
        $this->info('Готово.');
        $this->line('Удалено преподавателей: '.$teacherCount);

        if ($this->option('legacy')) {
            $this->line('Удалено старых записей schedule_teachers: '.$legacyCount);
        }

        if ($scheduleLinks > 0) {
            $this->line('В существующем расписании поле преподавателя стало пустым: '.$scheduleLinks.' занятий.');
        }

        if ($dpoLinks > 0) {
            $this->line('В профилях ДПО связь с employee очищена: '.$dpoLinks.'.');
        }

        return self::SUCCESS;
    }
}
