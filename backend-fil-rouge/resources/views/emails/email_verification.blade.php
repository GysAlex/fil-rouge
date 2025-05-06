@component('mail::message')
# Bonjour {{ $user->name }},

Merci de vous être inscrit sur **MetchApp** ! 🎉

Pour finaliser votre inscription, veuillez utiliser le code de validation ci-dessous pour vérifier votre adresse email :

@component('mail::panel')
<span style="color: #4CAF50; font-size: 20px; font-weight: bold;">{{ $verificationCode }}</span>
@endcomponent

Si vous n'avez pas demandé cette vérification, veuillez ignorer cet email.

@component('mail::button', ['url' => config('app.url'), 'color' => 'success'])
Visitez notre site
@endcomponent

Cordialement,  
L'équipe **{{ config('app.name') }}**

---

<span style="font-size: 12px; color: #888;">Si vous avez des questions, contactez-nous à <a href="mailto:support@metchapp.com" style="color: #4CAF50;">support@metchapp.com</a>.</span>
@endcomponent