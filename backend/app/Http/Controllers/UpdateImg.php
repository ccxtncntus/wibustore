<?php

namespace App\Http\Controllers;

use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;

class UpdateImg extends Controller
{
    public function upload(Request $request)
    {
        if ($request->has('img')) {
            $images = $request->file('img');
            return response()->json($request->img);
            foreach ($images as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/img', $imageName);
                // Lưu tên file ảnh vào cơ sở dữ liệu hoặc thực hiện các thao tác khác
            }
            return response()->json('Upload nhiều ảnh thành công');
        } else {
            return response()->json('Không có ảnh được chọn');
        }
    }
    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
