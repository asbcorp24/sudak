<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dpo_attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_entry_id')->constrained('dpo_schedule_entries')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['present','absent','excused','late'])->default('present')->index();
            $table->string('note', 500)->nullable();
            $table->foreignId('marked_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('marked_at')->nullable();
            $table->timestamps();

            $table->unique(['schedule_entry_id','user_id'], 'dpo_attendance_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dpo_attendance');
    }
};
