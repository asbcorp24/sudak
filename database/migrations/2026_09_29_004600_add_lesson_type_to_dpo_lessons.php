<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dpo_lessons',function(Blueprint $table){
            $table->string('lesson_type',32)->default('online')->index()->after('duration_minutes');
        });
    }

    public function down(): void
    {
        Schema::table('dpo_lessons',function(Blueprint $table){
            $table->dropColumn('lesson_type');
        });
    }
};
