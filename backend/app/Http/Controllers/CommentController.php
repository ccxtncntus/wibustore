<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class CommentController extends Controller
{
    public function indexlimit()
    {
        $comments = Comment::orderByDesc('id')
            ->limit(5)
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', 'users.name as user_name')
            ->get();
        return response()->json($comments, 200);
    }
    public function index()
    {
        $comments = Comment::orderByDesc('id')
            ->limit(20)
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', 'users.name as user_name')
            ->get();
        return response()->json($comments, 200);
    }

    public function indexlimitP($id)
    {
        $comments = Comment::where('comments.product_id', '=', $id)
            ->orderByDesc('id')
            ->limit(5)
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', 'users.name as user_name')
            ->get();
        return response()->json($comments, 200);
    }
    public function indexP($id)
    {
        $comments = Comment::where('comments.product_id', '=', $id)
            ->orderByDesc('id')
            ->limit(20)
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->select('comments.*', 'users.name as user_name')
            ->get();
        return response()->json($comments, 200);
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'product_id' => ['required'],
            "comments" => ['required'],
            "stars" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        }
        if ($request->hasfile('imgs')) {
            $images = $request->file('imgs');
            $uploadedImages = [];
            foreach ($images as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads'), $imageName);
                $uploadedImages[] = $imageName;
            }
            $comment = new Comment;
            $comment->user_id = $request->user_id;
            $comment->product_id = $request->product_id;
            $comment->comments = $request->comments;
            $comment->stars = $request->stars;
            $comment->imgs = json_encode($uploadedImages);
            $check = $comment->save();
            $data = [
                "status" => $check ? 200 : 400,
                "message" => $check ? 'Comment có img' : 'Có lỗi xảy ra',

            ];
            return response()->json($data, 200);
        }
        $comment = new Comment;
        $comment->user_id = $request->user_id;
        $comment->product_id = $request->product_id;
        $comment->comments = $request->comments;
        $comment->stars = $request->stars;
        $check = $comment->save();
        $data = [
            "status" => $check ? 200 : 400,
            "message" => $check ? 'Comment không có img' : 'Có lỗi xảy ra',

        ];
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'recomments' => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        }
        $comment = Comment::find($id);
        $comment->recomments = $request->recomments;
        $check = $comment->save();
        $data = [
            "status" => $check ? 200 : 400,
            "message" => $check ? 'Phản hồi thành công' : 'Có lỗi xảy ra',
        ];
        return response()->json($data, 200);
    }




    public function show(Comment $comment)
    {
        //
    }


    public function edit(Comment $comment)
    {
        //
    }



    public function destroy($id)
    {
        $comment = Comment::where('id', '=', $id)->firstOr();
        if ($comment->imgs) {
            $array = json_decode($comment->imgs, true);
            foreach ($array as $img) {
                $imagePath = public_path('uploads') . '/' . $img;
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }
            $check = $comment->delete();
            $data = [
                "status" => $check ? 200 : 400,
                "message" => $check ? "Xóa thành công" : 'Có lỗi xảy ra khi xóa',

            ];
            return response()->json($data, 200);
        }
        $check =   $comment->delete();
        $data = [
            "status" => $check ? 200 : 400,
            "message" => $check ? "Xóa thành công" : 'Có lỗi xảy ra khi xóa',

        ];
        return response()->json($data, 200);
    }
}
