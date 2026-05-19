<?php

namespace App\Services;

use App\Models\Baby;
use Illuminate\Database\Eloquent\Collection;

/**
 * بحث نصي عن سجلات الأطفال (شرطة / ويب قديم).
 * الواجهة الرئيسية للتطبيق: JSON API + React؛ هذا المنطق مستقل عن Blade.
 */
class BabySearchService
{
    /** بحث بسيط في حقول الاسم ورقم الأب القومي */
    public function searchByText(?string $query): Collection
    {
        $q = trim((string) $query);
        if ($q === '') {
            return Baby::query()->whereRaw('0 = 1')->get();
        }

        return Baby::query()
            ->where(function ($builder) use ($q) {
                $builder->where('father_national_id', 'LIKE', "%{$q}%")
                    ->orWhere('father_name', 'LIKE', "%{$q}%")
                    ->orWhere('mother_name', 'LIKE', "%{$q}%")
                    ->orWhere('baby_name', 'LIKE', "%{$q}%");
            })
            ->get();
    }

    /** شكل موحّد للاستجابة JSON (React / موبايل) */
    public function toSearchResultRows(Collection $babies): array
    {
        return $babies->map(function (Baby $baby) {
            return [
                'id' => $baby->id,
                'baby_name' => $baby->baby_name,
                'mother_name' => $baby->mother_name,
                'father_name' => $baby->father_name,
                'father_phone' => $baby->father_phone,
                'father_national_id' => $baby->father_national_id,
                'status' => $baby->status,
                'footprint_url' => $baby->footprint_url,
            ];
        })->values()->all();
    }
}
