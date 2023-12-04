<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Middleware CORS pour toutes les routes
Route::middleware('cors')->group(function () {
    // Gérer la requête OPTIONS pour toutes les routes
    Route::options('/{any}', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    })->where('any', '.*');

    // Routes avec le middleware 'auth:sanctum' et CORS
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/ping', function () {
            return response()->json(['response' => 'pong']);
        });
        // Ajoutez d'autres routes si nécessaire
    });
});

// ... Autres routes si nécessaire
