<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\UserCotroller;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ShoppingCardController;;

use App\Http\Controllers\OrdersController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\VnPayController;
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

Route::get('orders/test', [OrdersController::class, 'testham']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// categorys
// Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {
Route::get('categorys', [CategoryController::class, 'index']);
// });


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
    Route::post('logout', [UserCotroller::class, 'logout']);
});
Route::post('login', [UserCotroller::class, 'login']);
Route::post('authentication', [UserCotroller::class, 'authentication']);
Route::post('register', [UserCotroller::class, 'register']);
Route::patch('changePass', [UserCotroller::class, 'changePass']);
Route::post('forgotPass', [UserCotroller::class, 'forgotPass']);
Route::post('checkTokenConfirm', [UserCotroller::class, 'checkTokenConfirm']);
Route::delete('delTokenConfirm', [UserCotroller::class, 'delTokenConfirm']);
Route::post('changePassWithToken', [UserCotroller::class, 'changePassWithToken']);
// uAdmin
Route::get('account/{page}', [UserCotroller::class, 'index']);
Route::get('account/listUserStatus/{role}/{page}', [UserCotroller::class, 'listUserStatus']);
Route::patch('account/changeRole', [UserCotroller::class, 'changeRole']);
Route::delete('account/delUser/{id}', [UserCotroller::class, 'delUser']);
Route::post('account/registerOfAd', [UserCotroller::class, 'registerOfAd']);
Route::post('account/editOfAd', [UserCotroller::class, 'editOfAd']);

// upload

// send mail
Route::post(
    'sendPass',
    [MailController::class, 'mailPass']
);

// shoppingcart
Route::get('shoppingcard', [ShoppingCardController::class, 'index']);
Route::post('shoppingcard/adOneProduct', [ShoppingCardController::class, 'addOneProduct']);
Route::get('shoppingcard/listOfUser/{id}', [ShoppingCardController::class, 'listOfUser']);
Route::post('shoppingcard/delCart', [ShoppingCardController::class, 'delCart']);
Route::post('shoppingcard/changeQuatityProduct', [ShoppingCardController::class, 'changeQuatityProduct']);
Route::get('shoppingcard/product', [ShoppingCardController::class, 'product']);
Route::post('shoppingcard/productBuyed', [ShoppingCardController::class, 'productBuyed']);
Route::post('shoppingcard/productCancelBuy', [ShoppingCardController::class, 'productCancelBuy']);
Route::post('shoppingcard/updateQuantity', [ShoppingCardController::class, 'updateQuantity']);

// orders
// Route::get('orders/{page?}/{perPage?}', [OrdersController::class, 'index']);
Route::post('orders/create', [OrdersController::class, 'create']);
Route::get('orders/listOfUser/{Uid}', [OrdersController::class, 'listOfUser']);
Route::get('orders/listOfStatus', [OrdersController::class, 'listOfStatus']);
Route::post('orders/updateAddress', [OrdersController::class, 'updateAddress']);
Route::patch('orders/updateStatusOrder', [OrdersController::class, 'updateStatusOrder']);
Route::delete('orders/delOrder/{id}', [OrdersController::class, 'delOrder']);


// orderDetails
Route::post('ordersDetails/create', [OrderDetailController::class, 'create']);
Route::get('ordersDetails/listsOfOrder/{idOrder}', [OrderDetailController::class, 'listsOfOrder']);
// vnpay
Route::post('vnpay', [VnPayController::class, 'pay']);
