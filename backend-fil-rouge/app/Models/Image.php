<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class Image extends Model
{

    protected $fillable = [
        'image_path',
        'is_main'
    ];

    public function getUrl()
    {
        return Storage::url($this->image_path);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
