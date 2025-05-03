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
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        DB::beginTransaction();

        $property->update([
            'property_name' => $request->property_name,
            'property_description' => $request->property_description,
            'property_price' => $request->property_price,
            'property_region' => Region::where('region_name', $request->property_region)->first()->id,
            'nombre_chambres' => $request->nombre_chambres,
            'nombre_cuisine' => $request->nombre_cuisine,
            'nombre_salon' => $request->nombre_salon,
            'nombre_douches' => $request->nombre_douches,
            'type' => $request->type,
            'university_id' => University::where('universitie_name', $request->university_id)->first()->id
        ]);

        // Mise à jour des images
        if ($request->hasFile('secondary_images')) {
            // Supprimer les anciennes images secondaires
            $property->images()->where('is_main', false)->get()->each(function($image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            });

            // Ajouter les nouvelles images secondaires
            foreach ($request->file('secondary_images') as $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        if ($request->hasFile('main_image')) {
            // Supprimer l'ancienne image principale
            $mainImage = $property->images()->where('is_main', true)->first();
            if ($mainImage) {
                Storage::disk('public')->delete($mainImage->image_path);
                $mainImage->delete();
            }

            // Ajouter la nouvelle image principale
            $path = $request->file('main_image')->store('properties', 'public');
            $property->images()->create([
                'image_path' => $path,
                'is_main' => true
            ]);
        }

        // Mise à jour des tags
        if ($request->has('tags')) {
            $property->tags()->sync($request->tags);
        }

        // Mise à jour des assets
        if ($request->has('assets')) {
            $property->assets()->sync($request->assets);
        }

        DB::commit();

        return response()->json([
            'message' => 'Propriété mise à jour avec succès',
            'property' => $property->load('university', 'tags', 'assets', 'images')
        ]);
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
