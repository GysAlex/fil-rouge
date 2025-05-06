<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FacebookRenterAuthController extends Controller
{
    public function handlefacebookCallback()
    {

        $facebookUser = Socialite::driver('facebook')->user()->user;
        
        dd($facebookUser);

        $userData = [
            'name' => $facebookUser['given_name'],
            'family_name' => $facebookUser['family_name'],
            'email' => $facebookUser['email'],
            'image' => $facebookUser['picture'],
            'facebook_id' => $facebookUser['id'],
        ];

        $user = User::where('facebook_id', $facebookUser['id'])->first();
        
        if ($user) {
            Auth::login($user);
            return redirect("http://localhost:5173" . '/renter/profile');
        }

        $userData['password'] = bcrypt("1234");
        $user = User::create(
            $userData
        );

        if ($user->email_verified_at === null) {
            $user->update(['email_verified_at' => Carbon::now()]);
        }

        Auth::login($user);


        return redirect("http://localhost:5173" . '/renter/profile');
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }
}



