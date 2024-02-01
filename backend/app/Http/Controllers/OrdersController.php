<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    // get
    public function indexAll()
    {
        $orders = DB::table("orders")->get();
        return response()->json($orders, 200);
    }
    public function index($page)
    {
        $c = DB::table("orders")->get();
        $count = count($c);
        $orders = DB::table('orders')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->select('orders.*', 'users.name')
            ->orderBy('id', 'desc')
            ->paginate(12, ['*'], 'page', $page);
        return response()->json([$orders, 'count' => $count], 200);
    }
    public function listOfStatus($status, $page)
    {
        $c = DB::table("orders")->get();
        $count = count($c);
        $orders = DB::table('orders')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->select('orders.*', 'users.name')
            ->where('orders.status', $status)
            ->orderBy('id', 'desc')
            ->paginate(12, ['*'], 'page', $page);
        return response()->json([$orders, 'count' => $count], 200);
    }
    public function listOfUser($Uid, $page)
    {
        $all = DB::table("orders")->where('user_id', $Uid)->get();
        $count = count($all);
        $orders = DB::table("orders")->where('user_id', $Uid)->orderBy('id', 'desc')->paginate(12, ['*'], 'page', $page);
        $data = [
            "status" => 200,
            'count' => $count,
            "message" => $orders,
        ];
        return response()->json($data, 200);
    }
    // create
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
                'status' => 'pending',
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
    // edit
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
    // del
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
}
