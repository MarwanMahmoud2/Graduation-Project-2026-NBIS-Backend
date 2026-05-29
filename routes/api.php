<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\ParentController;

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

/*
|--------------------------------------------------------------------------
| ممرضة / أدمن — تسجيل طفل (جدول children)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:nurse,admin'])->group(function () {
    Route::post('/children/register', [ChildController::class, 'store']);
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
| شرطة / أدمن — بحث
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:police,admin'])->group(function () {
    Route::post('/children/text-search', [ChildController::class, 'textSearch']);
    Route::post('/children/search-by-footprint', [ChildController::class, 'searchByFootprint']);
    Route::post('/children/validate-footprint', [ChildController::class, 'validateFootprint']);
});
