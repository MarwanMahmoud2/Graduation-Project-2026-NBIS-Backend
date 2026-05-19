<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'national_id',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // المواليد اللي سجلتها الممرضة
    public function registeredBabies(): HasMany
    {
        return $this->hasMany(Baby::class, 'nurse_id');
    }

    // أطفال ولي الأمر المرتبطين بحسابه
    public function children(): HasMany
    {
        return $this->hasMany(Baby::class, 'parent_user_id');
    }
}
