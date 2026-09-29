<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dpo_programs', function (Blueprint $table) {
            $table->string('qualification')->nullable()->after('hours');
            $table->string('document_type')->default('Удостоверение о повышении квалификации')->after('qualification');
            $table->boolean('applications_open')->default(true)->index()->after('is_published');
            $table->unsignedTinyInteger('min_progress_percent')->default(100)->after('applications_open');
            $table->unsignedTinyInteger('min_attendance_percent')->default(0)->after('min_progress_percent');
            $table->unsignedTinyInteger('min_homework_percent')->default(0)->after('min_attendance_percent');
            $table->unsignedTinyInteger('min_scorm_percent')->default(70)->after('min_homework_percent');
        });

        Schema::create('dpo_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('dpo_programs')->cascadeOnDelete();
            $table->foreignId('group_id')->nullable()->constrained('dpo_groups')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->uuid('public_token')->unique();
            $table->string('name');
            $table->string('email')->index();
            $table->string('phone',80);
            $table->date('birth_date')->nullable();
            $table->string('education')->nullable();
            $table->string('organization')->nullable();
            $table->text('comment')->nullable();
            $table->enum('status',['pending','approved','rejected','enrolled','completed','archived'])->default('pending')->index();
            $table->text('admin_note')->nullable();
            $table->foreignId('processed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('processed_at')->nullable();
            $table->dateTime('enrolled_at')->nullable();
            $table->timestamps();
            $table->index(['program_id','status'],'dpo_application_program_status_idx');
        });

        Schema::create('dpo_attestations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->unique()->constrained('dpo_enrollments')->cascadeOnDelete();
            $table->enum('status',['pending','passed','failed'])->default('pending')->index();
            $table->unsignedTinyInteger('progress_percent')->default(0);
            $table->unsignedTinyInteger('attendance_percent')->default(0);
            $table->unsignedTinyInteger('homework_percent')->nullable();
            $table->unsignedTinyInteger('scorm_percent')->nullable();
            $table->decimal('final_score',6,2)->nullable();
            $table->string('result_text')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('assessed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('assessed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('dpo_issued_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attestation_id')->unique()->constrained('dpo_attestations')->cascadeOnDelete();
            $table->foreignId('enrollment_id')->constrained('dpo_enrollments')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('program_id')->constrained('dpo_programs')->restrictOnDelete();
            $table->foreignId('group_id')->constrained('dpo_groups')->restrictOnDelete();
            $table->string('document_type');
            $table->string('series',40)->nullable();
            $table->string('number',80)->unique();
            $table->date('issued_at')->index();
            $table->unsignedInteger('hours')->default(0);
            $table->string('qualification')->nullable();
            $table->string('verification_code',64)->unique();
            $table->enum('status',['issued','revoked'])->default('issued')->index();
            $table->dateTime('revoked_at')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dpo_issued_documents');
        Schema::dropIfExists('dpo_attestations');
        Schema::dropIfExists('dpo_applications');
        Schema::table('dpo_programs', function (Blueprint $table) {
            $table->dropColumn(['qualification','document_type','applications_open','min_progress_percent','min_attendance_percent','min_homework_percent','min_scorm_percent']);
        });
    }
};
