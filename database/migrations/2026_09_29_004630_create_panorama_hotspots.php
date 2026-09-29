<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('panoramas',function(Blueprint $table){
            $table->boolean('is_home')->default(false)->index()->after('is_published');
        });

        Schema::create('panorama_hotspots',function(Blueprint $table){
            $table->id();
            $table->foreignId('panorama_id')->constrained()->cascadeOnDelete();
            $table->foreignId('target_panorama_id')->nullable()->constrained('panoramas')->nullOnDelete();
            $table->string('type',20)->default('info');
            $table->string('title',220);
            $table->text('description')->nullable();
            $table->decimal('pitch',8,3)->default(0);
            $table->decimal('yaw',8,3)->default(0);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
            $table->index(['panorama_id','sort']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panorama_hotspots');
        Schema::table('panoramas',function(Blueprint $table){
            $table->dropColumn('is_home');
        });
    }
};
