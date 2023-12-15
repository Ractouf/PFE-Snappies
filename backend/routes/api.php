<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\BoxesController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ClientsToursController;
use App\Http\Controllers\ToursController;
use App\Http\Controllers\TypicalToursController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ToursBoxesClientsController;
use Illuminate\Support\Facades\Route;

// public routes
Route::post('/login', [UsersController::class, 'login']);
Route::get('/tours/available', [ToursController::class, 'getAvailableTour']);


// user protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [UsersController::class, 'logout']);

    Route::get('/typicalTours', [TypicalToursController::class, 'index']);
    Route::get('/typicalTours/{name}', [TypicalToursController::class, 'showByName']);

    Route::post('/tours', [ToursController::class, 'store']);
    Route::get('/tours/{id}', [ToursController::class, 'show']);
    Route::get('/tours/{date}/{driverId}', [ToursController::class, 'showByDateAndDriver']);
    Route::delete('/tours/{id}', [ToursController::class, 'destroy']);

    Route::post('/tours/{typicalTourId}/{tourId}', [ToursBoxesClientsController::class,'createRow']);
    Route::get('/toursBoxes/{tourId}', [ToursBoxesClientsController::class, 'getTour']);
    Route::post('/toursBoxes/{tourId}/{clientId}', [ToursBoxesClientsController::class, 'markBoxesAsDelivered']);

    Route::get('/articles', [ArticlesController::class, 'index']);
});

// admin protected routes
Route::group(['middleware' => ['auth:sanctum', 'checkRole:admin']], function () {
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::get('/users/{id}', [UsersController::class, 'show']);
    Route::patch('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

    Route::get('/typicalTours', [TypicalToursController::class, 'getAll']);
    Route::post('/typicalTours', [TypicalToursController::class, 'store']);
    Route::patch('/typicalTours/{id}', [TypicalToursController::class, 'update']);
    Route::delete('/typicalTours/{id}', [TypicalToursController::class, 'destroy']);

    Route::resource('clients', ClientsController::class);

    Route::get('/tours', [ToursController::class, 'index']);
    Route::patch('/tours/{id}', [ToursController::class, 'update']);


    Route::post('/clientsTours', [ClientsToursController::class, 'store']);
    Route::patch('/clientsTours/{id}', [ClientsToursController::class, 'update']);
    Route::get('/clientsTours/getByClientId/{clientId}', [ClientsToursController::class, 'getByClientId']);
    Route::delete('/clientsTours/{id}', [ClientsToursController::class, 'destroy']);
    Route::delete('/clientsTour/deleteIfExists/{id}', [ClientsToursController::class, 'deleteIfExists']);

    Route::post('/articles', [ArticlesController::class, 'store']);
    Route::get('/articles/{id}', [ArticlesController::class, 'show']);
    Route::patch('/articles/{id}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{id}', [ArticlesController::class, 'destroy']);

    Route::resource('boxes', BoxesController::class);
});

// tout CRUD d'un controller
// Route::resource('tours', TypicalTours::class);
