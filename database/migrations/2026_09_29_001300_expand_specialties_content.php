<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('specialties', function (Blueprint $table) {
            $table->json('learning_outcomes')->nullable()->after('details');
            $table->json('disciplines')->nullable()->after('learning_outcomes');
            $table->longText('practice')->nullable()->after('disciplines');
            $table->json('professions')->nullable()->after('practice');
            $table->json('partners')->nullable()->after('professions');
            $table->json('student_projects')->nullable()->after('partners');
        });

        Schema::create('employee_specialty', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialty_id')->constrained()->cascadeOnDelete();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['specialty_id','employee_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('employee_specialty');
        Schema::table('specialties', function (Blueprint $table) {
            $table->dropColumn([
                'learning_outcomes','disciplines','practice','professions','partners','student_projects',
            ]);
        });
    }
};
