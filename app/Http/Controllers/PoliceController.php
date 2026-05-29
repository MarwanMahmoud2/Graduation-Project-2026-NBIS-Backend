<?php

namespace App\Http\Controllers;

use App\Services\ChildSearchService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * بحث نصي (ويب قديم أو React مع جلسة Breeze).
 * المنطق في ChildSearchService؛ الاستجابة JSON عند expectsJson() لربط React دون اعتماد على Blade.
 */
class PoliceController extends Controller
{
    public function search(Request $request, ChildSearchService $childSearch): JsonResponse|View
    {
        $validated = $request->validate([
            'search_query' => ['nullable', 'string', 'max:255'],
        ]);

        $results = $childSearch->searchByText($validated['search_query'] ?? null);

        if ($request->expectsJson()) {
            return response()->json([
                'data' => $childSearch->toSearchResultRows($results),
            ]);
        }

        return view('police.dashboard', compact('results'));
    }
}
