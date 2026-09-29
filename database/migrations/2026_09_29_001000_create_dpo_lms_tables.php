<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dpo_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->enum('role', ['student','teacher','manager'])->default('student')->index();
            $table->foreignId('employee_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->string('phone', 80)->nullable();
            $table->string('organization')->nullable();
            $table->string('position')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('dpo_programs', function (Blueprint $table) {
            $table->id();
            $table->string('code', 80)->nullable()->index();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedInteger('hours')->default(0);
            $table->text('description')->nullable();
            $table->text('learning_outcomes')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(false)->index();
            $table->timestamps();
        });

        Schema::create('dpo_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('dpo_programs')->cascadeOnDelete();
            $table->string('name')->index();
            $table->date('starts_on')->nullable();
            $table->date('ends_on')->nullable();
            $table->enum('status', ['draft','active','completed','archived'])->default('draft')->index();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('dpo_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('role', ['student','teacher'])->default('student')->index();
            $table->enum('status', ['active','completed','expelled'])->default('active')->index();
            $table->timestamp('enrolled_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['group_id','user_id','role'], 'dpo_enrollment_unique');
        });

        Schema::create('dpo_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('dpo_programs')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('dpo_lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('dpo_modules')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->unsignedInteger('duration_minutes')->default(0);
            $table->enum('completion_mode', ['manual','view','resources','scorm'])->default('view');
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('dpo_lesson_resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('dpo_lessons')->cascadeOnDelete();
            $table->enum('type', ['file','video','link'])->index();
            $table->string('title');
            $table->foreignId('media_asset_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->text('url')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_required')->default(false);
            $table->timestamps();
        });

        Schema::create('dpo_lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('dpo_lessons')->cascadeOnDelete();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['not_started','in_progress','completed'])->default('not_started')->index();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamps();

            $table->unique(['lesson_id','group_id','user_id'], 'dpo_lesson_progress_unique');
        });

        Schema::create('dpo_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('dpo_lessons')->cascadeOnDelete();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->unsignedDecimal('max_score', 6, 2)->default(100);
            $table->boolean('allow_text')->default(true);
            $table->boolean('allow_file')->default(true);
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('dpo_group_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('dpo_assignments')->cascadeOnDelete();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->timestamp('available_from')->nullable();
            $table->timestamp('due_at')->nullable();
            $table->timestamps();

            $table->unique(['assignment_id','group_id']);
        });

        Schema::create('dpo_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('dpo_assignments')->cascadeOnDelete();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->longText('answer_text')->nullable();
            $table->foreignId('media_asset_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->enum('status', ['draft','submitted','reviewed','returned'])->default('draft')->index();
            $table->unsignedDecimal('score', 6, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->unique(['assignment_id','group_id','user_id'], 'dpo_submission_unique');
        });

        Schema::create('dpo_schedule_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('lesson_id')->nullable()->constrained('dpo_lessons')->nullOnDelete();
            $table->foreignId('teacher_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->timestamp('starts_at')->index();
            $table->timestamp('ends_at');
            $table->string('room')->nullable();
            $table->text('online_url')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('dpo_announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->nullable()->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('program_id')->nullable()->constrained('dpo_programs')->cascadeOnDelete();
            $table->string('title');
            $table->longText('body')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamps();
        });

        Schema::create('dpo_scorm_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('dpo_lessons')->cascadeOnDelete();
            $table->string('title');
            $table->enum('scorm_version', ['1.2','2004'])->default('1.2')->index();
            $table->string('manifest_identifier')->nullable();
            $table->text('launch_path');
            $table->text('storage_path');
            $table->string('package_hash', 64)->nullable()->index();
            $table->unsignedDecimal('max_score', 6, 2)->default(100);
            $table->unsignedInteger('max_attempts')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        Schema::create('dpo_scorm_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('dpo_scorm_packages')->cascadeOnDelete();
            $table->foreignId('group_id')->constrained('dpo_groups')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('attempt_no')->default(1);
            $table->string('lesson_status', 40)->nullable();
            $table->string('completion_status', 40)->nullable();
            $table->string('success_status', 40)->nullable();
            $table->decimal('score_raw', 8, 3)->nullable();
            $table->decimal('score_scaled', 8, 5)->nullable();
            $table->text('location')->nullable();
            $table->longText('suspend_data')->nullable();
            $table->string('session_time', 80)->nullable();
            $table->string('total_time', 80)->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('last_accessed_at')->nullable();
            $table->timestamps();

            $table->unique(['package_id','group_id','user_id','attempt_no'], 'dpo_scorm_attempt_unique');
        });

        Schema::create('dpo_scorm_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('dpo_scorm_attempts')->cascadeOnDelete();
            $table->string('key', 191);
            $table->longText('value')->nullable();
            $table->timestamps();

            $table->unique(['attempt_id','key'], 'dpo_scorm_value_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dpo_scorm_values');
        Schema::dropIfExists('dpo_scorm_attempts');
        Schema::dropIfExists('dpo_scorm_packages');
        Schema::dropIfExists('dpo_announcements');
        Schema::dropIfExists('dpo_schedule_entries');
        Schema::dropIfExists('dpo_submissions');
        Schema::dropIfExists('dpo_group_assignments');
        Schema::dropIfExists('dpo_assignments');
        Schema::dropIfExists('dpo_lesson_progress');
        Schema::dropIfExists('dpo_lesson_resources');
        Schema::dropIfExists('dpo_lessons');
        Schema::dropIfExists('dpo_modules');
        Schema::dropIfExists('dpo_enrollments');
        Schema::dropIfExists('dpo_groups');
        Schema::dropIfExists('dpo_programs');
        Schema::dropIfExists('dpo_profiles');
    }
};
