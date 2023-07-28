<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*
Route::get('/{any?}', HomeController::class)
    ->where('any', '.*'); */
    Route::get('/{path?}', function () {
        return view('welcome');
    })->where('path', '^(?!api).*?');
