<?php

namespace App\Http\Controllers;

use App\Models\TypicalTours;
use Illuminate\Http\Request;

class TypicalToursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TypicalTours::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
        ]);

        return TypicalTours::create([
            'name' => $fields['name'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return TypicalTours::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return TypicalTours::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return TypicalTours::destroy($id);
    }
}
