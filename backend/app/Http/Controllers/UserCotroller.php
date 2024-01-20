<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Token;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return User::all();
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->select('id', 'email', 'name', 'password')->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'status' => 400,
                'message' => 'Sai email hoặc mật khẩu',
            ], 200);
        }
        $token = $user->createToken('wibu_token')->plainTextToken;
        $response = [
            'status' => 200,
            // 'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function authentication(Request $request)
    {
        $bearerToken = $request->token;
        $token = PersonalAccessToken::findToken($bearerToken);
        if (!$token) {
            $data = [
                'status' => 400,
                'data' => 'token not found'
            ];
            return response($data, 201);
        } else {
            $user = [
                'id' => $token->tokenable->id ?? null,
                'name' => $token->tokenable->name ?? null,
                'role' => $token->tokenable->role ?? null,
                'email' => $token->tokenable->email ?? null,
            ];
            $data = [
                'status' => 200,
                'data' =>  $user
            ];
            return response($data, 201);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function logout(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $sucess = $user->tokens()->delete();
            if ($sucess) {
                return response('Xóa token thành công', 201);
            }
        } else {
            return response('NG', 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:users', 'max:255', 'email'],
            "name" => ['required'],
            "password" =>  ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->name === 'admin' ? 'admin' : 'user';
            $user->password =
                Hash::make($request->password);
            $user->save();
            $data = [
                "status" => 200,
                "message" => "Đăng kí thành công",
            ];
            return response()->json($data, 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function changePass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'max:255', 'email'],
            "passwordOld" =>  ['required'],
            "password" =>  ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $user = User::where('email', $request->email)->first();
            if ($user) {
                if (!Hash::check($request->passwordOld, $user->password)) {
                    $data = [
                        "status" => 400,
                        "message" => "Sai mật khẩu hoặc email",
                    ];
                    return response()->json($data, 200);
                }
                $user->password =
                    Hash::make($request->password);
                $user->save();
                $data = [
                    "status" => 200,
                    "message" => "Đổi mật khẩu thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Sai emal hoặc mật khẩu",
                ];
                return response()->json($data, 200);
            }
        }
    }

    public function checkTokenConfirm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'token' => 'required',
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 200);
        } else {
            $user = DB::table('password_reset_tokens')
                ->select('email', 'token')
                ->where('email', $request->email)
                ->where('token', $request->token)->first();
            if ($user) {
                $data = [
                    "status" => 200,
                    "message" => $user,
                ];
                return response()->json($data, 200);
            }
            $data = [
                "status" => 400,
                "message" => 'Nobody',
            ];
            return response()->json($data, 200);
        }
    }
    public function delTokenConfirm(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'email' => 'required|email|max:255',
        //     'token' => 'required',
        // ]);
        // if ($validator->fails()) {
        //     $data = [
        //         "status" => 400,
        //         "message" => $validator->errors()->first(),
        //     ];
        //     return response()->json($data, 200);
        // } 
        $user = DB::table('password_reset_tokens')
            ->select('email', 'token')
            ->where('email', $request->email)
            ->where('token', $request->token)->delete();
        if ($user) {
            $data = [
                "status" => 200,
                "message" => 'Xóa token confirm thành công',
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                "status" => 400,
                "message" => 'Lỗi xóa token confirm',
            ];
            return response()->json($data, 200);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }
}
