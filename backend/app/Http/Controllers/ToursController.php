<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tours;
use Illuminate\Http\Request;

class ToursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Tours::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'date' => 'required',
            'delivery_driver_id' => 'required',
            'typical_tour_id' => 'required',
        ]);

        return Tours::create([
            'date' => $fields['date'],
            'delivery_driver_id' => $fields['delivery_driver_id'],
            'typical_tour_id' => $fields['typical_tour_id'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Tours::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return Tours::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Tours::destroy($id);
    }
}
