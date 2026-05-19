<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('babies', function (Blueprint $table) {
            $table->id();
            $table->string('baby_name');          // اسم المولود
            $table->string('mother_name');        // اسم الأم
            $table->string('father_name');        // اسم الأب (اللي إنت ركزت عليه)
            $table->string('father_phone');       // رقم تليفون الأب للتواصل
            $table->string('father_national_id'); // الرقم القومي للأب
            $table->string('footprint_path');     // مكان حفظ صورة البصمة في السيرفر
            $table->string('status')->default('safe');

            // الممرضة اللي سجلت البيانات (ربط بجدول الـ users)
            $table->foreignId('nurse_id')->constrained('users')->onDelete('cascade');
            // ولي الأمر (حساب التطبيق) — nullable لحد ما يسجل
            $table->foreignId('parent_user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps(); // بيسجل وقت الإضافة أوتوماتيك
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('babies');
    }
};