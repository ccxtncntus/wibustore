<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $address = DB::table('address_modals')->where('user_id', '=', $id)->orderBy('status', 'DESC')->get();
        return response()->json($address, 200);
    }

    public function getDefault($id)
    {
        $address = DB::table('address_modals')->where('user_id', '=', $id)->where('status', '=', 1)->orderBy('status', 'DESC')->get();
        return response()->json($address, 200);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'name' => ['required'],
            'phone' => ['required'],
            'tinh' => ['required'],
            'huyen' => ['required'],
            'xa' => ['required'],
            'district_id' => ['required'],
            'ward_code' => ['required'],
            'address' => ['required'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $address = DB::table('address_modals')->where('user_id', '=', $id)->get();
            count($address) > 0 ? $status = 0 : $status = 1;
            $add = DB::table('address_modals')->insert([
                'user_id' => $request->user_id,
                'name' => $request->name,
                'phone' => $request->phone,
                'tinh' => $request->tinh,
                'huyen' => $request->huyen,
                'xa' => $request->xa,
                'status' => $status,
                'district_id' => $request->district_id,
                'ward_code' => $request->ward_code,
                'address' => $request->address,
            ]);
            if ($add) {
                $data = [
                    "status" => 200,
                    "message" => "Add thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Lỗi xảy ra",
                ];
                return response()->json($data, 200);
            }
        }
    }
    public function delete($id)
    {
        $u = DB::table('address_modals')->where('id', '=', $id)->delete();
        if ($u) {
            $data = [
                'status' => 200,
                'message' => 'Delete success'
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
    public function updatePatch(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone' => ['required'],
            'address' => ['required'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $add = DB::table('address_modals')->where('id', $id)->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
            if ($add) {
                $data = [
                    "status" => 200,
                    "message" => "Update thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Lỗi xảy ra",
                ];
                return response()->json($data, 200);
            }
        }
    }

    public function updatePut(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'phone' => ['required'],
            'tinh' => ['required'],
            'huyen' => ['required'],
            'xa' => ['required'],
            'district_id' => ['required'],
            'ward_code' => ['required'],
            'address' => ['required'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $add = DB::table('address_modals')->where('id', $id)->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'tinh' => $request->tinh,
                'huyen' => $request->huyen,
                'xa' => $request->xa,
                'district_id' => $request->district_id,
                'ward_code' => $request->ward_code,
                'address' => $request->address,
            ]);
            if ($add) {
                $data = [
                    "status" => 200,
                    "message" => "update all thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Lỗi xảy ra",
                ];
                return response()->json($data, 200);
            }
        }
    }
    public function updateDefault($id, $idUser)
    {
        DB::table('address_modals')->where('user_id', '=', $idUser)->update([
            'status' => 0,
        ]);
        $once = DB::table('address_modals')->where('id', $id)->update([
            'status' => 1,
        ]);
        if ($once) {
            $data = [
                "status" => 200,
                "message" => "update default thành công",
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => "Lỗi xảy ra",
            ];
            return response()->json($data, 200);
        }
    }
}
