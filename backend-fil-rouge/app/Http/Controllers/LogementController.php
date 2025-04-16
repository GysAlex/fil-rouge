<?php

namespace App\Http\Controllers;

use App\Models\Logement;
use App\Http\Requests\StoreLogementRequest;
use App\Http\Requests\UpdateLogementRequest;

class LogementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLogementRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Logement $logement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLogementRequest $request, Logement $logement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logement $logement)
    {
        //
    }
}
