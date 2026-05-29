<?php

namespace App\Services;

use App\Models\Child;
use App\Models\User;
use Illuminate\Http\UploadedFile;

/**
 * تسجيل طفل في جدول children — مشترك بين الويب (Blade) و API (React / mobile).
 */
class ChildRegistrationService
{
    public function __construct(
        private ParentChildService $parentChild,
    ) {
    }

    /**
     * @param  array{name: string, mother_name: ?string, father_name: ?string, father_phone: ?string, father_national_id: ?string, gender: ?string, birth_date: ?string, nfc_tag_id: ?string}  $data
     */
    public function register(array $data, int $nurseId, UploadedFile $footprintImage): Child
    {
        $imagePath = $footprintImage->store('footprints', 'public');

        $parentUserId = null;
        if (isset($data['father_national_id'])) {
            $parentUserId = User::query()
                ->where('role', 'user')
                ->where('national_id', $data['father_national_id'])
                ->value('id');
        }

        return Child::create([
            'name' => $data['name'],
            'mother_name' => $data['mother_name'] ?? null,
            'father_name' => $data['father_name'] ?? null,
            'father_phone' => $data['father_phone'] ?? null,
            'father_national_id' => $data['father_national_id'] ?? null,
            'gender' => $data['gender'] ?? null,
            'birth_date' => $data['birth_date'] ?? null,
            'nfc_tag_id' => $data['nfc_tag_id'] ?? null,
            'footprint_path' => $imagePath,
            'status' => 'safe',
            'nurse_id' => $nurseId,
            'user_id' => $parentUserId,
        ]);
    }

    /** JSON payload for nurse / admin registration responses */
    public function registrationPayload(Child $child): array
    {
        return array_merge($this->parentChild->childPayload($child), [
            'father_national_id' => $child->father_national_id,
            'user_id' => $child->user_id,
            'nurse_id' => $child->nurse_id,
        ]);
    }
}
