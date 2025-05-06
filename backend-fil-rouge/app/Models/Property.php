<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;
use App\Models\University;
use App\Models\PropertyTag;
use App\Models\Image;
use App\Models\Contract;
use App\Models\Property;
use App\Models\User;

class Property extends Model
{
    /** @use HasFactory<\Database\Factories\PropertyFactory> */
    use HasFactory;
    
    protected $fillable= [
        'property_name',
        'property_description',
        'property_price',
        'property_region',
        'nombre_chambres',
        'nombre_cuisine',
        'nombre_salon',
        'nombre_douches',
        'user_id',
        'type',
        'university_id',
        'published',
        'coloc',
        'published_at'
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function tags()
    {
        return $this->belongsToMany(PropertyTag::class);
    }

    public function assets()
    {
        return $this->belongsToMany(Asset::class);
    }


    public function images()
    {
        return $this->hasMany(Image::class);
    }

    
    public function contracts()
    {
        return $this->HasMany(Contract::class);
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'property_user', 'property_id', 'user_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
