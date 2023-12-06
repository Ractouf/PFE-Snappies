<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if ($request->user() && $request->user()->is_admin == ($role === 'admin')) {
            return $next($request);
        }

        return response([
            'message' => 'Unauthorized.'
        ], 403);
    }
}
