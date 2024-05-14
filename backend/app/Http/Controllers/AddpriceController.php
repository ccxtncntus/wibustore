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
        $add = DB::table('addprices')->where('product_id', $product_id)->get();
        // $users = DB::select('select * from addprices where product_id = ?', [$product_id]);
        return response()->json($add, 200);
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

    public function destroy($id)
    {
        $u = DB::table('addprices')->where('id', '=', $id)->delete();
        if ($u) {
            $data = [
                'status' => 200,
                'message' => 'Delete price success'
            ];
            return response($data, 200);
        } else {
            $data = [
                'status' => 400,
                'message' => 'Delete thất bại'
            ];
            return response($data, 200);
        }
    }

    public function edit(Request $request, $id)
    {
        $size = $request->size;
        $price = $request->price;
        $saleoff = $request->saleoff;
        $validator = Validator::make($request->all(), [
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
            $add = DB::table('addprices')->where('id', $id)->update([
                'size' => $size,
                'price' => $request->price,
                'saleoff' => $saleoff,
            ]);
            $data = [
                "status" => $add ? 200 : 400,
                "message" => $add ?  "Update thành công" : "Lỗi xảy ra",
            ];
            return response()->json($data, 200);
        }
    }
}
