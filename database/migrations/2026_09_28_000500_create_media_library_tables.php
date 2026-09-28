<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_assets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('original_name');
            $table->string('disk', 40)->default('public');
            $table->string('path');
            $table->string('mime_type')->nullable();
            $table->string('extension', 20)->nullable();
            $table->string('type', 30)->index(); // image, document, model_3d
            $table->unsignedBigInteger('size')->default(0);
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('title')->nullable();
            $table->string('alt')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('media_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_asset_id')->constrained('media_assets')->cascadeOnDelete();
            $table->string('mediable_type');
            $table->unsignedBigInteger('mediable_id');
            $table->string('collection', 60)->default('content');
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();

            $table->index(['mediable_type', 'mediable_id', 'collection'], 'media_relations_owner_index');
            $table->index(['media_asset_id', 'collection'], 'media_relations_asset_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_relations');
        Schema::dropIfExists('media_assets');
    }
};
