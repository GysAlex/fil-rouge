<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Récupérer le rôle 'locataire'
        $locataireRole = Role::where('name', 'renter')->firstOrFail();

        // Créer 50 locataires et leur assigner le rôle
        User::factory()->count(50)->create()->each(function ($user) use ($locataireRole) {
            $user->roles()->attach($locataireRole);
        });

        $this->command->info('50 locataires fictifs créés et le rôle "locataire" leur a été assigné !');
    }
}
