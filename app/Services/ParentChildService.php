<?php

namespace App\Services;

use App\Models\Baby;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * منطق مشترك بين واجهة ولي الأمر (ويب) وواجهة الـ API (موبايل).
 */
class ParentChildService
{
    /** أطفال ولي الأمر المرتبطين بحسابه */
    public function childrenForParent(User $user): Collection
    {
        return Baby::query()
            ->where('parent_user_id', $user->id)
            ->orderByDesc('updated_at')
            ->get();
    }

    /** بيانات الطفل للعرض (JSON أو واجهة) */
    public function babyPayload(Baby $baby): array
    {
        return [
            'id' => $baby->id,
            'baby_name' => $baby->baby_name,
            'mother_name' => $baby->mother_name,
            'father_name' => $baby->father_name,
            'father_phone' => $baby->father_phone,
            'status' => $baby->status,
            'footprint_url' => $baby->footprint_url,
            'registered_at' => $baby->created_at?->toIso8601String(),
            'updated_at' => $baby->updated_at?->toIso8601String(),
        ];
    }

    public function assertParentOwnsBaby(User $user, Baby $baby): void
    {
        if ((int) $baby->parent_user_id !== (int) $user->id) {
            abort(403, 'You can only access your own children.');
        }
    }

    /**
     * @return array{status: 'success'|'already_missing', baby: Baby, notes?: ?string}
     */
    public function reportMissing(User $user, int $babyId, ?string $notes): array
    {
        $baby = Baby::findOrFail($babyId);
        $this->assertParentOwnsBaby($user, $baby);

        if ($baby->status === 'missing') {
            return ['status' => 'already_missing', 'baby' => $baby, 'notes' => $notes];
        }

        $baby->update([
            'status' => 'missing',
        ]);

        return ['status' => 'success', 'baby' => $baby->fresh(), 'notes' => $notes];
    }
}
