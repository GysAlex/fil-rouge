<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\University;

class SearchController extends Controller
{
  /**
     * Filtrer les logements par université
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getAllProperties(Request $request)
    {
        $universityId = University::where('universitie_name', $request->university)->first()->id;

        return Property::where('university_id', $universityId)
        ->where('published', true)
        ->with(['images', "tags"])->get();
    }
}