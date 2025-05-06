<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Property;

class Asset extends Model
{
    protected $fillable = [
        'asset_name',
    ];

    public function properties()
    {
        return $this->belongsToMany(Property::class);
    }
}
