<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Child;
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
            'data' => $children->map(fn (Child $child) => $this->parentChild->childPayload($child)),
        ]);
    }

    /** عرض تفاصيل طفل واحد */
    public function show(Request $request, Child $child): JsonResponse
    {
        $this->parentChild->assertParentOwnsChild($request->user(), $child);

        return response()->json([
            'data' => $this->parentChild->childPayload($child),
        ]);
    }

    /** الإبلاغ عن طفل مفقود */
    public function reportMissing(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'child_id' => ['required', 'integer', 'exists:children,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $result = $this->parentChild->reportMissing(
            $request->user(),
            (int) $validated['child_id'],
            $validated['notes'] ?? null
        );

        if ($result['status'] === 'already_missing') {
            return response()->json([
                'message' => 'This child is already reported as missing.',
                'data' => $this->parentChild->childPayload($result['child']),
            ], 422);
        }

        return response()->json([
            'message' => 'Missing child report submitted successfully.',
            'data' => $this->parentChild->childPayload($result['child']),
            'notes' => $result['notes'] ?? null,
        ], 201);
    }
}
