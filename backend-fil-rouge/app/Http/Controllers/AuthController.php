<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        $fields = $request->validated();

        $user = User::create($fields);

        $token = $user->createToken($fields['email']);

        return ['user' => $user, 'token' => $token->plainTextToken];
    }

    public function login(LoginRequest $request)
    {
        $fields = $request->validated();

        $user = User::where('email', $fields['email'])->first();

        

        if(!$user || !Hash::check($fields['password'], $user->password))
        {
            return ['logfail', 'vos identifiants sont incorrectes'];
        }

        Auth::login($user);

        return ['user' => $user];
    }

    public function logout()
    {
        Auth::guard('web')->logout(); //It work's i don't even know why
    }


    
}
