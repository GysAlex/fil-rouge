<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\User;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OwnerController extends Controller
{
    /**
     * Récupérer toutes les données pour le dashboard
     */
    public function getDashboardData()
    {
        $owner = Auth::user();
    
        // Récupérer les logements avec leurs images et contrats associés
        $properties = Property::with(['images', 'contracts.user'])
            ->where('user_id', $owner->id)
            ->get()
            ->map(function ($property) {
                return [
                    'id'              => $property->id,
                    'published'       => $property->published,
                    'nom'             => $property->property_name,
                    'dateCreation'    => $property->created_at->format('d M Y'),
                    'locataires_count'=> $property->contracts->count(), // nombre total de contrats = locataires associés
                    'status'          => $property->status ?? 'non défini',
                    'image'           => $property->images->where('is_main', true)->first()?->image_path ?? null,
                ];
            });
    
        // Récupérer tous les contrats associés aux logements de l'owner
        $contracts = Contract::with('property', 'user')
            ->whereHas('property', function ($query) use ($owner) {
                $query->where('user_id', $owner->id);
            })
            ->get();
    
        // Récupérer tous les locataires (users) ayant au moins un contrat dont le logement appartient à l'owner
        $tenants = User::whereHas('contracts', function ($query) use ($owner) {
            $query->whereHas('property', function ($q) use ($owner) {
                $q->where('user_id', $owner->id);
            });
        })
        ->with(['contracts' => function ($q) use ($owner) {
            $q->whereHas('property', function ($q2) use ($owner) {
                $q2->where('user_id', $owner->id);
            });
        }])
        ->get();
    
        // Statistiques
        $stats = [
            'totalLogements'   => $properties->count(),
            'totalLocataires'  => $tenants->count(),
            'contratsActifs'   => $contracts->where('statut', 'en_cours')->count(),
            'contratsTermines' => $contracts->where('statut', 'terminé')->count(),
            'contratsFutur' =>  $contracts->where('statut', 'à_venir')->count(),
            'contratsResilier' =>  $contracts->where('statut', 'résilié')->count(),
        ];
    
        return response()->json([
            'logements'  => $properties,
            'locataires' => $tenants,
            'contrats'   => $contracts,
            'stats'      => $stats,
        ]);
    }

    /**
     * Mettre à jour le statut d'un logement
     */
    public function updatePropertyStatus(Request $request, Property $property)
    {
        $property->update(['statut' => $request->status]);
        return response()->json(['message' => 'Statut mis à jour avec succès']);
    }

    /**
     * Rechercher des logements
     */
    public function searchProperties(Request $request)
    {

        $id = Auth::id();

        $properties = Property::where('user_id', $id);

        if ($request->search) {
            $properties->where('property_name', 'like', "%{$request->search}%");
        }

        if ($request->published) {
            $properties->where('published', $request->published);
        }

        return $properties
        ->with(['images', 'contracts.user' ])
        ->get()
        ->map(function ($property) {
            return [
                'id'              => $property->id,
                'nom'             => $property->property_name,
                'dateCreation'    => $property->created_at->format('d M Y'),
                'locataires_count'=> $property->contracts->count(), // nombre total de contrats = locataires associés
                'published'       => $property->published ?? 'non défini',
                'image'           => $property->images->where('is_main', true)->first()?->image_path ?? null,
            ];
        });
    }

    /**
     * Rechercher des locataires
     */
    public function searchTenants(Request $request)
    {
        $ownerId = Auth::id();
    
        $query = User::whereHas('contracts', function ($query) use ($ownerId) {
            $query->whereHas('property', function ($q) use ($ownerId) {
                $q->where('user_id', $ownerId);
            });
        });
    
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }
    
        if ($request->contract_status) {
            $query->whereHas('contracts', function ($query) use ($ownerId, $request) {
                $query->whereHas('property', function ($q) use ($ownerId) {
                    $q->where('user_id', $ownerId);
                })->where('statut', $request->contract_status);
            });
        }
    
        return $query->with('contracts')->get();
    }

    public function togglePublished(Request $request, Property $property)
    {
        // Vérifier que l'utilisateur authentifié est bien le propriétaire du logement
        $ownerId = Auth::id();
        if ($property->user_id !== $ownerId) {
            return response()->json(['error' => 'Vous n\'êtes pas autorisé à effectuer cette action.'], 403);
        }

        // Basculer l'état de publication
        $property->published = !$property->published;
        $property->save();

        return response()->json([
            'message' => $property->published ? 'Logement publié avec succès.' : 'Logement dépublié avec succès.',
            'published' => $property->published,
        ]);
    }

    public function getOwnerProperties()
    {
        try {
            $owner_id = Auth::id();
            
            $properties = Property::where('user_id', $owner_id)
                ->where('published', true)
                ->with(['images' => function($query) {
                    $query->where('is_main', true);
                }])
                ->get();
    
            return response()->json([
                'status' => 'success',
                'data' => $properties
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur récupération propriétés: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des propriétés',
                'error' => $e->getMessage()
            ], 500);
        }
    
    }
}