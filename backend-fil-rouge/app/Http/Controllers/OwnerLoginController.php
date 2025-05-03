<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Support\Facades\Auth;

class OwnerLoginController extends Controller
{
     /**
     * Enregistrer un propriétaire.
     */
    public function registerOwner(Request $request)
    {
        // Validation des données avec des messages personnalisés
        $validatedData = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'password' => 'required|min:3',
            'phone_number' => 'required|string|regex:/^\+?[0-9]{9}$/|unique:users,phone_number',
        ], [
            'name.required'         => 'Le nom est obligatoire.',
            'name.string'           => 'Le nom doit être une chaîne de caractères.',
            'name.max'              => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required'        => 'L\'adresse e-mail est obligatoire.',
            'email.email'           => 'L\'adresse e-mail doit être valide.',
            'password.required'      => 'Le mot de passe est obligatoire',
            'password.min'          => 'Le mot de passe est trop court',
            'email.unique'          => 'Cette adresse e-mail est déjà utilisée.',
            'phone_number.required' => 'Le numéro de téléphone est obligatoire.',
            'phone_number.regex'    => 'Le numéro de téléphone doit être valide (10 à 15 chiffres, avec ou sans "+").',
            'phone_number.unique'   => 'Ce numéro de téléphone est déjà utilisé.',
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name'         => $validatedData['name'],
            'email'        => $validatedData['email'],
            'password'     => bcrypt($validatedData['password']),
            'phone_number' => $validatedData['phone_number'],
        ]);

        // Attribution du rôle "owner" (id = 1)
        $user->roles()->attach(1);

        // Générer un code de vérification
        $verificationCode = Str::random(6);

        Auth::login($user);

        // Mettre à jour le code de vérification dans la base de données
        $user->email_verification_code = $verificationCode;
        $user->save();

        // Envoyer la notification avec le code de vérification
        $user->notify(new EmailVerificationNotification($verificationCode));


        return response()->json([
            'message' => 'Propriétaire enregistré avec succès.',
            'user'    => $user,
        ], 201);
    }

    public function confirmEmail(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Vérifier si l'email est déjà confirmé
        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Votre email est déjà confirmé.',
            ], 200);
        }

        // Valider le code de confirmation
        $validatedData = $request->validate([
            'code' => 'required|string',
        ], [
            'code.required' => 'Le code de confirmation est obligatoire.',
        ]);

        // Vérifier le code de confirmation
        if ($user->email_verification_code !== $validatedData['code']) {
            return response()->json([
                'message' => 'Le code de confirmation est invalide.',
            ], 400);
        }

        // Confirmer l'email
        $user->email_verified_at = now();
        $user->email_verification_code = null; // Supprimer le code après confirmation
        $user->save();

        return response()->json([
            'message' => 'Propriétaire enregistré avec succès.',
            'user'    => $user,
        ], 201);
    }

    public function sendVerificationCode(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Générer un nouveau code de vérification
        $verificationCode = Str::random(6);

        // Mettre à jour le code de vérification dans la base de données
        $user->email_verification_code = $verificationCode;
        $user->save();

        // Envoyer la notification avec le code de vérification
        $user->notify(new EmailVerificationNotification($verificationCode));

        return response()->json([
            'message' => 'Un code de vérification a été envoyé à votre adresse email.',
        ], 200);
    }


    public function loginOwner(Request $request)
    {
        // Validation des données d'entrée
        $validatedData = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:3',
        ], [
            'email.required'    => 'L\'adresse e-mail est obligatoire.',
            'email.email'       => 'L\'adresse e-mail doit être valide.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min'      => 'Le mot de passe doit contenir au moins 8 caractères.',
        ]);
    
        // Tentative de connexion
        if (Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']])) {
            $user = Auth::user();
    
            // Vérifier si l'utilisateur a le rôle "owner"
            if (!$user->roles->contains('name', 'owner')) {
                Auth::logout();
                return response()->json([
                    'message' => 'Vous n\'avez pas les privilèges de propriétaire.',
                ], 403);
            }
    
            // Vérifier si l'email est confirmé
            if (!$user->email_verified_at) {
                Auth::logout();
                return response()->json([
                    'message' => 'Veuillez confirmer votre adresse e-mail avant de vous connecter.',
                ], 403);
            }
    
            // Connexion réussie
            return response()->json([
                'message' => 'Connexion réussie.',
                'user'    => $user,
            ], 200);
        }
    
        // Échec de la connexion
        return response()->json([
            'message' => 'Identifiants incorrects.',
        ], 401);
    }
}


