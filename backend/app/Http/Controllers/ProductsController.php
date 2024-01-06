<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\UpdateImg;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $pageNumber = $request->pageNumber;
        $products = Products::paginate(10, ['*'], 'page', $pageNumber);
        if ($products->count() === 0) {
            $upData = [
                "status" => 400,
                "message" => "There aren't any products",
            ];
            return response()->json($upData, 400);
        } else {
            $data = [
                "status" => 200,
                "data" => $products,
            ];
            return response()->json($data, 200);
        }
    }
    public function upload(Request $request)
    {
        $price = $request->price;
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:products', 'max:255'],
            "category_id" => ['required'],
            "description" =>  ['required'],
            "quantity" => ['numeric', 'min:1'],
            "price" =>  ['numeric', 'min:1'],
            "saleoff" => ['nullable', 'numeric', 'min:0', function ($attribute, $value, $fail) use ($price) {
                if (!empty($value) && $value >= $price) {
                    $fail('The saleoff must be less than the price.');
                }
            },],
            "status" => ['required', 'max:100'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $products = new Products;
            $products->name = $request->name;
            $products->category_id = $request->category_id;
            $products->description = $request->description;
            $products->quantity = $request->quantity;
            $products->price = $request->price;
            $products->saleoff = $request->saleoff;
            $products->status = $request->status;
            $products->save();
            $lastInsertId = $products->id;

            // test tải img lên server
            $upImgInserve = new UpdateImg();
            $uploadSuccess = $upImgInserve->upload($request);
            // tải img
            $imagesController = new ImagesController();
            $uploadResult = $imagesController->upload($uploadSuccess, $lastInsertId);

            $data = [
                "status" => 200,
                "lastID" => $lastInsertId,
                "dataImg" => $uploadResult->original,
                "message" => "update thành công",
            ];
            return response()->json($data, 200);
        }
    }

    public function show(string $id)
    {
        $products = Products::find($id);
        $imagesController = new ImagesController();
        $uploadResult = $imagesController->delete($id);
        if ($products->count() === 0) {
            $upData = [
                "status" => 400,
                "message" => "Không tồn tại",
            ];
            return response()->json($upData, 400);
        } else {
            $data = [
                "status" => 200,
                "data" => $products,
                "img" => $uploadResult->original,
            ];
            return response()->json($data, 200);
        }
    }

    public function edit(Request $request, string $id)
    {
        $price = $request->price;
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('products')->ignore($id), 'max:255'
            ],
            "category_id" => ['required'],
            "description" =>  ['required'],
            "quantity" => ['numeric', 'min:1'],
            "price" =>  ['numeric', 'min:1'],
            "saleoff" => ['nullable', 'numeric', 'min:1', function ($attribute, $value, $fail) use ($price) {
                if (!empty($value) && $value >= $price) {
                    $fail('The saleoff must be less than the price.');
                }
            },],
            "status" => ['required', 'max:100'],
        ]);

        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        }
        // return response()->json($request, 200);
        else {
            $products = Products::find($id);
            $products->name = $request->name;
            $products->category_id = $request->category_id;
            $products->description = $request->description;
            $products->quantity = $request->quantity;
            $products->price = $request->price;
            $products->saleoff = $request->saleoff;
            $products->status = $request->status;
            $products->save();
            $data = [
                "status" => 200,
                "message" => "edit thành công",
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function sreach(string $id)
    {
        // BookingDates::where('email', Input::get('email'))
        //     ->orWhere('name', 'like', '%' . Input::get('name') . '%')->get();

        // public function scopeWhereLike($query, $column, $value)
        // {
        //     return $query->where($column, 'like', '%' . $value . '%');
        // }

    }
}
