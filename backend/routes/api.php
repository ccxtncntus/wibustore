<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\UserCotroller;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// categorys
Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {
    Route::get('categorys', [CategoryController::class, 'index']);
});


// Route::get('categorys', [CategoryController::class, 'index']);
Route::post('categorys', [CategoryController::class, 'upload']);
Route::put('categorys/edit/{id}', [CategoryController::class, 'edit']);
Route::delete('categorys/delete/{id}', [CategoryController::class, 'delete']);
// products
Route::get('products', [ProductsController::class, 'index']);
Route::get('products/once/{value}', [ProductsController::class, 'onceProduct']);
Route::get('products/listPro/{id}', [ProductsController::class, 'listProductOfCategory']);
Route::get('products/{id}', [ProductsController::class, 'show']);
Route::post('products', [ProductsController::class, 'upload']);
Route::post('products/edit/{id}', [ProductsController::class, 'edit']);
Route::delete('products/delete/{id}', [ProductsController::class, 'delete']);
// images
Route::get('imagesProduct/{id}', [ImagesController::class, 'index']);
Route::get('imagesProduct/delonce/{id}', [ImagesController::class, 'deleteOnce']);
Route::delete('im/del/{imgs}', [ImagesController::class, 'destroy']);
// crawl
Route::get('crawl/detail/products/{path}', [ProductsController::class, 'crawlDetail']);
Route::get('crawl/{p}', [ProductsController::class, 'crawl']);
// users
// Route::apiResource('login', UserCotroller::class);
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('account', [UserCotroller::class, 'index']);
});
Route::post('login', [UserCotroller::class, 'login']);
