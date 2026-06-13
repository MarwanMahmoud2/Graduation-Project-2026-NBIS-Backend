<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is not used as the application uses React frontend.
| All routes are handled by the React SPA.
|
*/

// Redirect to frontend (if needed in the future)
Route::get('/', function () {
    return redirect('/login');
});
