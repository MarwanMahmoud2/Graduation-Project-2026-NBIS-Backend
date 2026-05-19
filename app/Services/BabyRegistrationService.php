<?php

namespace App\Services;

use App\Models\Baby;
use App\Models\User;
use Illuminate\Http\UploadedFile;

/**
 * تسجيل مولود في جدول babies — مشترك بين الويب (Blade) و API (React / mobile).
 */
class BabyRegistrationService
{
    public function __construct(
        private ParentChildService $parentChild,
    ) {
    }

    /**
     * @param  array{baby_name: string, mother_name: string, father_name: string, father_phone: string, father_national_id: string}  $data
     */
    public function register(array $data, int $nurseId, UploadedFile $footprintImage): Baby
    {
        $imagePath = $footprintImage->store('footprints', 'public');

        $parentUserId = User::query()
            ->where('role', 'user')
            ->where('national_id', $data['father_national_id'])
            ->value('id');

        return Baby::create([
            'baby_name' => $data['baby_name'],
            'mother_name' => $data['mother_name'],
            'father_name' => $data['father_name'],
            'father_phone' => $data['father_phone'],
            'father_national_id' => $data['father_national_id'],
            'footprint_path' => $imagePath,
            'status' => 'safe',
            'nurse_id' => $nurseId,
            'parent_user_id' => $parentUserId,
        ]);
    }

    /** JSON payload for nurse / admin registration responses */
    public function registrationPayload(Baby $baby): array
    {
        return array_merge($this->parentChild->babyPayload($baby), [
            'father_national_id' => $baby->father_national_id,
            'parent_user_id' => $baby->parent_user_id,
            'nurse_id' => $baby->nurse_id,
        ]);
    }
}
