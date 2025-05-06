<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'property_name' => 'required|string|max:255',
            'type' => ['required', 'string', Rule::in(['immeuble', 'cite', 'studio', 'appartement'])],
            'property_region' => 'nullable|string|max:255',
            'property_price' => 'nullable|numeric|min:0',
            'university_id' => 'exists:universities,universitie_name',
            'property_description' => 'nullable|string',
            'property_loc' => 'nullable',
            'nombre_douches' => 'nullable|integer|min:0',
            'nombre_chambres' => 'nullable|integer|min:0',
            'nombre_salon' => 'nullable|integer|min:0',
            'nombre_cuisine' => 'nullable|integer|min:0',
            'main_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'secondary_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'assets' => 'nullable|array',
            'assets.*' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:255',
            // Ajoutez ici les règles de validation pour d'autres champs si nécessaire
        ];
    }


    public function messages()
    {
        return [
            'property_name.required' => 'Le nom du logement est obligatoire.',
            'property_name.max' => 'Le nom du logement ne doit pas dépasser 255 caractères.',
            'property_type.required' => 'Le type de logement est obligatoire.',
            'property_type.in' => 'Le type de logement sélectionné n\'est pas valide.',
            'property_price.numeric' => 'Le tarif annuel doit être un nombre.',
            'property_price.min' => 'Le tarif annuel ne peut pas être négatif.',
            'main_image.required' => 'L\'image principale est obligatoire.',
            'main_image.image' => 'Le fichier principal doit être une image.',
            'main_image.mimes' => 'Les formats d\'image autorisés sont jpeg, png, jpg et gif.',
            'main_image.max' => 'La taille maximale de l\'image principale est de 2 Mo.',
            'secondary_images.*.image' => 'Un des fichiers secondaires n\'est pas une image.',
            'secondary_images.*.mimes' => 'Les formats d\'image secondaires autorisés sont jpeg, png, jpg et gif.',
            'secondary_images.*.max' => 'La taille maximale d\'une image secondaire est de 2 Mo.',
            'tags.*.max' => 'Le nom d\'un tag ne doit pas dépasser 255 caractères.',
            'assets.*.max' => 'Le nom d\'un atout ne doit pas dépasser 255 caractères.',
            // Ajoutez ici les messages d'erreur personnalisés pour d'autres règles
        ];
    }
}
