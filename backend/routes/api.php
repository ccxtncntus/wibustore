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
use App\Http\Controllers\SlidersController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AddpriceController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
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
// admin
Route::prefix('productsAdmin')->group(function () {
    Route::get('/', [ProductsController::class, 'indexAdmin']);
    Route::get('/{id}', [ProductsController::class, 'listProductOfCategoryAdmin']);
    // Route::post('/', [AddpriceController::class, 'create']);
});


// user
Route::get('products', [ProductsController::class, 'index']);
Route::get('products/sale', [ProductsController::class, 'indexSale']);
Route::get('products/hot', [ProductsController::class, 'indexHot']);
Route::get('products/number', [ProductsController::class, 'indeNumber']);
Route::get('products/random/{id}', [ProductsController::class, 'indexRandom']);
Route::get('products/once/{value}', [ProductsController::class, 'onceProduct']);
Route::get('products/listPro/{id}', [ProductsController::class, 'listProductOfCategory']);
Route::get('products/{id}', [ProductsController::class, 'show']);
Route::post('products', [ProductsController::class, 'upload']);
Route::post('products/edit/{id}', [ProductsController::class, 'edit']);
Route::delete('products/delete/{id}', [ProductsController::class, 'delete']);
Route::patch('products/updateQuantity/{id}', [ProductsController::class, 'updateQuantity']);
Route::patch('products/updateBought/{id}', [ProductsController::class, 'updateBought']);
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
Route::post('loginGG', [UserCotroller::class, 'loginGG']);
Route::post('authentication', [UserCotroller::class, 'authentication']);
Route::post('register', [UserCotroller::class, 'register']);
Route::patch('changePass', [UserCotroller::class, 'changePass']);
Route::post('forgotPass', [UserCotroller::class, 'forgotPass']);
Route::post('checkTokenConfirm', [UserCotroller::class, 'checkTokenConfirm']);
Route::delete('delTokenConfirm', [UserCotroller::class, 'delTokenConfirm']);
Route::post('changePassWithToken', [UserCotroller::class, 'changePassWithToken']);
Route::post('changeName/{id}', [UserCotroller::class, 'changeName']);
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
Route::post(
    'sendOrders',
    [MailController::class, 'dataOrders']
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
Route::get('orders/all', [OrdersController::class, 'indexAll']);
Route::get('orders/getPending', [OrdersController::class, 'getPending']);
Route::get('orders/{page}', [OrdersController::class, 'index']);
Route::get('orders/last/{idUser}', [OrdersController::class, 'indexID']);
Route::post('orders/create', [OrdersController::class, 'create']);
Route::get('orders/listOfUser/{Uid}/{page}', [OrdersController::class, 'listOfUser']);
Route::get('orders/listOfUserAll/{Uid}/{page}', [OrdersController::class, 'listOfUserAll']);
Route::get('orders/listOfStatus/{status}/{page}', [OrdersController::class, 'listOfStatus']);
Route::post('orders/updateAddress', [OrdersController::class, 'updateAddress']);
Route::patch('orders/updateStatusOrder', [OrdersController::class, 'updateStatusOrder']);
Route::delete('orders/delOrder/{id}', [OrdersController::class, 'delOrder']);


// orderDetails
Route::post('ordersDetails/create', [OrderDetailController::class, 'create']);
Route::get('ordersDetails/listsOfOrder/{idOrder}', [OrderDetailController::class, 'listsOfOrder']);
// vnpay
Route::post('vnpay', [VnPayController::class, 'pay']);
// slider
Route::get('sliders', [SlidersController::class, 'index']);
Route::post('sliders/add', [SlidersController::class, 'add']);
Route::post('sliders/edit', [SlidersController::class, 'edit']);
Route::put('sliders/editNoImg', [SlidersController::class, 'editNoImg']);
Route::delete('sliders/delSlider/{id}', [SlidersController::class, 'delSlider']);
// address
Route::get('address/{id}', [AddressController::class, 'index']);
Route::get('address/getDefault/{id}', [AddressController::class, 'getDefault']);
Route::post('address/{id}/add', [AddressController::class, 'create']);
Route::delete('address/delete/{id}', [AddressController::class, 'delete']);
Route::patch('address/updatePatch/{id}', [AddressController::class, 'updatePatch']);
Route::put('address/updatePut/{id}', [AddressController::class, 'updatePut']);
Route::patch('address/updateDefault/{id}/{idUser}', [AddressController::class, 'updateDefault']);
// dashboard
Route::get('dashboard', [DashboardController::class, 'index']);
Route::get('dashboard/getBest', [DashboardController::class, 'getBest']);
Route::get('dashboard/getData', [DashboardController::class, 'getData']);

// notification
Route::post('sendNotifi', [NotificationController::class, 'sendNoti']);
Route::post('comment', [NotificationController::class, 'comment']);


// addprice
Route::prefix('addprice')->group(function () {
    Route::get('/{product_id}', [AddpriceController::class, 'index']);
    Route::post('/', [AddpriceController::class, 'create']);
    Route::delete('/{id}', [AddpriceController::class, 'destroy']);
    Route::put('/{id}', [AddpriceController::class, 'edit']);
});
// blog
Route::prefix('blogs')->group(function () {
    // admin
    Route::get('/admin/{page}', [BlogController::class, 'indexAdmin']);

    Route::get('/page/{page}', [BlogController::class, 'index']);
    Route::get('/{idblog}', [BlogController::class, 'show']);
    Route::post('/', [BlogController::class, 'store']);
    Route::delete('/{id}', [BlogController::class, 'destroy']);
    Route::patch('/{id}', [BlogController::class, 'updateActive']);
    Route::patch('/update/{id}', [BlogController::class, 'updatedefault']);
    Route::post('/update/{id}', [BlogController::class, 'updateHasImg']);
});


//comments
Route::prefix('comments')->group(function () {
    Route::get('/', [CommentController::class, 'index']);
    Route::get('/limit', [CommentController::class, 'indexlimit']);
    Route::get('/product/{id}', [CommentController::class, 'indexP']);
    Route::get('/productlimit/{id}', [CommentController::class, 'indexlimitP']);


    Route::post('/', [CommentController::class, 'store']);
    Route::delete('/{id}', [CommentController::class, 'destroy']);
    Route::patch('/{id}', [CommentController::class, 'update']);
});
