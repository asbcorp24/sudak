<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL can leave the table behind when CREATE/ALTER fails before
        // Laravel records the migration. This migration is still pending,
        // so remove that incomplete first attempt before recreating it.
        Schema::dropIfExists('official_document_versions');

        Schema::create('official_document_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('official_document_id')->constrained('official_documents')->cascadeOnDelete();
            $table->foreignId('media_asset_id')->constrained('media_assets')->restrictOnDelete();
            $table->string('version',80)->nullable();
            $table->date('effective_date')->nullable();
            $table->string('change_note',1000)->nullable();
            $table->boolean('is_current')->default(false)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
            $table->index(['official_document_id','effective_date'], 'odv_document_effective_idx');
        });

        DB::table('official_documents')->orderBy('id')->get()->each(function ($document) {
            if (!$document->media_asset_id) return;
            DB::table('official_document_versions')->insert([
                'official_document_id'=>$document->id,
                'media_asset_id'=>$document->media_asset_id,
                'version'=>$document->version,
                'effective_date'=>$document->document_date,
                'change_note'=>'Версия перенесена из существующего каталога документов',
                'is_current'=>true,
                'is_published'=>(bool)$document->is_published,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('official_document_versions');
    }
};
