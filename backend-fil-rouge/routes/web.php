<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleRenterAuthController;
use App\Http\Controllers\FacebookRenterAuthController;
use App\Http\Controllers\AuthController;



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

