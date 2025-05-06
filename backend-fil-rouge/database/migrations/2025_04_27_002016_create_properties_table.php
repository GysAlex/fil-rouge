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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('property_name')->unique();
            $table->string('property_description');
            $table->string('property_quarter');
            $table->string('property_town');
            $table->integer('nombre_chambres')->default(0);
            $table->integer('nombre_douches')->default(0);
            $table->integer('nombre_salon')->default(0);
            $table->integer('nombre_cuisine')->default(0);
            $table->enum('type', ['studio', 'immeuble', 'appartement', 'cités', 'chambre']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
