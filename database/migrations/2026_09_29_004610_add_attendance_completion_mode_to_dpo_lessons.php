<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE `dpo_lessons` MODIFY `completion_mode` ENUM('manual','view','resources','scorm','attendance') NOT NULL DEFAULT 'view'");
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'mysql') {
            DB::table('dpo_lessons')->where('completion_mode','attendance')->update(['completion_mode'=>'view']);
            DB::statement("ALTER TABLE `dpo_lessons` MODIFY `completion_mode` ENUM('manual','view','resources','scorm') NOT NULL DEFAULT 'view'");
        }
    }
};
