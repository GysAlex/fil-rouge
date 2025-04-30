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

        // Récupérer les logements avec leurs relations
        $properties = Property::with(['images', 'tenants'])
            ->where('user_id', $owner->id)
            ->get()
            ->map(function ($property) {
                return [
                    'id' => $property->id,
                    'nom' => $property->property_name,
                    'dateCreation' => $property->created_at->format('d M Y'),
                    'locataires' => $property->tenants->count(),
                    'status' => $property->status,
                    'image' => $property->images->where('is_main', true)->first()->path ?? null
                ];
            });

        // Récupérer les locataires
        $tenants = User::whereHas('rentedProperties', function ($query) use ($owner) {
            $query->where('user_id', $owner->id);
        })
        ->with('contracts')
        ->get()
        ->map(function ($tenant) {
            $contract = $tenant->contracts->last();
            return [
                'id' => $tenant->id,
                'nom' => $tenant->name,
                'duree' => $contract ? $contract->duration : 'Non défini',
                'etat' => $contract ? $contract->status : 'Non défini',
                'email' => $tenant->email,
                'image' => $tenant->image
            ];
        });

        // Statistiques des contrats
        $contracts = Contract::whereHas('property', function ($query) use ($owner) {
            $query->where('user_id', $owner->id);
        })->get();

        $stats = [
            'totalLogements' => $properties->count(),
            'totalLocataires' => $tenants->count(),
            'contratsActifs' => $contracts->where('status', 'actif')->count(),
            'contratsTermines' => $contracts->where('status', 'résilié')->count()
        ];

        return response()->json([
            'logements' => $properties,
            'locataires' => $tenants,
            'stats' => $stats
        ]);
    }

    /**
     * Mettre à jour le statut d'un logement
     */
    public function updatePropertyStatus(Request $request, Property $property)
    {
        $property->update(['status' => $request->status]);
        return response()->json(['message' => 'Statut mis à jour avec succès']);
    }

    /**
     * Rechercher des logements
     */
    public function searchProperties(Request $request)
    {
        $query = Property::where('user_id', Auth::id());

        if ($request->search) {
            $query->where('property_name', 'like', "%{$request->search}%");
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return $query->with(['images', 'tenants'])->get();
    }

    /**
     * Rechercher des locataires
     */
    public function searchTenants(Request $request)
    {
        $query = User::whereHas('rentedProperties', function ($query) {
            $query->where('user_id', Auth::id());
        });

        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
        }

        if ($request->contract_status) {
            $query->whereHas('contracts', function ($query) use ($request) {
                $query->where('status', $request->contract_status);
            });
        }

        return $query->with('contracts')->get();
    }
}