<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $pageNumber = $request->pageNumber;
        $categorys = Category::select('id', 'name', 'status')->orderBy('id', 'DESC')->paginate(10, ['*'], 'page', $pageNumber);
        if ($categorys->count() === 0) {
            $upData = [
                "status" => 400,
                "message" => "There aren't any categories",
            ];
            return response()->json($upData, 400);
        } else {
            $data = [
                "status" => 200,
                "data" => $categorys,
            ];
            return response()->json($data, 200);
        }
    }
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:categories', 'max:255'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $categorys = new Category;
            $categorys->name = $request->name;
            $categorys->status = $request->status;
            $categorys->save();
            $data = [
                "status" => 200,
                "message" => "update thành công",
            ];
            return response()->json($data, 200);
        }
    }
    public function edit(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', Rule::unique('categories')->ignore($id), 'max:255'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $categorys = Category::find($id);
            $categorys->name = $request->name;
            $categorys->status = $request->status;
            $categorys->save();
            $data = [
                "status" => 200,
                "message" => "edit successfully",
            ];
            return response()->json($data, 200);
        }
    }
    public function delete($id)
    {
        if (Category::where('id', $id)->exists()) {
            $categorys = Category::find($id);
            $categorys->delete();
            $data = [
                "status" => 200,
                "message" => 'Delete successfully',
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => 'There aren not any categories',
            ];
            return response()->json($data, 400);
        }
    }
}
