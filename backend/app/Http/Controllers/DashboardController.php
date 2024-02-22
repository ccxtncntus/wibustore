<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = DB::table('users')->where('role', '<>', 'admin')->get();
        $products = DB::table('products')->get();
        $moneyToday = DB::table('orders')
            ->select(DB::raw('SUM(orders.totail) as total'))
            ->whereDate('created_at', '=', date('Y-m-d'))
            ->get();
        $moneyAll = DB::table('orders')
            ->select(DB::raw('SUM(orders.totail) as total'))
            ->get();
        if ($user) {
            $data = [
                "status" => 200,
                "countUser" => count($user),
                "countProducts" => count($products),
                "moneyToday" => $moneyToday,
                "moneyAll" => $moneyAll,
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => "Lỗi",
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getBest()
    {
        // $bestUser = DB::table('orders')
        //     ->select(DB::raw('SUM(order_details.price) as total'))
        //     ->get();
        $bestUser = DB::table('orders')
            ->select(DB::raw('SUM(orders.totail) as totail'), 'users.name')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->groupBy('orders.user_id', 'users.name')
            ->orderBy('totail', 'desc')
            ->limit(1)
            ->get();
        $productsBest = DB::table('products')->select('id', 'name', "bought")->orderBy('bought', 'DESC')->first();

        $data = [
            "status" => 200,
            "bestUser" => $bestUser,
            "productsBest" => $productsBest,
        ];
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function getData()
    {
        $dataLast7Days = [];
        for ($i = 0; $i < 7; $i++) {
            $day = date('Y-m-d', strtotime("-$i day"));
            $moneyYesterday = DB::table('orders')
                ->select(DB::raw('SUM(totail) as total'))
                ->whereDate('created_at', '=', $day)
                ->get();

            $dataLast7Days[] = [
                'date' => $day,
                'total' => $moneyYesterday,
            ];
        }

        $dataLast12Months = [];
        for ($i = 0; $i <= 11; $i++) {
            // Lấy ngày đầu tiên và cuối cùng của tháng
            $firstDayOfMonth = date('Y-m-01', strtotime("-$i month"));
            $lastDayOfMonth = date('Y-m-t', strtotime("-$i month"));
            $monthlyData = DB::table('orders')
                ->select(DB::raw('SUM(totail) as total'))
                ->whereBetween('created_at', [$firstDayOfMonth, $lastDayOfMonth])
                ->get();
            $dataLast12Months[] = [
                'month' => date('F', strtotime($firstDayOfMonth)), // Tên của tháng
                'year' => date('Y', strtotime($firstDayOfMonth)), // Năm
                'total' => $monthlyData,
            ];
        }
        $data = [
            "status" => 200,
            "dataLast7Days" => $dataLast7Days,
            "dataLast12Months" => $dataLast12Months,
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
}
