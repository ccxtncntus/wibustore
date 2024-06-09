<?php

namespace App\Http\Controllers;

use App\Models\chatDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function indexUser($chat_id)
    {
        $chatall = chatDetail::where("chat_id", "=", $chat_id)->orderBy("id", "ASC")->get();
        return response()->json($chatall, 200);
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
        $validator = Validator::make(
            $request->all(),
            [
                'user_id' => ['required'],
                'chat_id' => ['required'],
            ],
            [
                'user_id.required' => 'Thiếu user_id',
                'chat_id.required' => 'Thiếu chat_id',
            ]
        );
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            if ($request->hasfile('imgs')) {
                $images = $request->file('imgs');
                $uploadedImages = [];
                foreach ($images as $image) {
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('uploads'), $imageName);
                    $uploadedImages[] = $imageName;
                }
                $chatDetail = new chatDetail;
                $chatDetail->user_id = $request->user_id;
                $chatDetail->chat_id = $request->chat_id;
                $chatDetail->role = $request->has('role') ? $request->role : false;
                $chatDetail->imgs = json_encode($uploadedImages);
                $check = $chatDetail->save();
                $data = [
                    "status" => $check ? 200 : 400,
                    "message" => $check ? 'chat có img' : 'Có lỗi xảy ra',

                ];
                return response()->json($data, 200);
            }
            $chatDetail = new chatDetail;
            $chatDetail->user_id = $request->user_id;
            $chatDetail->chat_id = $request->chat_id;
            $chatDetail->text = $request->text;
            $chatDetail->role = $request->has('role') ? $request->role : false;
            $check = $chatDetail->save();
            $data = [
                "status" => $check ? 200 : 400,
                "message" => $check ? 'Chat k có img' : 'Có lỗi xảy ra',

            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(chatDetail $chatDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(chatDetail $chatDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, chatDetail $chatDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(chatDetail $chatDetail)
    {
        //
    }
}
