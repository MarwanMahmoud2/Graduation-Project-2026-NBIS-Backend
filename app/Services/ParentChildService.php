<?php

namespace App\Services;

use App\Models\Child;
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
        return Child::query()
            ->where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->get();
    }

    /** بيانات الطفل للعرض (JSON أو واجهة) */
    public function childPayload(Child $child): array
    {
        return [
            'id' => $child->id,
            'name' => $child->name,
            'mother_name' => $child->mother_name,
            'father_name' => $child->father_name,
            'father_phone' => $child->father_phone,
            'status' => $child->status,
            'footprint_url' => $child->footprint_url,
            'registered_at' => $child->created_at?->toIso8601String(),
            'updated_at' => $child->updated_at?->toIso8601String(),
        ];
    }

    public function assertParentOwnsChild(User $user, Child $child): void
    {
        if ((int) $child->user_id !== (int) $user->id) {
            abort(403, 'You can only access your own children.');
        }
    }

    /**
     * @return array{status: 'success'|'already_missing', child: Child, notes?: ?string}
     */
    public function reportMissing(User $user, int $childId, ?string $notes): array
    {
        $child = Child::findOrFail($childId);
        $this->assertParentOwnsChild($user, $child);

        if ($child->status === 'missing') {
            return ['status' => 'already_missing', 'child' => $child, 'notes' => $notes];
        }

        $child->update([
            'status' => 'missing',
        ]);

        return ['status' => 'success', 'child' => $child->fresh(), 'notes' => $notes];
    }
}
