<?php

namespace App\Http\Controllers;

use App\Models\Addprice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AddpriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($product_id)
    {
        $users = DB::select('select * from addprices where product_id = ?', [$product_id]);
        return response()->json($users, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $product_id = $request->product_id;
        $size = $request->size;
        $price = $request->price;
        $saleoff = $request->saleoff;
        $validator = Validator::make($request->all(), [
            'product_id' => ['required', 'max:255'],
            "size" => ['required'],
            "price" =>  ['numeric', 'min:1'],
            "saleoff" => ['nullable', 'numeric', 'min:0', function ($attribute, $value, $fail) use ($price) {
                if (!empty($value) && $value >= $price) {
                    $fail('The sale must be less than the price.');
                }
            },],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $AddP = new Addprice;
            $AddP->product_id = $product_id;
            $AddP->size = $size;
            $AddP->price = $price;
            $AddP->saleoff = $saleoff;
            $AddP->save();
            $data = [
                "status" => 200,
                "message" => "update thành công",
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
    public function show(Addprice $addprice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Addprice $addprice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Addprice $addprice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Addprice $addprice)
    {
        //
    }
}
