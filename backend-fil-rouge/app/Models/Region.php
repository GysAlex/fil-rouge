<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\University;

class Region extends Model
{
    protected $fillable = [
        'region_name',
    ];


    public function universities()
    {
        return $this->hasMany(University::class);
    }
}
