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
    public function index($page)
    {
        $count = count(User::all());
        $list = User::orderBy('id', 'desc')->paginate(12, ['*'], 'page', $page);
        $data = [
            'status' => 200,
            'count' => $count,
            'list' => $list
        ];
        return response($data, 201);
    }
    public function listUserStatus($role, $page)
    {
        $count = count(User::where('role', $role)->get());
        $list = User::where('role', $role)->orderBy('id', 'desc')->paginate(12, ['*'], 'page', $page);
        $data = [
            'status' => 200,
            'count' => $count,
            'list' => $list
        ];
        return response($data, 201);
    }
    public function changeRole(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            "role" => ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $id = $request->id;
            $role = $request->role;
            $u = User::find($id);
            $u->role = $role;
            $saves = $u->save();
            if ($saves) {
                $data = [
                    'status' => 200,
                    'message' => 'Update success'
                ];
                return response($data, 200);
            } else {
                $data = [
                    'status' => 400,
                    'message' => 'Update thất bại'
                ];
                return response($data, 200);
            }
        }
    }
    public function delUser($id)
    {
        $u = User::find($id)->delete();
        if ($u) {
            $data = [
                'status' => 200,
                'message' => 'Delete success'
            ];
            return response($data, 200);
        } else {
            $data = [
                'status' => 400,
                'message' => 'Delete thất bại'
            ];
            return response($data, 200);
        }
    }
    // creatu admin
    public function registerOfAd(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:users', 'max:255', 'email'],
            "name" => ['required'],
            "password" =>  ['required'],
            "role" =>  ['required'],
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
            $user->role = $request->role;
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
    public function editOfAd(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            "password" =>  ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $user = User::find($request->id);
            $user->password =
                Hash::make($request->password);
            $user->save();
            $data = [
                "status" => 200,
                "message" => "Edit thành công thành công",
            ];
            return response()->json($data, 200);
        }
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


    public function loginGG(Request $request)
    {

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $passWord = '';
        for ($i = 0; $i < 30; $i++) {
            $passWord .= $characters[random_int(0, $charactersLength - 1)];
        }
        $user = User::where('email', $request->email)->select('id', 'email', 'name', 'password')->first();
        if (!$user) {
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = 'user';
            $user->password =
                Hash::make($passWord);
            $user->save();
            $token = $user->createToken('wibu_token')->plainTextToken;
            $data = [
                "status" => 200,
                'mgs' => "Tài khoản đăng ký mới",
                "token" => $token,
            ];
            return response()->json($data, 200);
        }
        $token = $user->createToken('wibu_token')->plainTextToken;
        $response = [
            'status' => 200,
            'mgs' => "Tài khoản đã đăng ký",
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
            $user->role = $request->email === 'ccxtncn00@gmail.com' ? 'admin' : 'user';
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

    public function changePassWithToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'max:255', 'email'],
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
    public function changeName(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "name" =>  ['required'],
        ]);
        if ($validator->fails()) {
            $data = [
                "status" => 400,
                "message" => $validator->errors()->first(),
            ];
            return response()->json($data, 400);
        } else {
            $user = DB::table('users')->where('id', $id)->update([
                'name' => $request->name,
            ]);
            if ($user) {
                $data = [
                    "status" => 200,
                    "message" => "Cập nhật tài khoản thành công",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Lỗi khi cập nhật tài khoản",
                ];
                return response()->json($data, 200);
            }
        }
    }
    public function destroy(string $id)
    {
    }
}
