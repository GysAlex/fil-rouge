<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Contract;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PropertyDetailsController extends Controller
{
    public function getPropertyDetails($propertyId)
    {
        try {
            // Debug log
            \Log::info('Début getPropertyDetails pour propertyId: ' . $propertyId);
            \Log::info('User ID connecté: ' . Auth::id());

            $property = Property::where('id', $propertyId)
                ->where('user_id', Auth::id())
                ->firstOrFail();


            // Récupérer les contrats actifs
            $activeContracts = Contract::where('property_id', $propertyId)
                ->where('statut', 'en_cours')
                ->get();

            \Log::info('Nombre de contrats actifs: ' . $activeContracts->count());

            // Calculer le revenu total
            $totalRevenue = Contract::where('property_id', $propertyId)
                ->whereIn('statut', ['en_cours', 'à_venir'])
                ->sum('prix_location');


            // Compter les favoris sans contrat actif
            $favorites = DB::table('property_user')
                ->where('property_id', $propertyId)
                ->whereNotExists(function ($query) use ($propertyId) {
                    $query->select(DB::raw(1))
                        ->from('contracts')
                        ->whereColumn('contracts.user_id', 'property_user.user_id')
                        ->where('contracts.property_id', $propertyId)
                        ->where('contracts.statut', 'en_cours');
                })
                ->count();


            // Statistiques
            $stats = [
                'totalTenants' => $activeContracts->count(),
                'totalFavorites' => $favorites,
                'totalRevenue' => $totalRevenue
            ];

            // Récupérer les locataires avec leurs contrats
            $tenants = Contract::where('property_id', $propertyId)
                ->with(['user:id,name,email,image'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($contract) {
                    return [
                        'id' => $contract->user->id,
                        'name' => $contract->user->name,
                        'email' => $contract->user->email,
                        'image' => $contract->user->image,
                        'contracts' => [[
                            'id' => $contract->id,
                            'date_debut' => $contract->date_debut,
                            'date_fin' => $contract->date_fin,
                            'statut' => $contract->statut,
                            'montant' => $contract->prix_location
                        ]]
                    ];
                });

            // Récupérer les prospects
            $prospects = DB::table('property_user')
                ->join('users', 'users.id', '=', 'property_user.user_id')
                ->where('property_id', $propertyId)
                ->whereNotExists(function ($query) use ($propertyId) {
                    $query->select(DB::raw(1))
                        ->from('contracts')
                        ->whereColumn('contracts.user_id', 'property_user.user_id')
                        ->where('contracts.property_id', $propertyId)
                        ->where('contracts.statut', 'en_cours');
                })
                ->select(
                    'users.id',
                    'users.name',
                    'users.email',
                    'users.image',
                    'property_user.created_at as date_ajout'
                )
                ->get();


            return response()->json([
                'status' => 'success',
                'data' => [
                    'stats' => $stats,
                    'tenants' => $tenants,
                    'prospects' => $prospects
                ]
            ]);

        } catch (\Exception $e) {            
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des détails',
                'debug_message' => $e->getMessage() // À retirer en production
            ], 500);
        }
    }
}