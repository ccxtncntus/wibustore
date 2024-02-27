<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\testE;

class NotificationController extends Controller
{
    public function sendNoti(Request $request)
    {
        event(new testE($request->username));
        return [];
    }
}
