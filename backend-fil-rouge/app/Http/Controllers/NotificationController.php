<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Mail\ProspectNotificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function notifyProspects(Request $request)
    {
        $request->validate([
            'property_id' => 'required|exists:properties,id',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        try {
            $property = Property::with(['favoritedByUsers', 'images'])->findOrFail($request->property_id);
            $prospects = $property->favoritedByUsers;

            Log::info('Envoi de notifications aux prospects', [
                'property_id' => $property->id,
                'prospects_count' => $prospects->count()
            ]);

            foreach ($prospects as $prospect) {
                Mail::to($prospect->email)
                    ->queue(new ProspectNotificationMail(
                        $request->subject,
                        $request->message,
                        $property
                    ));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Emails envoyés avec succès',
                'count' => $prospects->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi des emails:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de l\'envoi des emails'
            ], 500);
        }
    }
}
