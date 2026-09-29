<?php

namespace App\Console\Commands;

use App\Models\ScheduleEntry;
use App\Models\ScheduleGroup;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ClearSchedule extends Command
{
    protected $signature = 'schedule:clear {--force : Не спрашивать подтверждение}';
    protected $description = 'Сделать резервную копию и полностью очистить обычное расписание';

    public function handle(): int
    {
        if (!Schema::hasTable('schedule_entries')) {
            $this->warn('Таблица расписания не найдена.');
            return self::SUCCESS;
        }

        $entries = ScheduleEntry::orderBy('id')->get();
        $groups = Schema::hasTable('schedule_groups')
            ? ScheduleGroup::orderBy('id')->get()
            : collect();
        $legacyTeachers = Schema::hasTable('schedule_teachers')
            ? DB::table('schedule_teachers')->orderBy('id')->get()
            : collect();

        $this->info('Занятий: '.$entries->count());
        $this->info('Групп: '.$groups->count());
        $this->info('Старых преподавателей: '.$legacyTeachers->count());
        $this->comment('employees и расписание ДПО не затрагиваются.');

        if (!$this->option('force') && !$this->confirm('Создать резервную копию и очистить расписание?', false)) {
            $this->info('Отменено.');
            return self::SUCCESS;
        }

        $stamp = now()->format('Ymd_His');
        $backupPath = 'backups/schedule/schedule_'.$stamp.'.json';

        Storage::disk('local')->put($backupPath, json_encode([
            'created_at' => now()->toIso8601String(),
            'schedule_entries' => $entries->toArray(),
            'schedule_groups' => $groups->toArray(),
            'schedule_teachers' => $legacyTeachers->map(fn ($row) => (array) $row)->all(),
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        DB::transaction(function () use ($entries, $groups) {
            foreach ($entries as $entry) {
                $entry->delete();
            }

            foreach ($groups as $group) {
                $group->delete();
            }

            if (Schema::hasTable('schedule_teachers')) {
                foreach (DB::table('schedule_teachers')->pluck('id') as $id) {
                    DB::table('schedule_teachers')->where('id', $id)->delete();
                }
            }
        });

        $this->info('Расписание очищено.');
        $this->line('Резервная копия: storage/app/'.$backupPath);

        return self::SUCCESS;
    }
}
