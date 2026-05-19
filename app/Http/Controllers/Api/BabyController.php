<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BabyRegistrationService;
use App\Services\BabySearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BabyController extends Controller
{
    public function __construct(
        private BabyRegistrationService $babyRegistration,
        private BabySearchService $babySearch,
    ) {
    }

    /**
     * تسجيل مولود (ممرضة / أدمن) — multipart.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'baby_name' => ['required', 'string', 'max:255'],
            'mother_name' => ['required', 'string', 'max:255'],
            'father_name' => ['required', 'string', 'max:255'],
            'father_phone' => ['required', 'string', 'max:15'],
            'father_national_id' => ['required', 'string', 'size:14'],
            'footprint_image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:5120'],
        ]);

        $baby = $this->babyRegistration->register(
            $validated,
            (int) $request->user()->id,
            $request->file('footprint_image'),
        );

        return response()->json([
            'message' => 'Baby registered successfully.',
            'data' => $this->babyRegistration->registrationPayload($baby),
        ], 201);
    }

    /**
     * بحث نصي عن سجلات الأطفال (شرطة / أدمن).
     */
    public function textSearch(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search_query' => ['nullable', 'string', 'max:255'],
        ]);

        $results = $this->babySearch->searchByText($validated['search_query'] ?? null);

        return response()->json([
            'data' => $this->babySearch->toSearchResultRows($results),
        ]);
    }
}
