<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dpo_programs',function(Blueprint $table){
            $table->boolean('is_archived')->default(false)->index()->after('is_published');
        });
    }

    public function down(): void
    {
        Schema::table('dpo_programs',function(Blueprint $table){
            $table->dropColumn('is_archived');
        });
    }
};
