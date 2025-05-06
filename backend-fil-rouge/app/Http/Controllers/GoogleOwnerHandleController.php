<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class GoogleOwnerHandleController extends Controller
{

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            // Récupérer les informations de l'utilisateur depuis Google
            $googleUser = Socialite::driver('google_owner')->user()->user;

            dd($googleUser);
            // Préparer les données de l'utilisateur
            $userData = [
                'name' => $googleUser['given_name'],
                'family_name' => $googleUser['family_name'] ?? '',
                'email' => $googleUser['email'],
                'image' => $googleUser['picture'] ?? null,
                'google_id' => $googleUser->user['id'],
            ];

            // Vérifier si l'utilisateur existe déjà
            $user = User::where('google_id', $googleUser->user['id'])->first();

            if (!$user) {
                $userData['password'] = bcrypt('1234'); // Mot de passe par défaut
                $user = User::create($userData);

                // Associer le rôle "owner" (id = 1)
                $user->roles()->attach(1);
            }

            if (!$user->email_verified_at) {
                $user->update(['email_verified_at' => Carbon::now()]);
            }

            // Connecter l'utilisateur
            Auth::login($user);

            return redirect('http://localhost:5173/owner/dashboard');

        } catch (\Exception $e) {
            return redirect('http://localhost:5173/home')->withErrors([
                'message' => 'Une erreur est survenue lors de la connexion avec Google.',
            ]);
        }
    }
}