<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedule_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedTinyInteger('course')->nullable();
            $table->string('specialty')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('schedule_teachers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('position')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index('full_name');
        });

        Schema::create('schedule_entries', function (Blueprint $table) {
            $table->id();
            $table->date('lesson_date')->index();
            $table->foreignId('group_id')->constrained('schedule_groups')->cascadeOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained('schedule_teachers')->nullOnDelete();
            $table->unsignedTinyInteger('lesson_number')->nullable();
            $table->time('starts_at');
            $table->time('ends_at');
            $table->string('subject');
            $table->string('room')->nullable();
            $table->string('lesson_type')->nullable();
            $table->string('subgroup')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['lesson_date','group_id','starts_at'], 'schedule_date_group_time_index');
            $table->index(['lesson_date','teacher_id','starts_at'], 'schedule_date_teacher_time_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedule_entries');
        Schema::dropIfExists('schedule_teachers');
        Schema::dropIfExists('schedule_groups');
    }
};
