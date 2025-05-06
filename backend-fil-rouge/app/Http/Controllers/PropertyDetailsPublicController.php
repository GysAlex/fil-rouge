<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyDetailsPublicController extends Controller
{
    public function getPropertyDetails($id)
    {
        try {
            $property = Property::where('id', $id)
                ->where('published', true)
                ->with([
                    'images',
                    'tags',
                    'assets',
                    'user:id,name,email,image', // Propriétaire
                    'university:id,universitie_name'
                ])
                ->firstOrFail();

            // Formater les données pour le frontend
            $formattedData = [
                'property' => [
                    'id' => $property->id,
                    'property_name' => $property->property_name,
                    'description' => $property->property_description,
                    'price' => $property->property_price,
                    'images' => $property->images,
                    'tags' => $property->tags,
                    'colocation' => $property->coloc,
                    'assets' => $property->assets,
                    'nombre_chambres' => $property->nombre_chambres,
                    'nombre_salon' => $property->nombre_salon,
                    'nombre_cuisine' => $property->nombre_cuisine,
                    'nombre_douches' => $property->nombre_douches,
                    'publie' => $property->published_at
                ],
                'owner' => [
                    'id' => $property->user->id,
                    'name' => $property->user->name,
                    'email' => $property->user->email,
                    'image' => $property->user->image,
                ],
                'university' => [
                    'name' => $property->university->universitie_name,
                ]
            ];

            \Log::info("les données transmisent au frontend", $formattedData);
            return response()->json([
                'status' => 'success',
                'data' => $formattedData
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur récupération détails propriété: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des détails'
            ], 500);
        }
    }
}