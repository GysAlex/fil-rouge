<?php

namespace App\Http\Controllers;

use App\Models\PropertyTag;
use App\Http\Requests\StorePropertyTagsRequest;
use App\Http\Requests\UpdatePropertyTagsRequest;

class PropertyTagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propertyTags = PropertyTag::all();
        return response()->json($propertyTags);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyTagsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyTag $propertyTag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyTagsRequest $request, PropertyTag $propertyTags)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyTags $propertyTag)
    {
        //
    }
}
