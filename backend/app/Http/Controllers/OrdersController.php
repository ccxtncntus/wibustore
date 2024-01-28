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
    public function index($page = 1, $perPage = 8)
    {
        $orders = DB::table("orders")->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return response()->json($orders, 200);
    }
    public function listOfStatus()
    {
        $orders = DB::table("orders")->get();
        $data = [
            "status" => 200,
            "message" => $orders,
        ];
        return response()->json($data, 200);
    }

    public function listOfUser($Uid)
    {
        $orders = DB::table("orders")->where('user_id', $Uid)->orderBy('id', 'desc')->get();
        $data = [
            "status" => 200,
            "message" => $orders,
        ];
        return response()->json($data, 200);
    }
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
    public function updateAddress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            'address' => ['required'],
            "phoneNumbers" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $orderId = DB::table('orders')->where('id', $request->id)->update([
                'address' => $request->address,
                'phoneNumbers' => $request->phoneNumbers,
            ]);
            $s = $orderId ? "Update thành công" : 'Lỗi gì rồi';
            $data = [
                "status" => 200,
                "message" => $s,
            ];
            return response()->json($data, 200);
        }
    }
    public function updateStatusOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            'status' => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $orderId = DB::table('orders')->where('id', $request->id)->update([
                'status' => $request->status,
            ]);
            $s = $orderId ? "Update thành công" : 'Lỗi gì rồi';
            $data = [
                "status" => 200,
                "message" => $s,
            ];
            return response()->json($data, 200);
        }
    }
    public function delOrder($id)
    {
        $orderId = DB::table('orders')->where('id', $id)->delete();
        $s = $orderId ? "Xóa thành công" : 'Lỗi gì rồi';
        $data = [
            "status" => 200,
            "message" => $s,
        ];
        return response()->json($data, 200);
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
