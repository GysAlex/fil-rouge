<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function getUniversitiesWithProperties()
    {
        try {
            $universities = University::with([
                'properties' => function($query) {
                    $query->where('published', true) // Filtre pour les propriétés publiées
                          ->with([
                            'images' => function($q) {
                                $q->where('is_main', true);
                            },
                            'tags',
                            'assets'
                        ]);
                }
            ])
            ->whereHas('properties', function($query) {
                $query->where('published', true); // S'assure que l'université a au moins une propriété publiée
            })
            ->get();

            return response()->json([
                'status' => 'success',
                'data' => $universities
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur récupération données homepage: ' . $e->getMessage());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la récupération des données',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}