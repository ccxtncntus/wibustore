<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return 1;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->hasFile('img')) {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
                'title' => 'required',
                'description' => 'required',
                'content' => 'required'
            ]);
            if ($validator->fails()) {
                $data = [
                    "status" => 400,
                    "message" => $validator->errors()->first(),
                ];
                return response()->json($data, 400);
            } else {
                $img = $request->file('img');
                $imgName = time() . '_' . $img->getClientOriginalName();
                $img->move(public_path('uploads'), $imgName);
                $checkUp = DB::table('blogs')->insert(
                    [
                        'user_id' => $request->user_id,
                        'title' => $request->title,
                        'fimg' => $imgName,
                        'description' => $request->description,
                        'content' =>  $request->content,
                    ]
                );
                $data = [
                    "status" => $checkUp ? 200 : 400,
                    "message" => $checkUp ?  "update thành công" : "Có lỗi xảy ra",
                ];
                return response()->json($data, 200);
            }
        } else {
            $data = [
                "status" => 200,
                "message" => "Không có file img",
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
