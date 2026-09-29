<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('user_type',30)->default('user')->index()->after('is_admin');
            $table->foreignId('schedule_group_id')->nullable()->after('user_type')->constrained('schedule_groups')->nullOnDelete();
            $table->string('student_number',80)->nullable()->after('schedule_group_id');
            $table->boolean('notify_schedule')->default(true);
            $table->boolean('notify_news')->default(true);
            $table->boolean('notify_events')->default(true);
        });

        Schema::table('college_events', function (Blueprint $table) {
            $table->boolean('registration_enabled')->default(false)->after('is_published');
            $table->unsignedInteger('capacity')->nullable()->after('registration_enabled');
            $table->dateTime('registration_deadline')->nullable()->after('capacity');
            $table->string('registration_note',1000)->nullable()->after('registration_deadline');
        });

        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('college_event_id')->constrained('college_events')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status',30)->default('registered')->index();
            $table->timestamp('registered_at')->nullable();
            $table->timestamp('attended_at')->nullable();
            $table->timestamps();
            $table->unique(['college_event_id','user_id']);
        });

        Schema::create('user_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type',40)->index();
            $table->string('title');
            $table->text('body')->nullable();
            $table->string('url',2000)->nullable();
            $table->json('data')->nullable();
            $table->string('dedupe_key',191)->nullable();
            $table->timestamp('read_at')->nullable()->index();
            $table->timestamps();
            $table->unique(['user_id','dedupe_key']);
        });

        Schema::create('push_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('endpoint');
            $table->string('endpoint_hash',64)->unique();
            $table->text('public_key');
            $table->string('auth_token',255);
            $table->string('content_encoding',40)->default('aes128gcm');
            $table->string('user_agent',500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('push_subscriptions');
        Schema::dropIfExists('user_notifications');
        Schema::dropIfExists('event_registrations');

        Schema::table('college_events', function (Blueprint $table) {
            $table->dropColumn(['registration_enabled','capacity','registration_deadline','registration_note']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['schedule_group_id']);
            $table->dropColumn(['user_type','schedule_group_id','student_number','notify_schedule','notify_news','notify_events']);
        });
    }
};
