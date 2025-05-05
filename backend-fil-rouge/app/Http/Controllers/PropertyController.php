<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Region;
use App\Models\University;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Property::with(['university', 'tags', 'assets', 'images'])->get();
    }

    public function show(Property $property)
    {
        return $property->load(['university', 'tags', 'assets', 'images']);
    }


    public function store(StorePropertyRequest $request)
    {
        DB::beginTransaction();

        $user = Auth::user();

        $property = Property::create([
            'property_name' => $request->property_name,
            'property_description' => $request->property_description,
            'property_price' => $request->property_price,
            'property_region' => Region::where('region_name', $request->property_region)->first()->id,
            'nombre_chambres' => $request->nombre_chambres,
            'nombre_cuisine' => $request->nombre_cuisine,
            'nombre_salon' => $request->nombre_salon,
            'nombre_douches' => $request->nombre_douches,
            'user_id' => $user->id,
            'type' => $request->type,
            'university_id' => University::where('universitie_name', $request->university_id)->first()->id
        ]);

        // Gérer les images
        if ($request->hasFile('secondary_images')) {
            foreach ($request->file('secondary_images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('properties', 'public');
            $property->images()->create([
                'image_path' => $path,
                'is_main' => true
            ]);
        }

        // Associer les tags
        if ($request->has('tags')) {
            $property->tags()->attach($request->tags);
        }

        // Associer les assets
        if ($request->has('assets')) {
            $property->assets()->attach($request->assets);
        }

        DB::commit();

        return response()->json([
            'message' => 'Propriété créée avec succès',
            'property' => $property->load('university', 'tags', 'assets', 'images')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function update(Request $request, Property $property)
    {    
        
        \Log::info('Headers reçus:', $request->headers->all());
        \Log::info('Données reçues:', $request->all());

        try {
            DB::beginTransaction();
            
            // Récupérer l'université par son nom
            $university = University::where('universitie_name', $request->university_name)->first();
            $region_id = Region::where('region_name', $request->property_region)->first();
            
            if (!$university) {
                return response()->json([
                    'message' => 'Université non trouvée',
                    'university_name' => $request->university_id
                ], 404);
            }
    
            // Mise à jour des champs de base
            $property->update([
                'property_name' => $request->property_name,
                'type' => $request->type,
                'property_price' => $request->property_price,
                'property_description' => $request->property_description,
                'nombre_chambres' => $request->nombre_chambres,
                'nombre_cuisine' => $request->nombre_cuisine,
                'nombre_salon' => $request->nombre_salon,
                'nombre_douches' => $request->nombre_douches,
                'property_loc' => $request->property_loc,
                'property_region' => $region_id->id,
                'university_id' => $university->id
            ]);
    
            // Mise à jour des tags si présents
            if ($request->has('tags')) {
                $property->tags()->sync($request->tags);
            }
    
            // Mise à jour des assets si présents
            if ($request->has('assets')) {
                $property->assets()->sync($request->assets);
            }
            
    
            DB::commit();
            
            return response()->json([
                'message' => 'Propriété mise à jour avec succès',
                'property' => $property->load(['university', 'tags', 'assets']) // Charger toutes les relations
            ]);
    
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Erreur mise à jour: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }

    }


    /**
     * Update the specified resource in storage.
     */
    public function destroy(Property $property)
    {
        DB::beginTransaction();

        // Supprimer toutes les images
        $property->images->each(function($image) {
            Storage::disk('public')->delete($image->image_path);
        });

        // Les relations avec tags et assets seront automatiquement supprimées 
        // grâce aux contraintes ON DELETE CASCADE dans la migration
        $property->delete();

        DB::commit();

        return response()->json([
            'message' => 'Propriété supprimée avec succès'
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
}
