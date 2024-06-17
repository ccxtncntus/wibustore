<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\testE;
use App\Events\commentEvent;
use App\Events\test;
use App\Events\chatsEvent;
use App\Events\sendChat;

class NotificationController extends Controller
{
    public function sendNoti(Request $request)
    {
        event(new testE($request->username));
        return [];
    }
    public function comment(Request $request)
    {
        event(new commentEvent($request->username, $request->idProduct));
        return [];
    }
    public function test(Request $request)
    {
        event(new test($request->username));
        return [];
    }
}
