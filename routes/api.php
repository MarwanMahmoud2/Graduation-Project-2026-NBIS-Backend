<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\ParentController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API عام — React + mobile (نفس قاعدة البيانات)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/user/profile', [AuthController::class, 'updateProfile']);
    Route::get('/settings', [AuthController::class, 'settings']);
    Route::put('/settings', [AuthController::class, 'updateSettings']);
});

/*
|--------------------------------------------------------------------------
| ولي الأمر (user)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/my-children', [ParentController::class, 'index']);
    Route::get('/my-children/{child}', [ParentController::class, 'show']);
    Route::post('/missing-reports', [ParentController::class, 'reportMissing']);
});

// Admin can also report missing children (no ownership constraint)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/missing-reports', [ParentController::class, 'reportMissing']);
});

/*
|--------------------------------------------------------------------------
| ممرضة / أدمن — تسجيل طفل وقائمة الأطفال (جدول children)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:nurse,admin'])->group(function () {
    Route::post('/children/register', [ChildController::class, 'store']);
    Route::get('/children', [ChildController::class, 'index']);
    Route::get('/children/{child}', [ChildController::class, 'show']);
});

/*
|--------------------------------------------------------------------------
| ولي الأمر (user) — تسجيل طفل من الموبايل
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::post('/children/register-by-parent', [ChildController::class, 'storeByParent']);
});

/*
|--------------------------------------------------------------------------
| شرطة / أدمن — بحث وسجلات التحقق
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:police,admin'])->group(function () {
    Route::post('/children/text-search', [ChildController::class, 'textSearch']);
    Route::post('/children/search-by-footprint', [ChildController::class, 'searchByFootprint']);
    Route::post('/children/validate-footprint', [ChildController::class, 'validateFootprint']);
    Route::get('/verification-logs', [AdminController::class, 'verificationLogs']);
});

/*
|--------------------------------------------------------------------------
| أدمن — إدارة النظام
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Dashboard stats
    Route::get('/admin/dashboard/stats', [AdminController::class, 'dashboardStats']);
    Route::get('/admin/dashboard/children', [AdminController::class, 'childrenOverview']);

    // Users management
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::post('/admin/users', [AdminController::class, 'createUser']);
    Route::put('/admin/users/{user}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);

    // Children management
    Route::get('/admin/children', [AdminController::class, 'children']);
    Route::delete('/admin/children/{child}', [AdminController::class, 'deleteChild']);
    Route::get('/admin/verification-logs', [AdminController::class, 'verificationLogs']);

    // Settings
    Route::get('/admin/settings', [AdminController::class, 'settings']);
    Route::put('/admin/settings', [AdminController::class, 'updateSettings']);

    // Notifications
    Route::get('/admin/notifications', [AdminController::class, 'notifications']);
    Route::get('/admin/notifications/unread-count', [AdminController::class, 'notificationsUnreadCount']);
    Route::patch('/admin/notifications/{notification}/read', [AdminController::class, 'markNotificationRead']);
    Route::patch('/admin/notifications/read-all', [AdminController::class, 'markAllNotificationsRead']);
});
