<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Images;

class ImagesController extends Controller
{
    public function index($product_id)
    {
        $images = Images::where('product_id', $product_id)->get();
        return response()->json($images);
    }
    public function deleteOnce($id)
    {
        $image = Images::find($id);
        if ($image) {
            $image->delete();
            $data = [
                "status" => 200,
                "message" => "del success",
            ];
            return response()->json($data, 200);
        }
        $data = [
            "status" => 400,
            "message" => "no img",
        ];
        return response()->json($data, 200);
    }

    public function upload($uploadSuccess, $id)
    {
        if (count($uploadSuccess) > 0) {
            $allAdd = [];
            foreach ($uploadSuccess as $item) {
                $image = new Images;
                $image->url = $item;
                $image->product_id = $id;
                $allAdd[] = $image->attributesToArray();
            }
            Images::insert($allAdd);
            return response()->json('Đăng hình thành công');
        } else {
            return response()->json('Không có hình ảnh');
        }
    }
    public function delete($product_id)
    {
        $images = Images::where('product_id', $product_id)->get();

        if ($images->count() > 0) {
            $images = Images::where('product_id', $product_id)->delete();
            return response()->json('Đã xóa img', 200);
        } else {
            return response()->json('Không có img', 200);
        }
    }
}
