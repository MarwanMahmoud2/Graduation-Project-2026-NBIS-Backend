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
        Schema::create('infants', function (Blueprint $table) {
            $table->id();
            // ربط الطفل بالمستخدم (الأب/الأم) اللي الفرونت إند خلص الـ Auth بتاعهم
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->enum('gender', ['male', 'female']);
            $table->date('birth_date')->nullable(); // nullable لو مش دايماً متوفر وقت التسجيل

            // الحقول التقنية للمشروع
            $table->string('fingerprint_image'); // تخزين مسار ملف الصورة
            $table->string('nfc_tag_id')->unique(); // كود الـ NFC ولازم يكون فريد لكل طفل

            $table->string('status')->default('safe'); // الحالة الافتراضية (safe, missing)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infants');
    }
};