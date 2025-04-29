<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleRenterAuthController;
use App\Http\Controllers\FacebookRenterAuthController;
use App\Http\Controllers\AuthController;
use App\Models\Region;
use App\Models\University;
use App\Models\PropertyTags;
use App\Models\Asset;


Route::get('/', function () {
    return view('welcome');
});


Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // User authenticated successfully
        return response()->json([
            'message' => 'Login successful!',
        ]);
    } else {
        return response()->json([
            'message' => 'Invalid login credentials!',
        ], 401);
    }
});

Route::get('/auth/google/redirect', [
    GoogleRenterAuthController::class,
    'redirectToGoogle'
])->name('google.redirect');

Route::get('/auth/google/callback', [
    GoogleRenterAuthController::class,
    'handleGoogleCallback'
])->name('google.callback');


Route::get('/auth/facebook/redirect', [
    FacebookRenterAuthController::class,
    'redirectToFacebook'
])->name('facebook.redirect');

Route::get('/auth/facebook/callback', [
    FacebookRenterAuthController::class,
    'handleFacebookCallback'
])->name('facebook.callback');


// Route::get('/university', function () {
//     $region = Region::where('region_name', 'yaounde')->first();

//     University::create([
//         'universitie_name' => 'ENS de yaounde',
//         'region_id' => $region->id
//     ]);

//     return "Ca marche !";
// });


// Route::get('/createAsset', function () {

//     $tag = Asset::create([
//         'asset_name' => "Lieux de détente à proximité"
//     ]);
//     return $tag;
// });