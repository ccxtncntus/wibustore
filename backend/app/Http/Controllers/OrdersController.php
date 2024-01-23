<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $orders = Orders::orderBy("created_at", "desc")->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            "address" => ['required'],
            "pay" =>  ['required'],
            "phoneNumbers" => ['required'],
            "totail" =>  ['required', 'numeric', 'min:1'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $orderId = DB::table('orders')->insert([
                'user_id' => $request->user_id,
                'address' => $request->address,
                'pay' => $request->pay,
                'phoneNumbers' => $request->phoneNumbers,
                'totail' => $request->totail,
                'status' => 'Chờ xử lí',
            ]);
            $orderId = DB::getPdo()->lastInsertId();
            $data = [
                "status" => 200,
                "message" => "add thành công",
                "lastID" => $orderId,
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
    public function show(string $id)
    {
        //
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
