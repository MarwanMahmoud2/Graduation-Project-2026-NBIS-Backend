<?php

namespace App\Http\Controllers;

use App\Services\BabyRegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * تسجيل مولود من واجهة الويب (Breeze + Blade).
 * المنطق في BabyRegistrationService — نفس جدول babies و API.
 */
class BabyController extends Controller
{
    public function __construct(
        private BabyRegistrationService $babyRegistration,
    ) {
    }

    public function create()
    {
        return view('babies.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'baby_name' => 'required|string|max:255',
            'mother_name' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'father_phone' => 'required|string|max:15',
            'father_national_id' => 'required|string|size:14',
            'footprint_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $this->babyRegistration->register(
            $validated,
            (int) Auth::id(),
            $request->file('footprint_image'),
        );

        return redirect()->back()->with('success', 'تم تسجيل المولود وربطه ببيانات الأب بنجاح!');
    }
}
