<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "order_id" => "required",
            "product_id" => "required",
            "img" => "required",
            "quantitybuy" => "required|integer|min:1",
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            DB::table('order_details')->insert([
                'order_id' => $request->order_id,
                'product_id' => $request->product_id,
                'quantitybuy' => $request->quantitybuy,
                'img' => $request->img,
            ]);
            $data = [
                "status" => 200,
                "message" => "add thành công",
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function listsOfOrder($idOrder)
    {
        $users = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('(products.price - products.saleoff) as price'), 'order_details.img', 'order_details.quantitybuy')
            ->where('order_details.order_id', $idOrder)
            ->get();
        $data = [
            "status" => 200,
            "message" => $users,
        ];
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
