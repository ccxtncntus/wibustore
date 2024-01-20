<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingCart;
use Illuminate\Support\Facades\Validator;

class ShoppingCardController extends Controller
{
    function index(Request $request)
    {
        $shoppingCard = ShoppingCart::all();
        return $shoppingCard;
    }
    function addOneProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            "product_id" => ['required'],
            "quantity" => ['numeric', 'min:1'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $shoppingCard = new ShoppingCart;
            $shoppingCard->user_id = $request->user_id;
            $shoppingCard->product_id = $request->product_id;
            $shoppingCard->quantity = $request->quantity;
            $shoppingCard->save();
            $data = [
                "status" => 200,
                "message" => "update thành công",
            ];
            return response()->json($data, 200);
        }
    }
}
