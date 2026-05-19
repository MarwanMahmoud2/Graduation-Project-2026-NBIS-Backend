<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BabyController;
use App\Http\Controllers\PoliceController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\NurseDashboardController;
use App\Http\Controllers\PoliceDashboardController;
use App\Http\Controllers\ParentDashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// NBIS React demo (no auth) — Admin & Police dashboards
Route::get('/demo/{any?}', function () {
    return view('demo-react');
})->where('any', '.*')->name('demo');

Route::middleware(['auth', 'verified'])->group(function () {

    // المسار العام بعد تسجيل الدخول
    Route::get('/dashboard', function () {
        $role = auth()->user()->role;
        return match ($role) {
            'admin', 'nurse', 'police', 'user' => redirect()->route("{$role}.dashboard"),
            default => abort(403, 'Unknown role.'),
        };
    })->name('dashboard');
});

// المسارات المشتركة (تعديل الحساب)
Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- 🏥 منطقة الممرضة (Nurse Page) ---
// الصفحة نفسها للممرضة فقط — الأدمن عنده داشبورد منفصلة
Route::middleware(['auth', 'verified', 'role:nurse'])->group(function () {
    Route::get('/nurse/dashboard', [NurseDashboardController::class, 'index'])->name('nurse.dashboard');
});

// --- 👮 منطقة الشرطة (Police Page) ---
Route::middleware(['auth', 'verified', 'role:police'])->group(function () {
    Route::get('/police/dashboard', [PoliceDashboardController::class, 'index'])->name('police.dashboard');
});

// --- 👨‍👩‍👧 منطقة المستخدم/الأهل (User/Parent Pages) ---
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/user/dashboard', [ParentDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/user/babies', [ParentDashboardController::class, 'babies'])->name('user.babies');
    Route::post('/user/report-missing', [ParentDashboardController::class, 'reportMissing'])->name('user.reportMissing');
});

// --- 🛡️ منطقة الأدمن (Admin Page) ---
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

// --- ⚡ الأكشنز المشتركة (Shared Actions) ---
Route::middleware(['auth', 'verified', 'role:nurse,admin'])->group(function () {
    Route::get('/babies/create', [BabyController::class, 'create'])->name('babies.create');
    Route::post('/babies/store', [BabyController::class, 'store'])->name('babies.store');
});

Route::middleware(['auth', 'verified', 'role:police,admin'])->group(function () {
    Route::post('/babies/search', [PoliceController::class, 'search'])->name('babies.search');
});


require __DIR__ . '/auth.php';
