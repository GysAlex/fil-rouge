<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdatePropertyRequest extends FormRequest
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
    public function rules(): array
    {
        \Log::info('Headers reçus:', $this->headers->all());
        \Log::info('Données reçues:', $this->all());
        \Log::info('Files reçus:', $this->allFiles());

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
        ];
    }

    public function messages()
    {
        return [
            'property_name.required' => 'Le nom du logement est obligatoire.',
            'property_name.string' => 'Le nom du logement doit être une chaîne de caractères.',
            'property_name.max' => 'Le nom du logement ne peut pas dépasser 255 caractères.',

            'type.required' => 'Le type de logement est obligatoire.',
            'type.string' => 'Le type de logement doit être une chaîne de caractères.',
            'type.in' => 'Le type de logement doit être l’un des suivants : studio, immeuble, appartement, cités, chambre.',

            'property_region.required' => 'La région est obligatoire.',
            'property_region.string' => 'La région doit être une chaîne de caractères.',
            'property_region.exists' => 'La région sélectionnée est invalide.',

            'property_price.required' => 'Le prix du logement est obligatoire.',
            'property_price.numeric' => 'Le prix du logement doit être un nombre.',
            'property_price.min' => 'Le prix du logement doit être supérieur ou égal à 0.',

            'university_id.required' => 'L’université est obligatoire.',
            'university_id.string' => 'L’université doit être une chaîne de caractères.',
            'university_id.exists' => 'L’université sélectionnée est invalide.',

            'property_description.string' => 'La description du logement doit être une chaîne de caractères.',
            'property_description.max' => 'La description du logement ne peut pas dépasser 1000 caractères.',

            'property_loc.required' => 'Le champ "possibilité de colocation" est obligatoire.',
            'property_loc.boolean' => 'Le champ "possibilité de colocation" doit être vrai ou faux.',

            'nombre_chambres.required' => 'Le nombre de chambres est obligatoire.',
            'nombre_chambres.integer' => 'Le nombre de chambres doit être un entier.',
            'nombre_chambres.min' => 'Le nombre de chambres doit être supérieur ou égal à 0.',

            'nombre_cuisine.required' => 'Le nombre de cuisines est obligatoire.',
            'nombre_cuisine.integer' => 'Le nombre de cuisines doit être un entier.',
            'nombre_cuisine.min' => 'Le nombre de cuisines doit être supérieur ou égal à 0.',

            'nombre_salon.required' => 'Le nombre de salons est obligatoire.',
            'nombre_salon.integer' => 'Le nombre de salons doit être un entier.',
            'nombre_salon.min' => 'Le nombre de salons doit être supérieur ou égal à 0.',

            'nombre_douches.required' => 'Le nombre de douches est obligatoire.',
            'nombre_douches.integer' => 'Le nombre de douches doit être un entier.',
            'nombre_douches.min' => 'Le nombre de douches doit être supérieur ou égal à 0.',

            'main_image.image' => 'L’image principale doit être un fichier image.',
            'main_image.mimes' => 'L’image principale doit être au format jpeg, png, jpg ou gif.',
            'main_image.max' => 'L’image principale ne peut pas dépasser 2 Mo.',

            'secondary_images.*.image' => 'Chaque image secondaire doit être un fichier image.',
            'secondary_images.*.mimes' => 'Chaque image secondaire doit être au format jpeg, png, jpg ou gif.',
            'secondary_images.*.max' => 'Chaque image secondaire ne peut pas dépasser 2 Mo.',

            'tags.array' => 'Les tags doivent être un tableau.',
            'tags.*.integer' => 'Chaque tag doit être un identifiant valide.',
            'tags.*.exists' => 'Un ou plusieurs tags sélectionnés sont invalides.',

            'assets.array' => 'Les atouts doivent être un tableau.',
            'assets.*.integer' => 'Chaque atout doit être un identifiant valide.',
            'assets.*.exists' => 'Un ou plusieurs atouts sélectionnés sont invalides.',
        ];
    }
}
