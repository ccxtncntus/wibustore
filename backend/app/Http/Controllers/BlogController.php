<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($page = 1)
    {
        $cart = DB::table('blogs')
            ->select('blogs.*', 'users.name')
            ->join('users', 'users.id', '=', 'blogs.user_id')->orderBy('blogs.id', 'DESC')
            ->where("blogs.active", true)
            ->paginate(4, ['*'], 'page', $page);
        return response()->json($cart, 200);
    }
    public function indexAdmin($page = 1)
    {
        $cart = DB::table('blogs')
            ->select('blogs.*', 'users.name')
            ->join('users', 'users.id', '=', 'blogs.user_id')->orderBy('blogs.active', 'ASC')
            ->orderBy('blogs.id', 'DESC')
            ->paginate(12, ['*'], 'page', $page);
        return response()->json($cart, 200);
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
    public function show($idblog)
    {
        $blog = DB::table('blogs')
            ->select('blogs.*', 'users.name')
            ->join('users', 'users.id', '=', 'blogs.user_id')
            ->where('blogs.id', $idblog)->get();
        return response()->json($blog, 200);
    }
    public function edit(Blog $blog)
    {
        //
    }

    public function updateActive($id)
    {
        $isActive = DB::table('blogs')->where('id', $id)->first();
        $checkActive = $isActive->active;
        $checkUpdate = DB::table('blogs')->where('id', $id)->update(
            [
                'active' =>  $checkActive ? false : true,
            ]
        );
        $data = [
            "status" => $checkUpdate ? 200 : 400,
            "message" => $checkUpdate ?  "update thành công" : "Có lỗi xảy ra",
        ];
        return response()->json($data, 200);
    }

    public function updatedefault(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
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
            $checkUpdate = DB::table('blogs')->where('id', $id)->update(
                [
                    'title' => $request->title,
                    'description' => $request->description,
                    'content' => $request->content
                ]
            );
            $data = [
                "status" => $checkUpdate ? 200 : 400,
                "message" => $checkUpdate ?  "update thành công" : "Có lỗi xảy ra",
            ];
            return response()->json($data, 200);
        }
    }


    public function updateHasImg(Request $request, $id)
    {
        if ($request->hasFile('img')) {
            $validator = Validator::make($request->all(), [
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
                $findImg = DB::table('blogs')->select('fimg')->where('blogs.id', $id)->first();
                $img = $findImg->fimg;
                $imagePath = public_path('uploads') . '/' . $img;
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
                // 
                $img = $request->file('img');
                $imgName = time() . '_' . $img->getClientOriginalName();
                $img->move(public_path('uploads'), $imgName);
                $checkUp = DB::table('blogs')
                    ->where('id', $id)
                    ->update(
                        [
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
                "status" => 400,
                "message" => "Không có file img",
            ];
            return response()->json($data, 200);
        }
    }



    public function destroy($idblog)
    {
        $findImg = DB::table('blogs')->select('fimg')->where('blogs.id', $idblog)->first();
        $img = $findImg->fimg;
        $imagePath = public_path('uploads') . '/' . $img;
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }
        $deleted = DB::table('blogs')->where('blogs.id', $idblog)->delete();
        $data = [
            "status" => $deleted ? 200 : 400,
            "message" => $deleted ? "Xóa thành công" : 'Có lỗi xảy ra',
        ];
        return response()->json($data, 200);
    }
}
