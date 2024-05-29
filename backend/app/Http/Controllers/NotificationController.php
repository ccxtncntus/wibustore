<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\testE;
use App\Events\commentEvent;

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
}
