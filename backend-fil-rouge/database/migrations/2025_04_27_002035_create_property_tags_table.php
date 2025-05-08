<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('property_tags', function (Blueprint $table) {
            $table->id();
            $table->string('tag_name')->unique();
            $table->timestamps();
        });

        Schema::create('property_property_tag', function (Blueprint $table) {
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->foreignId('property_tag_id')->constrained()->onDelete('cascade');
            $table->primary(['property_id', 'property_tag_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Désactiver temporairement les contraintes de clé étrangère
        Schema::disableForeignKeyConstraints();

        DB::table('property_property_tag')->truncate();
        DB::table('property_tags')->truncate();

        // Supprimer les tables dans le bon ordre
        Schema::dropIfExists('property_property_tag');
        Schema::dropIfExists('property_tags');

        // Réactiver les contraintes de clé étrangère
        Schema::enableForeignKeyConstraints();
    }
};
