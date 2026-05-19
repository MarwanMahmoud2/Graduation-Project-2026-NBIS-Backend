<?php

namespace App\Http\Controllers;

/** لوحة Blade فقط؛ صلاحيات الأدمن عبر web.php + routes/api.php. */
class AdminDashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard');
    }
}
