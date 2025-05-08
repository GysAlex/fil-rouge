<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Toggle favorite status for a property
     */



     public function remove($propertyId)
     {
         try {
             $user = Auth::user();
             $user->favoriteProperties()->detach($propertyId);

             return response()->json([
                 'status' => 'success',
                 'message' => 'Propriété retirée des favoris avec succès'
             ]);

         } catch (\Exception $e) {
             return response()->json([
                 'status' => 'error',
                 'message' => 'Une erreur est survenue lors de la suppression du favori'
             ], 500);
         }
     }

    public function toggle(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id'
        ]);

        try {
            $user = Auth::user();
            $propertyId = $request->property_id;

            // Vérifier si la propriété est déjà en favori
            $isFavorite = $user->favoriteProperties()->where('property_id', $propertyId)->exists();

            if ($isFavorite) {
                // Retirer des favoris
                $user->favoriteProperties()->detach($propertyId);
                return response()->json([
                    'status' => 'removed',
                    'message' => 'Propriété retirée des favoris'
                ]);
            }

            // Ajouter aux favoris
            $user->favoriteProperties()->attach($propertyId);
            return response()->json([
                'status' => 'added',
                'message' => 'Propriété ajoutée aux favoris'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue'
            ], 500);
        }
    }

    /**
     * Get favorite status for a property
     */
    public function getStatus($propertyId)
    {
        try {
            $user = Auth::user();
            $isFavorite = $user->favoriteProperties()
                              ->where('property_id', $propertyId)
                              ->exists();

            return response()->json([
                'status' => 'success',
                'isFavorite' => $isFavorite
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue'
            ], 500);
        }
    }

    /**
     * Get all favorite properties for current user
     */
    /**
     * Get all favorite properties for current user
     */
    public function getFavorites()
    {

        try {
            $user = Auth::user();

            if (!$user) {
                \Log::error('No authenticated user found');
                return response()->json([
                    'status' => 'error',
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }

            \Log::info('Fetching favorites for user:', ['user_id' => $user->id]);

            $favorites = $user->favoriteProperties()
                ->with(['images', 'tags'])
                ->get()
                ->map(function ($property) {
                    $mainImage = $property->images->where('is_main', 1)->first();

                    \Log::info('Processing property:', [
                        'property_id' => $property->id,
                        'has_main_image' => $mainImage ? 'yes' : 'no'
                    ]);

                    return [
                        'id' => $property->id,
                        'property_name' => $property->property_name,
                        'property_price' => $property->property_price,
                        'image_path' => $mainImage ? $mainImage->image_path : null,
                        'nombre_chambres' => $property->nombre_chambres,
                        'nombre_douches' => $property->nombre_douches,
                        'nombre_salon' => $property->nombre_salon,
                        'nombre_cuisine' => $property->nombre_cuisine,
                        'university' => $property->university,
                        'tags' => $property->tags,
                        'description' => $property->property_description,
                        'colocation' => $property->coloc
                    ];
                });

            \Log::info('Favorites count:', ['count' => $favorites->count()]);

            return response()->json([
                'status' => 'success',
                'favorites' => $favorites,
                'debug' => [
                    'user_id' => $user->id,
                    'favorites_count' => $favorites->count()
                ]
            ]);

        } catch (\Exception $e) {
            \Log::error('Error in getFavorites:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la récupération des favoris',
                'debug' => $e->getMessage()
            ], 500);
        }
    }
}
