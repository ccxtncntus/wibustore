<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class SlidersController extends Controller
{
    public function index()
    {
        $all = DB::table('sliders')->select('id', 'img', 'title', 'content', 'path')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($all, 200);
    }

    public function upload($img, $title, $content, $path)
    {
        $slider  = DB::table('sliders')->insert([
            'img' => $img,
            'title' => $title,
            'content' => $content,
            'path' => $path,
        ]);
        if ($slider) {
            $data = [
                "status" => 200,
                "message" => "update thành công",
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => "update thất bại",
            ];
            return response()->json($data, 200);
        }
    }
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            "title" => ['required'],
            "content" =>  ['required'],
            "path" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $title = $request->title;
            $content = $request->content;
            $path = $request->path;
            if ($request->hasFile('img')) {
                $images = $request->img;
                $imageName = time() . '_' . $images->getClientOriginalName();
                $images->move(public_path('uploads'), $imageName);
                return $this->upload($imageName, $title, $content, $path);
            } else {
                return 400;
            }
        }
    }
    public function delSlider($id)
    {
        $del = DB::table('sliders')->where('id', $id)->delete();
        if ($del) {
            $data = [
                "status" => 200,
                "message" => "delete success",

            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => "delete thất bại",
            ];
            return response()->json($data, 200);
        }
    }

    public function editSlider($idEdit, $img, $title, $content, $path)
    {
        if ($img) {
            $slider = DB::table('sliders')
                ->where('id', $idEdit)
                ->update([
                    'img' => $img,
                    'title' => $title,
                    'content' => $content,
                    'path' => $path,
                ]);
            if ($slider) {
                $data = [
                    "status" => 200,
                    "message" => "edit thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "edit thất bại",
                ];
                return response()->json($data, 200);
            }
        } else {
            return 1;
        }
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idEdit' => 'required',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            "title" => ['required'],
            "content" =>  ['required'],
            "path" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {

            $imagePath = public_path('uploads') . '/' . $request->imgOld;
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
            // ------------------------------------------------------
            $title = $request->title;
            $idEdit = $request->idEdit;
            $content = $request->content;
            $path = $request->path;
            if ($request->hasFile('img')) {
                $images = $request->img;
                $imageName = time() . '_' . $images->getClientOriginalName();
                $images->move(public_path('uploads'), $imageName);
                return $this->editSlider($idEdit, $imageName, $title, $content, $path);
            } else {
                return 400;
            }
        }
    }
    public function editNoImg(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idEdit' => 'required',
            "title" => ['required'],
            "content" =>  ['required'],
            "path" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            // ------------------------------------------------------
            $title = $request->title;
            $idEdit = $request->idEdit;
            $content = $request->content;
            $path = $request->path;
            $imageName = false;
            return $this->editSlider($idEdit, $imageName, $title, $content, $path);
        }
    }
}
