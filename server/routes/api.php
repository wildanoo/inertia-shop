<?php

use App\Http\Controllers\API\MediaController;
use App\Http\Controllers\API\RajaongkirController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/media', [MediaController::class, 'index']);
Route::post('/media', [MediaController::class, 'store']);
Route::delete('/media/{id}', [MediaController::class, 'destroy']);

Route::post('/rajaongkir/migration', [RajaongkirController::class, 'migration']);
Route::get('/rajaongkir/provinces', [RajaongkirController::class, 'provinces']);
Route::get('/rajaongkir/city/{id}', [RajaongkirController::class, 'city']);
