<?php

namespace App\Http\Controllers;

use App\Models\PropertyTags;
use App\Http\Requests\StorePropertyTagsRequest;
use App\Http\Requests\UpdatePropertyTagsRequest;

class PropertyTagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propertyTags = PropertyTags::all();
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
    public function show(PropertyTags $propertyTags)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyTagsRequest $request, PropertyTags $propertyTags)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyTags $propertyTags)
    {
        //
    }
}
