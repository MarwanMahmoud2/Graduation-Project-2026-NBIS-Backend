<?php

namespace App\Http\Controllers;

/** لوحة Blade فقط؛ البحث النصي JSON في PoliceController@search عند Accept: application/json. */
class PoliceDashboardController extends Controller
{
    public function index()
    {
        return view('police.dashboard');
    }
}
