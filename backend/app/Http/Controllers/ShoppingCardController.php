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
    // DB::raw('(SELECT MIN(price) FROM addprices WHERE addprices.product_id = products.id) AS price'),
    // DB::raw('(SELECT saleoff FROM addprices WHERE addprices.product_id = products.id ORDER BY price ASC LIMIT 1) AS saleoff')

    function listOfUser($id)
    {
        $shoppingCard = ShoppingCart::select(
            'shopping_carts.id',
            'shopping_carts.img',
            'shopping_carts.quantity',
            'products.id as idProduct',
            'products.name',
            'addprices.id as idPrice',
            'addprices.price as price',
            'addprices.saleoff as saleoff',
        )
            ->join('products', 'shopping_carts.product_id', '=', 'products.id')
            ->join('addprices', 'shopping_carts.addprice_id', '=', 'addprices.id')
            ->where('shopping_carts.user_id', $id)
            ->get();
        return response()->json($shoppingCard, 200);
    }


    function updateQuantity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            "quantity" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $cart = DB::table('shopping_carts')->where('id',  $request->id)->get();
            if (count($cart) > 0) {
                $editCart = DB::table('shopping_carts')->where('id', $request->id)
                    ->update(['quantity' => $request->quantity]);
                $data = [
                    "status" => 200,
                    "message" => "update thành công",
                ];
                $dataNG = [
                    "status" => 400,
                    "message" => "Bạn chưa thay đổi",
                ];
                return $editCart ?  response()->json($data, 200) : response()->json($dataNG, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Không tìm thấy sản phẩm trong giỏ hàng",
                ];
                return response()->json($data, 200);
            }
        }
    }
    function productBuyed(Request $request)
    {
        $product = DB::table('products')->where('id',  $request->idProduct)->first();
        if ($product) {
            $sl = $product->quantity - $request->quantity;
            $editProduct = DB::table('products')->where('id', $request->idProduct)
                ->update(['quantity' => $sl]);
            $data = [
                "status" => 200,
                "message" => "update thành công",
                "messageư" => $sl,
            ];
            $dataNG = [
                "status" => 400,
                "message" => "Không thay đổi gì",
            ];
            return $editProduct ?  response()->json($data, 200) : response()->json($dataNG, 400);
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
        $product = DB::table('products')->where('id',  $request->idProduct)->first();
        if ($product) {
            $sl = $product->quantity + $request->quantity;
            $editProduct = DB::table('products')->where('id', $request->idProduct)
                ->update(['quantity' => $sl]);
            $data = [
                "status" => 200,
                "message" => "update thành công",
                "messageư" => $sl,
            ];
            $dataNG = [
                "status" => 400,
                "message" => "Không thay đổi gì",
            ];
            return $editProduct ?  response()->json($data, 200) : response()->json($dataNG, 400);
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
            "addprice_id" => ['required'],
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
            $cart = DB::table('shopping_carts')->where('product_id',  $request->product_id)->where('addprice_id',  $request->addprice_id)->first();
            if ($cart) {
                $sl = $cart->quantity + $request->quantity;
                $edit = DB::table('shopping_carts')->where('product_id', $request->product_id)->where('addprice_id',  $request->addprice_id)
                    ->update(['quantity' => $sl]);
                $data = [
                    "status" => 200,
                    "message" => "Thêm số lượng thành công",
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
                $shoppingCard->addprice_id = $request->addprice_id;
                $shoppingCard->quantity = $request->quantity;
                $shoppingCard->save();
                $data = [
                    "status" => 200,
                    "message" => "Thêm giỏ hàng thành công",
                ];
                return response()->json($data, 200);
            }
        }
    }

    function changeQuatityProduct(Request $request)
    {
        // idShoppingCart, numberBuy
        $cart = DB::table('products')->where('name',  $request->name)->first();
        // return $cart;
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
