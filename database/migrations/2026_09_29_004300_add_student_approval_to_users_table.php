<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Существующие пользователи и студенты остаются рабочими.
            // Только новые самостоятельные регистрации создаются со статусом pending.
            $table->string('student_approval_status',20)->default('approved')->index()->after('student_number');
            $table->timestamp('student_approved_at')->nullable()->after('student_approval_status');
            $table->foreignId('student_approved_by')->nullable()->after('student_approved_at')
                ->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['student_approved_by']);
            $table->dropColumn(['student_approval_status','student_approved_at','student_approved_by']);
        });
    }
};
