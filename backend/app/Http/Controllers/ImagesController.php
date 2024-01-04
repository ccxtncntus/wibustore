<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Images;

class ImagesController extends Controller
{
    public function index()
    {
        return '123';
    }
    public function upload(Request $request, $id)
    {
        if ($request->has('img') && is_array($request->img) && count($request->img) > 0) {
            $allAdd = [];
            foreach ($request->img as $item) {
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
