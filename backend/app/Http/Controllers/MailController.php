<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassMail;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class MailController extends Controller
{
    public function mailPass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'max:255', 'email'],
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
                $newPass = Str::upper(Str::random(6));
                $user->password =
                    Hash::make($newPass);
                $user->save();
                $email = $request->email;
                $mailData = [
                    "title" => "Thông tin Mật khẩu Mới cho Tài Khoản Của Bạn",
                    "body" => "Mật khẩu mới của bạn là :",
                    "pass" => $newPass,
                ];
                Mail::to($email)->send(new ForgotPassMail($mailData));
                $data = [
                    "status" => 200,
                    "message" => "Kiểm tra mật khẩu mới trong email",
                ];
                return response()->json($data, 200);
            } else {
                $data = [
                    "status" => 400,
                    "message" => "Email không hợp lệ",
                ];
                return response()->json($data, 200);
            }
        }
    }
}
