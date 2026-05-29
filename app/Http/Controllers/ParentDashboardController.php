<?php

namespace App\Http\Controllers;

use App\Services\ParentChildService;
use Illuminate\Http\Request;

/**
 * لوحة ولي الأمر (ويب Breeze + Blade) — اختيارية أثناء الانتقال إلى React.
 * نفس منطق الـ API عبر ParentChildService؛ التطبيق الرئيسي: Api\ParentController + Sanctum.
 */
class ParentDashboardController extends Controller
{
    public function __construct(
        private ParentChildService $parentChild,
    ) {
    }

    public function index()
    {
        return view('user.dashboard');
    }

    /** عرض أطفال ولي الأمر الحالي */
    public function children(Request $request)
    {
        $children = $this->parentChild->childrenForParent($request->user());

        return view('user.children', compact('children'));
    }

    /** استقبال بلاغ طفل مفقود */
    public function reportMissing(Request $request)
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
            return redirect()->route('user.children')
                ->with('warning', __('This child is already reported as missing.'));
        }

        return redirect()->route('user.children')
            ->with('success', __('Missing child report submitted successfully.'));
    }
}
