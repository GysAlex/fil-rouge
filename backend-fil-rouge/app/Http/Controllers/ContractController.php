<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class ContractController extends Controller
{
    /**
     * Récupérer les locataires ayant mis un logement en favoris
     */
    public function getFavorites($propertyName)
    {
        // On recherche la propriété par son nom (attention : il faut s'assurer que les noms sont uniques)
        $property = Property::where('property_name', $propertyName)->firstOrFail();
    
        $favorites = $property->favoritedByUsers()
            ->get()
            ->map(function ($favorite) {
                return [
                    'id'    => $favorite->id,
                    'name'  => $favorite->name,
                    'email' => $favorite->email,
                ];
            });
    
        return response()->json($favorites);
    }


    public function updateStatus(Request $request, $contractId)
    {
        // Valider le nouveau statut (ajustez la liste des statuts autorisés si besoin)
        $validated = $request->validate([
            'status' => 'required|string|in:à_venir,en_cours,résilié,terminé'
        ]);

        // Récupérer le contrat ou renvoyer une erreur 404 s'il n'existe pas
        $contract = Contract::findOrFail($contractId);

        // Mettre à jour le statut du contrat
        $contract->statut = $validated['status'];
        $contract->save();

        return response()->json([
            'message'  => 'Statut du contrat mis à jour avec succès.',
            'contract' => $contract,
        ]);
    }

    /**
     * Créer un contrat
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_name' => 'required|exists:properties,property_name',
            'user_name'     => 'required|exists:users,name',
            'date_debut'  => 'required|date',
            'date_fin'    => 'required|date|after_or_equal:date_debut',
            'prix_location' => 'required|numeric|min:0',
            'modalite_paiement' => 'nullable|string',
        ]);
        
        $today = Carbon::today();
        $dateDebut = Carbon::parse($validated['date_debut']);
        $dateFin = Carbon::parse($validated['date_fin']);

        if ($today->lt($dateDebut)) {
            $statut = 'à_venir';
        } elseif ($today->between($dateDebut, $dateFin)) {
            $statut = 'en_cours';
        } else {
            $statut = 'terminé';
        }

        $contract = Contract::create([
            'property_id'     => Property::where('property_name', $validated['property_name'])->first()->id,
            'user_id'         => User::where('name', $validated['user_name'])->first()->id,
            'date_debut'      => $validated['date_debut'],
            'date_fin'        => $validated['date_fin'],
            'prix_location'   => $validated['prix_location'],
            'statut'          => $statut,
            'modalite_paiement' => $validated['modalite_paiement'] ?? null,
        ]);

        return response()->json([
            'message'  => 'Contrat créé avec succès',
            'contract' => $contract,
        ], 201);
    }
}