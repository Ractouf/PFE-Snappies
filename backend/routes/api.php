<?php

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ToursController;
use App\Http\Controllers\TypicalToursController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// public routes
Route::post('/login', [UsersController::class, 'login']);

// user protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [UsersController::class, 'logout']);

    Route::get('/typicalTours', [TypicalToursController::class, 'index']);
    Route::get('/typicalTours/{id}', [TypicalToursController::class, 'show']);

    Route::get('/clients/{id}', [ClientsController::class, 'show']);

    Route::post('/tours', [ToursController::class, 'store']);
    Route::get('/tours/{id}', [ToursController::class, 'show']);
    Route::delete('/tours/{id}', [ToursController::class, 'destroy']);
});

// admin protected routes
Route::group(['middleware' => ['auth:sanctum', 'checkRole:admin']], function () {
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::get('/users/{id}', [UsersController::class, 'show']);
    Route::patch('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

    Route::post('/typicalTours', [TypicalToursController::class, 'store']);
    Route::patch('/typicalTours/{id}', [TypicalToursController::class, 'update']);
    Route::delete('/typicalTours/{id}', [TypicalToursController::class, 'destroy']);

    Route::get('/clients', [ClientsController::class, 'index']);
    Route::post('/clients', [ClientsController::class, 'store']);
    Route::patch('/clients/{id}', [ClientsController::class, 'update']);
    Route::delete('/clients/{id}', [ClientsController::class, 'destroy']);

    Route::get('/tours', [ToursController::class, 'index']);
    Route::patch('/tours/{id}', [ToursController::class, 'update']);
});

// tout CRUD d'un controller
// Route::resource('tours', TypicalTours::class);
