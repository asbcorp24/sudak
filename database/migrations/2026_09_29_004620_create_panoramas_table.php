<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('panoramas',function(Blueprint $table){
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image_path');
            $table->string('image_disk')->default('public');
            $table->unsignedInteger('image_width')->nullable();
            $table->unsignedInteger('image_height')->nullable();
            $table->unsignedBigInteger('image_size')->default(0);
            $table->string('location')->nullable();
            $table->smallInteger('initial_yaw')->default(0);
            $table->smallInteger('initial_pitch')->default(0);
            $table->unsignedSmallInteger('sort')->default(0)->index();
            $table->boolean('is_published')->default(false)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panoramas');
    }
};
