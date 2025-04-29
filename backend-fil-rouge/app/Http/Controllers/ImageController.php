<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function updateProfileImage(Request $request)
    {
        $file = $request->validate([

            'image'=> ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);
        
        $user = Auth::user();

        if ($file) {
            $path = Storage::disk('public')->put('profilesImage', $request->file('image'));
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }

        }

        $user->update([
            'image'=> $path
        ]);

        return response()->json([
            'message' => 'Image de profil mise à jour avec succès',
            'user' => $user
        ]);
    }

}
