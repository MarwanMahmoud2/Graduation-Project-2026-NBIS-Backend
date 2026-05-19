<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BabyController;
use App\Http\Controllers\Api\InfantController;
use App\Http\Controllers\Api\InfantFootprintController;
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
    Route::get('/my-children/{baby}', [ParentController::class, 'show']);
    Route::post('/missing-reports', [ParentController::class, 'reportMissing']);
});

/*
|--------------------------------------------------------------------------
| ممرضة / أدمن — تسجيل مولود (جدول babies)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:nurse,admin'])->group(function () {
    Route::post('/babies/register', [BabyController::class, 'store']);
    Route::post('/infants/register', [InfantController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| شرطة / أدمن — بحث
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:police,admin'])->group(function () {
    Route::post('/babies/text-search', [BabyController::class, 'textSearch']);
    Route::post('/infants/search', [InfantFootprintController::class, 'search']);
    Route::post('/infants/validate', [InfantFootprintController::class, 'validateFootprint']);
});
