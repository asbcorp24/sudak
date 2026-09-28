<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->enum('employee_type', ['leadership','teacher','staff'])->default('teacher')->index();
            $table->string('full_name')->index();
            $table->string('position')->nullable();
            $table->text('disciplines')->nullable();
            $table->text('education')->nullable();
            $table->text('qualification')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 80)->nullable();
            $table->text('achievements')->nullable();
            $table->text('bio')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });

        Schema::table('schedule_entries', function (Blueprint $table) {
            $table->foreignId('employee_id')->nullable()->after('teacher_id')->constrained('employees')->nullOnDelete();
            $table->index(['lesson_date','employee_id','starts_at'], 'schedule_date_employee_time_index');
        });

        if (Schema::hasTable('schedule_teachers')) {
            foreach (DB::table('schedule_teachers')->orderBy('id')->get() as $teacher) {
                $employeeId = DB::table('employees')->insertGetId([
                    'employee_type' => 'teacher',
                    'full_name' => $teacher->full_name,
                    'position' => $teacher->position,
                    'sort' => 0,
                    'is_published' => (bool) $teacher->is_active,
                    'created_at' => $teacher->created_at ?? now(),
                    'updated_at' => $teacher->updated_at ?? now(),
                ]);

                DB::table('schedule_entries')
                    ->where('teacher_id', $teacher->id)
                    ->update(['employee_id' => $employeeId]);
            }
        }

        Schema::create('official_document_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('official_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('official_document_categories')->cascadeOnDelete();
            $table->foreignId('media_asset_id')->nullable()->constrained('media_assets')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('document_date')->nullable();
            $table->string('version', 80)->nullable();
            $table->string('document_number', 120)->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();

            $table->index(['category_id','sort'], 'official_documents_category_sort_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('official_documents');
        Schema::dropIfExists('official_document_categories');

        Schema::table('schedule_entries', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropIndex('schedule_date_employee_time_index');
            $table->dropColumn('employee_id');
        });

        Schema::dropIfExists('employees');
    }
};
