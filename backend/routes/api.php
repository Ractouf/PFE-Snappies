<?php

use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// public routes
Route::get('/users/{id}', [UsersController::class, 'show']);
Route::post('/users', [UsersController::class, 'store']);
Route::post('/login', [UsersController::class, 'login']);

// user protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [UsersController::class, 'logout']);
});

// admin protected routes
Route::group(['middleware' => ['auth:sanctum', 'checkRole:admin']], function () {
    Route::get('/users', [UsersController::class, 'index']);
});

// tout CRUD d'un controller
// Route::resource('users', UsersController::class);
