<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('college_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type',40)->default('event')->index();
            $table->dateTime('starts_at')->index();
            $table->dateTime('ends_at')->nullable();
            $table->boolean('all_day')->default(false);
            $table->string('location')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('description')->nullable();
            $table->string('external_url',2000)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('college_events');
    }
};
