<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'property_id',
        'user_id',
        'date_debut',
        'date_fin',
        'prix_location',
        'statut',
        'modalite_paiement',
    ];


    public function property()
    {
        return $this->belongsTo(Property::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}