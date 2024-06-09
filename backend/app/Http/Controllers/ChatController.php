<?php

namespace App\Http\Controllers;

use App\Models\chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ChatDetailController;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chatAll = Chat::join('users', 'users.id', '=', 'chats.user_id')
            ->select('users.name', 'users.email', 'users.id as user_id', 'chats.isread')
            ->orderBy("chats.isread", "DESC")
            ->get();;
        return response()->json($chatAll, 200);
    }
    public function indexUser($user_id)
    {
        $chatFind = Chat::where("user_id", "=", $user_id)->first();
        if (!$chatFind) {
            $chat = new chat;
            $chat->user_id = $user_id;
            $chat->save();
            $data = [
                "status" => 200,
                "message" => "Không tồn tại người dùng",
            ];
            return response()->json($data, 200);
        }
        $chatAll = new ChatDetailController();
        $data = $chatAll->indexUser($chatFind->id);
        return response()->json($data, 200);
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
        $user_id = $request->user_id;
        $validator = Validator::make(
            $request->all(),
            [
                'user_id' => ['required'],
            ],
            [
                'user_id.required' => 'Thiếu user_id',
            ]
        );
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $chatFind = Chat::where("user_id", "=", $user_id)->first();
            if (!$chatFind) {
                $chat = new chat;
                $chat->user_id = $user_id;
                $chat->save();
                $data = [
                    "status" => 200,
                    "message" => "Tạo thành công",
                ];
                return response()->json($chat->id, 200);
            }
            return response()->json($chatFind->id, 200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(chat $chat)
    {
        //
    }
}
