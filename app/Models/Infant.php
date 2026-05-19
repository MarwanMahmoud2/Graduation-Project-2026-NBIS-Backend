<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infant extends Model
{
    use HasFactory;

    // دي الحقول اللي الـ Controller مسموح له يبعتها للـ Database
    protected $fillable = [
        'user_id',
        'name',
        'gender',
        'birth_date',
        'fingerprint_image',
        'nfc_tag_id',
        'status',
    ];

    /**
     * علاقة الطفل بوالده (المستخدم)
     */
    public function parent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}