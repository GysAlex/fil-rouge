<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class GoogleRenterAuthController
{
    public function handleGoogleCallback()
    {

        $googleUser = Socialite::driver('google')->user()->user;

        $userData = [
            'name' => $googleUser['given_name'],
            'family_name' => $googleUser['family_name'],
            'email' => $googleUser['email'],
            'image' => $googleUser['picture'],
            'google_id' => $googleUser['id'],
        ];

        $user = User::where('google_id', $googleUser['id'])->orWhere('email',  $googleUser['email'])->first();

        if ($user) {
            // Vérifier si l'utilisateur n'a pas déjà le rôle "renter"
            if (!$user->roles->contains('name', 'renter')) {
                // Conserver les rôles existants et ajouter le rôle "renter"
                $currentRoles = $user->roles->pluck('id')->toArray();
                $currentRoles[] = 2; // ID du rôle "renter"
                $user->roles()->sync($currentRoles);
            }
            // Connecter l'utilisateur
            Auth::login($user);

            return redirect("http://localhost:5173/renter/profile");
        }

        $userData['password'] = bcrypt("1234");
        $user = User::create(
            $userData
        );

        if ($user->email_verified_at === null) {
            $user->update(['email_verified_at' => Carbon::now()]);
        }

        $user->roles()->attach(2);

        Auth::login($user);


        return redirect("http://localhost:5173" . '/renter/profile');
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }
}
