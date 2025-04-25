<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleRenterAuthController;
use App\Http\Controllers\FacebookRenterAuthController;


Route::get('/', function () {
    return view('welcome');
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

