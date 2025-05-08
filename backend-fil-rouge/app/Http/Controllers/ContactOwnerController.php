<?php

namespace App\Http\Controllers;

use App\Mail\VisitRequest;
use App\Mail\OfferRequest;
use App\Models\Property;
use App\Models\User;
use App\Notifications\VisitRequestNotification;
use App\Notifications\OfferRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class ContactOwnerController extends Controller
{
    public function contact(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'subject' => 'required|in:Demander une visite,Faire une offre',
            'visit_datetime' => 'required_if:subject,Demander une visite|date',
            'offer_amount' => 'required_if:subject,Faire une offre|numeric',
            'details' => 'required_if:subject,Faire une offre|string',
        ]);

        try {
            $property = Property::with(['images', 'user'])->findOrFail($request->property_id);
            $renter = Auth::user();

            if ($request->subject === 'Demander une visite') {
                // Envoyer l'email

                \Log::info('Email envoyé à : ' . $property->user->email);
                \Log::info('Date de visite demandée : ' . $request->visit_datetime);
                \Log::info('Nom du locataire : ' . $renter->name);

                Mail::to($property->user->email)
                    ->send(new VisitRequest($property, $request->visit_datetime, $renter->name));

                // Créer la notification
                // $property->owner->notify(new VisitRequestNotification([
                //     'property_id' => $property->id,
                //     'property_name' => $property->property_name,
                //     'renter_name' => $renter->name,
                //     'visit_datetime' => $request->visit_datetime,
                // ]));
            } else {
                // Envoyer l'email
                Mail::to($property->user->email)
                    ->send(new OfferRequest(
                        $property,
                        $request->offer_amount,
                        $request->details,
                        $renter->name
                    ));

                // Créer la notification
                // $property->owner->notify(new OfferRequestNotification([
                //     'property_id' => $property->id,
                //     'property_name' => $property->property_name,
                //     'renter_name' => $renter->name,
                //     'offer_amount' => $request->offer_amount,
                //     'details' => $request->details,
                // ]));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Votre demande a été envoyée avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de l\'envoi de votre demande'
            ], 500);
        }
    }
}
