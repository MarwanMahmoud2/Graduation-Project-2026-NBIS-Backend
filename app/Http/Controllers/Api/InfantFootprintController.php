<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FootprintAiService;
use App\Services\FootprintValidationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InfantFootprintController extends Controller
{
    public function __construct(
        private FootprintAiService $footprintAi,
        private FootprintValidationService $footprintValidation,
    ) {
    }

    /**
     * البحث عن طفل مفقود عن طريق البصمة (شرطة / أدمن) — AI phase.
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'fingerprint_image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $result = $this->footprintAi->identify($request->file('fingerprint_image'));

        if ($result['status'] === 'ai_unavailable') {
            return response()->json([
                'status' => 'ai_unavailable',
                'message' => $result['message'] ?? 'AI service is not reachable.',
            ], 503);
        }

        if ($result['status'] === 'match_found') {
            return response()->json([
                'status' => 'match_found',
                'confidence_tier' => $result['confidence_tier'],
                'score' => $result['score'],
                'data' => [
                    'child' => $result['ai_child'],
                    'parents' => $result['ai_parents'],
                    'hospital' => $result['ai_hospital'],
                ],
            ]);
        }

        return response()->json([
            'status' => 'no_match',
            'message' => $result['message'] ?? 'No matching records found for this fingerprint.',
        ], 404);
    }

    /**
     * التحقق من البصمة — AI phase.
     */
    public function validateFootprint(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fingerprint_image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:5120'],
            'baby_id' => ['nullable', 'integer', 'exists:babies,id'],
        ]);

        $result = $this->footprintValidation->validate(
            $request->file('fingerprint_image'),
            isset($validated['baby_id']) ? (int) $validated['baby_id'] : null,
        );

        $statusCode = match ($result['reason'] ?? '') {
            'ai_unavailable' => 503,
            'verified' => 200,
            default => 422,
        };

        return response()->json($result, $statusCode);
    }
}
