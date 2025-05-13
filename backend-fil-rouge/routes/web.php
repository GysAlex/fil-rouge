<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleRenterAuthController;
use App\Http\Controllers\FacebookRenterAuthController;
use App\Http\Controllers\GoogleOwnerHandleController;
use App\Http\Controllers\AuthController;
use App\Models\Region;
use App\Models\University;
use App\Models\Asset;
use App\Models\Role;
use App\Models\User;
use App\Models\Contract;
use App\Models\PropertyTag;

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


Route::get('/auth/google/owner/redirect', [GoogleOwnerHandleController::class, 'redirectToGoogle'])->name('google.owner.redirect');
Route::get('/auth/google/owner/callback', [GoogleOwnerHandleController::class, 'handleGoogleCallback'])->name('google.owner.callback');

// Route::get('/roles', function () {


//     $region = Role::create(['name' => 'admin']);

//     return $region;
// });


Route::get('/test', function () {

    Asset::create([
        'asset_name' => 'sécurité 24/24'
    ]);
    Asset::create([
        'asset_name' => 'espace vert à proximité'
    ]);
    Asset::create([
        'asset_name' => "reserve annual d'eau"
    ]);
    Asset::create([
        'asset_name' => 'plusieurs commerces à proximité'
    ]);


 });
