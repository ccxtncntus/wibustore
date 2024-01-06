<?php

namespace App\Http\Controllers;

use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;

class UpdateImg extends Controller
{
    public function upload(Request $request)
    {
        $images = $request->file('images');
        $uploadedImages = [];
        foreach ($images as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
            $uploadedImages[] = $imageName;
        }
        // return response()->json($uploadedImages);
        return $uploadedImages;
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
