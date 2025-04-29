<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;
use App\Models\University;
use App\Models\PropertyTags;
use App\Models\PropertyImage;

class Property extends Model
{
    /** @use HasFactory<\Database\Factories\PropertyFactory> */
    use HasFactory;
    
    protected $fillable= [
        'property_name',
        'property_description',
        'property_price',
        'property_quarter',
        'property_town',
        'nombre_chambres',
        'nombre_cuisine',
        'nombre_salon',
        'nombre_douche',
        'type',
        'university_id'
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function tags()
    {
        return $this->belongsToMany(PropertyTags::class);
    }

    public function assets()
    {
        return $this->belongsToMany(Asset::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }
}
