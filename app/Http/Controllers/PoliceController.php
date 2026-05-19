<?php

namespace App\Http\Controllers;

use App\Services\BabySearchService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * بحث نصي (ويب قديم أو React مع جلسة Breeze).
 * المنطق في BabySearchService؛ الاستجابة JSON عند expectsJson() لربط React دون اعتماد على Blade.
 */
class PoliceController extends Controller
{
    public function search(Request $request, BabySearchService $babySearch): JsonResponse|View
    {
        $validated = $request->validate([
            'search_query' => ['nullable', 'string', 'max:255'],
        ]);

        $results = $babySearch->searchByText($validated['search_query'] ?? null);

        if ($request->expectsJson()) {
            return response()->json([
                'data' => $babySearch->toSearchResultRows($results),
            ]);
        }

        return view('police.dashboard', compact('results'));
    }
}
