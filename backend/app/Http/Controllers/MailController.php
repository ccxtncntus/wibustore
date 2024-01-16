<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;

class MailController extends Controller
{
    public function index()
    {
        $mailData = [
            "title" => "test1",
            "body" => "test2",
        ];
        Mail::to('tuhvpk03455@fpt.edu.vn')->send(new DemoMail($mailData));
        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
