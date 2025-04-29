<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'propertyName' => 'required|string|max:255',
            'propertyType' => ['required', 'string', Rule::in(['immeuble', 'cite', 'studio_individuel', 'appartement_individuel'])],
            'propertyRegion' => 'nullable|string|max:255',
            'propertyPrice' => 'nullable|numeric|min:0',
            'propertyUniversity' => 'nullable|string|max:255',
            'propertyDescription' => 'nullable|string',
            'propertyLoc' => 'nullable|boolean',
            'chambre.number' => 'nullable|integer|min:0',
            'salon.number' => 'nullable|integer|min:0',
            'cuisine.number' => 'nullable|integer|min:0',
            'douche.number' => 'nullable|integer|min:0',
            'mainImageFile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'secondaryImageFiles.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'selectedAtouts' => 'nullable|array',
            'selectedAtouts.*' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:255',
            // Ajoutez ici les règles de validation pour d'autres champs si nécessaire
        ];
    }


    public function messages()
    {
        return [
            'propertyName.required' => 'Le nom du logement est obligatoire.',
            'propertyName.max' => 'Le nom du logement ne doit pas dépasser 255 caractères.',
            'propertyType.required' => 'Le type de logement est obligatoire.',
            'propertyType.in' => 'Le type de logement sélectionné n\'est pas valide.',
            'propertyPrice.numeric' => 'Le tarif annuel doit être un nombre.',
            'propertyPrice.min' => 'Le tarif annuel ne peut pas être négatif.',
            'mainImageFile.required' => 'L\'image principale est obligatoire.',
            'mainImageFile.image' => 'Le fichier principal doit être une image.',
            'mainImageFile.mimes' => 'Les formats d\'image autorisés sont jpeg, png, jpg et gif.',
            'mainImageFile.max' => 'La taille maximale de l\'image principale est de 2 Mo.',
            'secondaryImageFiles.*.image' => 'Un des fichiers secondaires n\'est pas une image.',
            'secondaryImageFiles.*.mimes' => 'Les formats d\'image secondaires autorisés sont jpeg, png, jpg et gif.',
            'secondaryImageFiles.*.max' => 'La taille maximale d\'une image secondaire est de 2 Mo.',
            'tags.*.max' => 'Le nom d\'un tag ne doit pas dépasser 255 caractères.',
            'selectedAtouts.*.max' => 'Le nom d\'un atout ne doit pas dépasser 255 caractères.',
            // Ajoutez ici les messages d'erreur personnalisés pour d'autres règles
        ];
    }
}
