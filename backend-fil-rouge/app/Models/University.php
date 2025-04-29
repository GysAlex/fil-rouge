<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Property;

class University extends Model
{
    protected $fillable = [
        'universitie_name',
        'region_id',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }


}
