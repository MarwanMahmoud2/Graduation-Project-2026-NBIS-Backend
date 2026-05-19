<?php

namespace App\Http\Controllers;

/** لوحة Blade فقط؛ منطق التسجيل في BabyController + لاحقاً API للممرضة. */
class NurseDashboardController extends Controller
{
    public function index()
    {
        return view('nurse.dashboard');
    }
}
