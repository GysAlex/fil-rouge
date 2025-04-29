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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_name')->unique();
            $table->timestamps();
        });

        Schema::create('asset_property', function (Blueprint $table) {
            $table->primary(['property_id', 'asset_id']);
            $table->foreignId('property_id')->constrained()->nullable()->onDelete('cascade');
            $table->foreignId('asset_id')->constrained()->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_property');
        Schema::dropIfExists('assets');
    }
};
