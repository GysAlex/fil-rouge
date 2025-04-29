<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    public function getUrl()
    {
        return Storage::url($this->image_path);
    }
}
