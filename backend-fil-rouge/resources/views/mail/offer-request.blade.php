@component('mail::message')
# Nouvelle Offre Reçue

**De:** {{ $renterName }}

## Détails du Logement
![{{ $property->property_name }}]({{ 'http://localhost:8000/storage/' . $property->images->where('is_main', 1)->first()->image_path }})

**Nom:** {{ $property->property_name }}
**Montant Proposé:** {{ number_format($offerAmount, 0, ',', ' ') }} FCFA

## Message du Locataire
{{ $details }}

@component('mail::button', ['url' => config('app.frontend_url') . '/detail/' . $property->id])
Voir le Logement
@endcomponent

Cordialement,
{{ config('app.name') }}
@endcomponent
