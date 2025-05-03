<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class FavoritesSeeder extends Seeder
{
    public function run(): void
    {
        $propertyId = 7;

        // Ajoute 10 utilisateurs en favoris pour le logement dont l'ID est 7
        for ($userId = 3; $userId <= 10; $userId++) {
            DB::table('property_user')->insert([
                'property_id' => $propertyId,
                'user_id'     => $userId,
            ]);
        }
    }
}