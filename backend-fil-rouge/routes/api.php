<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyTagsController;
use App\Http\Controllers\AssetController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login/google', [AuthController::class, 'loginWithGoogle']);
Route::post('/login', [AuthController::class, 'login']);



Route::apiResource('users', UserController::class);
Route::post('/update-profile-image', [ImageController::class, 'updateProfileImage'])->name('update-profile-image');


Route::apiResource('regions', RegionController::class);
Route::apiResource('properties', PropertyController::class);
Route::apiResource('property-tags', PropertyTagsController::class);
Route::apiResource('assets', AssetController::class);