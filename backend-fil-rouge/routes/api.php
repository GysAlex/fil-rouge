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
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\OwnerLoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PropertyDetailsController;
use App\Http\Controllers\PropertyDetailsPublicController;
use App\Http\Controllers\SearchController;




Route::get('/user', function (Request $request) {
    return $request->user()->load('roles');
})->middleware('auth:sanctum');

Route::post('/login/google', [AuthController::class, 'loginWithGoogle']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



Route::apiResource('users', UserController::class);
Route::post('/update-profile-image', [ImageController::class, 'updateProfileImage'])->name('update-profile-image');


Route::apiResource('regions', RegionController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('properties', PropertyController::class); // Protéger les routes properties
});

Route::apiResource('property-tags', PropertyTagsController::class);
Route::apiResource('assets', AssetController::class);


/* Owner routes */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/owner/dashboard', [OwnerController::class, 'getDashboardData']);
    Route::put('/owner/properties/{property}/status', [OwnerController::class, 'updatePropertyStatus']);
    Route::put('/properties/{property}/toggle-published', [OwnerController::class, 'togglePublished']);
    Route::get('/owner/search/properties', [OwnerController::class, 'searchProperties']);
    Route::get('/owner/search/tenants', [OwnerController::class, 'searchTenants']);
    Route::get('/owner/properties', [OwnerController::class, 'getOwnerProperties']);
});


/*handle contracts*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/owner/properties/{property}/favorites', [ContractController::class, 'getFavorites']);
    Route::post('/owner/contracts', [ContractController::class, 'store']);
    Route::put('/owner/contracts/{contractId}/status', [ContractController::class, 'updateStatus']);
});

Route::prefix('owners')->group(function () {
    Route::post('/register', [OwnerLoginController::class, 'registerOwner']);
    Route::post('/login', [OwnerLoginController::class, 'loginOwner']);
    Route::post('/confirm-email', [OwnerLoginController::class, 'confirmEmail'])->middleware('auth:sanctum');
});

/*For the homepage */
Route::get('/home', [HomeController::class, 'getUniversitiesWithProperties']);

/*Handlnig detail home page */
Route::middleware('auth:sanctum')->group(function () {
    // ...existing routes...
    Route::get('/owner/properties/{property}/details', [PropertyDetailsController::class, 'getPropertyDetails']);
});

/*This is the route for details */
Route::get('/properties/{id}/details', [PropertyDetailsPublicController::class, 'getPropertyDetails']);

Route::get('/properties/search/{university}', [SearchController::class, 'getAllProperties']);