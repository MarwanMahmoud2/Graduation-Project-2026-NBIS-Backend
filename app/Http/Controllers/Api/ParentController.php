<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Baby;
use App\Services\ParentChildService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParentController extends Controller
{
    public function __construct(
        private ParentChildService $parentChild,
    ) {
    }

    /** عرض قائمة أطفال ولي الأمر */
    public function index(Request $request): JsonResponse
    {
        $children = $this->parentChild->childrenForParent($request->user());

        return response()->json([
            'data' => $children->map(fn (Baby $baby) => $this->parentChild->babyPayload($baby)),
        ]);
    }

    /** عرض تفاصيل طفل واحد */
    public function show(Request $request, Baby $baby): JsonResponse
    {
        $this->parentChild->assertParentOwnsBaby($request->user(), $baby);

        return response()->json([
            'data' => $this->parentChild->babyPayload($baby),
        ]);
    }

    /** الإبلاغ عن طفل مفقود */
    public function reportMissing(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'baby_id' => ['required', 'integer', 'exists:babies,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $result = $this->parentChild->reportMissing(
            $request->user(),
            (int) $validated['baby_id'],
            $validated['notes'] ?? null
        );

        if ($result['status'] === 'already_missing') {
            return response()->json([
                'message' => 'This child is already reported as missing.',
                'data' => $this->parentChild->babyPayload($result['baby']),
            ], 422);
        }

        return response()->json([
            'message' => 'Missing child report submitted successfully.',
            'data' => $this->parentChild->babyPayload($result['baby']),
            'notes' => $result['notes'] ?? null,
        ], 201);
    }
}
