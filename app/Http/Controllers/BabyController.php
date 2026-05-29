<?php

namespace App\Http\Controllers;

use App\Services\ChildRegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * تسجيل طفل من واجهة الويب (Breeze + Blade).
 * المنطق في ChildRegistrationService — نفس جدول children و API.
 */
class BabyController extends Controller
{
    public function __construct(
        private ChildRegistrationService $childRegistration,
    ) {
    }

    public function create()
    {
        return view('children.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mother_name' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'father_phone' => 'required|string|max:15',
            'father_national_id' => 'required|string|size:14',
            'footprint_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $this->childRegistration->register(
            $validated,
            (int) Auth::id(),
            $request->file('footprint_image'),
        );

        return redirect()->back()->with('success', 'تم تسجيل الطفل وربطه ببيانات الأب بنجاح!');
    }
}
