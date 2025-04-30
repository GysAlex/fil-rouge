<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Property;

class PropertyTag extends Model
{
    /** @use HasFactory<\Database\Factories\PropertyTagsFactory> */
    use HasFactory;

    protected $fillable = [
        'tag_name',
    ];

    public function properties()
    {
        return $this->belongsToMany(Property::class);
    }

}
