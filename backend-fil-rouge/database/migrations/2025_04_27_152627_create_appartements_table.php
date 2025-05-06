<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Property;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appartements', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Property::class)->constrained()->onDelete('cascade');
            $table->string('appartement_name');
            $table->boolean('isAvalaible')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appartements', function (Blueprint $table) {
            $table->dropForeign(['property_id']);
        });	
        Schema::dropIfExists('appartements');
    }
};
