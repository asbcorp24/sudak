<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_applications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('birth_date')->nullable();
            $table->string('phone', 80);
            $table->string('email')->nullable();
            $table->foreignId('specialty_id')->nullable()->constrained('specialties')->nullOnDelete();
            $table->text('message')->nullable();
            $table->enum('status', ['new','processing','accepted','rejected'])->default('new')->index();
            $table->timestamps();
        });

        Schema::create('cooperation_items', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['proposal','partner','project'])->index();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('cooperation_applications', function (Blueprint $table) {
            $table->id();
            $table->enum('role', ['partner','curator','teacher','employer','other'])->index();
            $table->string('name');
            $table->string('organization')->nullable();
            $table->string('phone', 80)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['new','processing','accepted','rejected'])->default('new')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cooperation_applications');
        Schema::dropIfExists('cooperation_items');
        Schema::dropIfExists('admission_applications');
    }
};
