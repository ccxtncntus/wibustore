<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassMail;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            $user = User::where('email', $request->email)->first();
            if ($user) {
                $tokenConfirm = Str::upper(Str::random(6));
                $email = $request->email;
                DB::table('password_reset_tokens')->insert(
                    [
                        'email' => $email,
                        'token' => $tokenConfirm
                    ]
                );
                $mailData = [
                    "title" => "Mã xác nhận của bạn là :",
                    "pass" => $tokenConfirm,
                ];
                Mail::to($email)->send(new ForgotPassMail($mailData));
                $data = [
                    "status" => 200,
                    "message" => "Lấy mã xác nhận trong email",
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
