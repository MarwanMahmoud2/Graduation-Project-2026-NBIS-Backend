<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * تحديث جدول babies: nurse_id بدل user_id + ربط ولي الأمر + حالة الطفل
     */
    public function up(): void
    {
        // إعادة تسمية عمود الممرضة
        if (Schema::hasColumn('babies', 'user_id')) {
            Schema::table('babies', function (Blueprint $table) {
                $table->renameColumn('user_id', 'nurse_id');
            });
        }

        Schema::table('babies', function (Blueprint $table) {
            if (! Schema::hasColumn('babies', 'parent_user_id')) {
                $table->foreignId('parent_user_id')->nullable()->after('nurse_id')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('babies', 'status')) {
                $table->string('status')->default('safe')->after('footprint_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('babies', function (Blueprint $table) {
            $table->dropForeign(['parent_user_id']);
            $table->dropColumn(['parent_user_id', 'status']);
        });

        Schema::table('babies', function (Blueprint $table) {
            $table->renameColumn('nurse_id', 'user_id');
        });
    }
};
