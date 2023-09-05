<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
{
    $allowedOrigins = ['https://pt.wikipedia.org/wiki/ISO_4217', 'example1.com', 'example2.com'];
    $origin = $request->header('Origin');
    
    if (in_array($origin, $allowedOrigins)) {
        return $next($request)
            ->header('Access-Control-Allow-Origin', $origin)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    return $next($request);
}
}
