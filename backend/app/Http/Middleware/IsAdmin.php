<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // if (Auth::user() &&  Auth::user()->role == 'admin') {
        //     return $next($request);
        // }
        if (Auth::check() && Auth::user()->role == 'admin') {
            // Người dùng đã đăng nhập và có vai trò là admin
            return $next($request);
        } else {
            // return response()->json(['error' => 'You is not Admin!!!'], 403);
            return response()->json(['name' => Auth::user()->role], 403);
        }
    }
}
