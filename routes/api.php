<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/search-iso', 'App\Http\Controllers\ISOController@search'); // rota teste
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
