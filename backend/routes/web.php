<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/vip', function () {
    // return view('emails.demo');
    return 1;
});
Route::get('/', function () {
    return 'Hello world';
});
Route::get('/email', function () {
    return view('emails.pass');
});
Route::get('/orders', function () {
    return view('emails.orders');
});
// Route::get('/home', function () {
//     return ['Laravel' => app()->version()];
// });

require __DIR__ . '/auth.php';
