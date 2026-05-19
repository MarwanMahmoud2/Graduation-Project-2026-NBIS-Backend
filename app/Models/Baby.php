<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Baby extends Model
{
    use HasFactory;

    // دي الخانات اللي مسموح لارفيل يضيف فيها بيانات (Mass Assignment)
    protected $fillable = [
        'baby_name',
        'mother_name',
        'father_name',
        'father_phone',
        'father_national_id',
        'footprint_path',
        'status',
        'nurse_id',
        'parent_user_id',
    ];

    protected $appends = ['footprint_url'];

    // علاقة الطفل بالممرضة اللي سجلت البيانات
    public function nurse(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nurse_id');
    }

    // علاقة الطفل بولي الأمر (حساب الأب/الأم على الموبايل)
    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_user_id');
    }

    /**
     * دالة للحصول على رابط الصورة المباشر
     */
    public function getFootprintUrlAttribute(): string
    {
        // لو الصورة موجودة هيرجع الرابط الكامل، لو مش موجودة ممكن ترجع صورة افتراضية
        return $this->footprint_path
            ? asset('storage/' . $this->footprint_path)
            : asset('images/default-footprint.png');
    }
}
