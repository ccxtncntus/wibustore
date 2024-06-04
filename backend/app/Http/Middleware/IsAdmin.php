<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json("Bạn chưa đăng nhập", 400);
        }
        $tokens = PersonalAccessToken::findToken($token);
        if (!$tokens) {
            return response()->json("Bạn chưa đăng nhập", 400);
        }
        if ($tokens->tokenable->role == 'admin') {
            return $next($request);
        }
        return response()->json("Bạn không phải admin", 403);
    }
}
