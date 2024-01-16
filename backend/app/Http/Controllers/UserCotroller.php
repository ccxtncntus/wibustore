<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Token;

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
            'user' => $user,
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
            $user = $token->tokenable;
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
