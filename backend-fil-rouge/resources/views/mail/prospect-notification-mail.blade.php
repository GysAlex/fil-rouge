@component('mail::message')
# {{ $subject }}

{{ $messageContent }}

## Détails du Logement
![{{ $property->property_name }}]({{ 'http://localhost:8000/storage/' . $property->images->where('is_main', 1)->first()->image_path }})

**Nom:** {{ $property->property_name }}
**Prix:** {{ number_format($property->property_price, 0, ',', ' ') }} FCFA

@component('mail::button', ['url' => config('app.frontend_url') . '/detail/' . $property->id])
Voir le Logement
@endcomponent

Cordialement,
{{ config('app.name') }}
@endcomponent
