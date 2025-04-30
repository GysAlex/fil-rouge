<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Property;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Property::class)->constrained()->onDelete('CASCADE');
            $table->foreignIdFor(User::class)->nullable()->constrained()->onDelete('SET NULL');
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->decimal('prix_location', 12, 2);
            $table->enum('statut', ['en_cours', 'terminé', 'résilié', 'à_venir'])->default('en_cours');
            $table->text('modalite_paiement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
