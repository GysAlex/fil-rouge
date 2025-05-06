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
        Schema::table('properties', function (Blueprint $table) {
            $table->double('property_price');
            $table->dropColumn('property_quarter');
            $table->renameColumn('property_town', 'property_region');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn('property_price');
            $table->string('property_quarter')->nullable();
            $table->renameColumn('property_region', 'property_town');
        });
        
    }
};
