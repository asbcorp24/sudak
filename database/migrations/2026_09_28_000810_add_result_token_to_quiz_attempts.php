<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration{
 public function up(): void{Schema::table('quiz_attempts',function(Blueprint $table){$table->string('result_token',64)->nullable()->unique()->after('answers_json');});}
 public function down(): void{Schema::table('quiz_attempts',function(Blueprint $table){$table->dropUnique(['result_token']);$table->dropColumn('result_token');});}
};
