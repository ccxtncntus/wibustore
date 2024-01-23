<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingCart;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ShoppingCardController extends Controller
{
    function index(Request $request)
    {
        $shoppingCard = ShoppingCart::all();
        return $shoppingCard;
    }

    function listOfUser(Request $request)
    {
        $shoppingCard = ShoppingCart::select('shopping_carts.id', 'shopping_carts.img', 'shopping_carts.status', 'shopping_carts.quantity', 'products.id as idProduct',  'products.name', 'products.saleoff', 'products.price')
            ->join('products', 'shopping_carts.product_id', '=', 'products.id')
            ->where('shopping_carts.user_id', $request->idUser)
            ->where('shopping_carts.status', 'Chưa mua')->get();
        return response()->json($shoppingCard, 200);
    }
    function productBuyed(Request $request)
    {
        $cart = DB::table('shopping_carts')->where('id',  $request->id)->get();
        $product = DB::table('products')->where('id',  $request->idProduct)->get();
        if ($cart && $product) {
            $sl = $product[0]->quantity - $request->quantity;
            $editCart = DB::table('shopping_carts')->where('id', $request->id)
                ->update(['status' => 'Đã mua']);
            $editProduct = DB::table('products')->where('id', $request->idProduct)
                ->update(['quantity' => $sl]);
            $data = [
                "status" => 200,
                "message" => "update thành công",
            ];
            $dataNG = [
                "status" => 400,
                "message" => "Lỗi update",
            ];
            return $editCart && $editProduct ?  response()->json($data, 200) : response()->json($dataNG, 400);
        } else {
            $data = [
                "status" => 400,
                "message" => "Không tìm thấy sản phẩm trong giỏ hàng",
            ];
            return response()->json($data, 200);
        }
    }


    function productCancelBuy(Request $request)
    {
        $cart = DB::table('shopping_carts')->where('id',  $request->id)->get();
        $product = DB::table('products')->where('id',  $request->idProduct)->get();
        if ($cart && $product) {
            $sl = $product[0]->quantity + $request->quantity;
            $editCart = DB::table('shopping_carts')->where('id', $request->id)
                ->update(['status' => 'Chưa mua']);
            $editProduct = DB::table('products')->where('id', $request->idProduct)
                ->update(['quantity' => $sl]);
            $data = [
                "status" => 200,
                "message" => "update thành công",
            ];
            $dataNG = [
                "status" => 400,
                "message" => "Lỗi update",
            ];
            return $editCart && $editProduct ?  response()->json($data, 200) : response()->json($dataNG, 400);
        } else {
            $data = [
                "status" => 400,
                "message" => "Không tìm thấy sản phẩm trong giỏ hàng",
            ];
            return response()->json($data, 200);
        }
    }

    function addOneProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            "product_id" => ['required'],
            "img" => ['required'],
            "quantity" => ['numeric', 'min:1'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $cart = DB::table('shopping_carts')->where('product_id',  $request->product_id)->first();
            if ($cart) {
                $sl = $cart->quantity + $request->quantity;
                $edit = DB::table('shopping_carts')->where('product_id', $request->product_id)
                    ->update(['quantity' => $sl]);
                $data = [
                    "status" => 200,
                    "message" => "update thành công",
                ];
                $dataNG = [
                    "status" => 400,
                    "message" => "Lỗi update",
                ];
                return $edit ?  response()->json($data, 200) : response()->json($dataNG, 400);
            } else {
                $shoppingCard = new ShoppingCart;
                $shoppingCard->user_id = $request->user_id;
                $shoppingCard->product_id = $request->product_id;
                $shoppingCard->img = $request->img;
                $shoppingCard->status = 'Chưa mua';
                $shoppingCard->quantity = $request->quantity;
                $shoppingCard->save();
                $data = [
                    "status" => 200,
                    "message" => "add thành công",
                ];
                return response()->json($data, 200);
            }
        }
    }

    function changeQuatityProduct(Request $request)
    {
        // idShoppingCart, numberBuy
        $cart = DB::table('products')->where('name',  $request->name)->first();
        return $cart;
        // if ($cart) {
        //     $sl = $cart->quantity + $request->quantity;
        //     $edit = DB::table('shopping_carts')->where('product_id', $request->product_id)
        //         ->update(['quantity' => $sl]);
        //     $data = [
        //         "status" => 200,
        //         "message" => "update thành công",
        //     ];
        //     $dataNG = [
        //         "status" => 400,
        //         "message" => "Lỗi update",
        //     ];
        //     return $edit ?  response()->json($data, 200) : response()->json($dataNG, 400);
        // } else {
        //     $shoppingCard = new ShoppingCart;
        //     $shoppingCard->user_id = $request->user_id;
        //     $shoppingCard->product_id = $request->product_id;
        //     $shoppingCard->img = $request->img;
        //     $shoppingCard->status = 'Chưa mua';
        //     $shoppingCard->quantity = $request->quantity;
        //     $shoppingCard->save();
        //     $data = [
        //         "status" => 200,
        //         "message" => "add thành công",
        //     ];
        //     return response()->json($data, 200);
        // }
    }
    function product(Request $request)
    {
        $cart = DB::table('products')->where('name',  $request->name)->first();
        return response()->json($cart, 200);
    }

    function delCart(Request $request)
    {
        $shoppingCard = ShoppingCart::find($request->id);
        if ($shoppingCard) {
            $shoppingCard = ShoppingCart::find($request->id)->delete();
            $data = [
                "status" => 200,
                'message' => 'Xóa sản phẩm thàng công',
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                'message' => 'Không tìm thấy sản phẩm',
            ];
            return response()->json($data, 200);
        }
    }
}
