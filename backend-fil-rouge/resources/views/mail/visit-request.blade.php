@component('mail::message')
# Nouvelle Demande de Visite

**De:** {{ $renterName }}

## Détails du Logement
![{{ $property->property_name }}]({{ 'http://localhost:8000/storage/' . $property->images->where('is_main', 1)->first()->image_path }})

**Nom:** {{ $property->property_name }}
**Date et Heure souhaitées:** {{ \Carbon\Carbon::parse($visitDatetime)->format('d/m/Y à H:i') }}

@component('mail::button', ['url' => config('app.frontend_url') . '/properties/' . $property->id])
Voir le Logement
@endcomponent

Cordialement,
{{ config('app.name') }}
@endcomponent
