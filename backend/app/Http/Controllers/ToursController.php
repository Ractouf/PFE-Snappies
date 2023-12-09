<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tours;
use Illuminate\Http\Request;

class ToursController extends Controller
{

    public function index()
    {
        return Tours::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'date' => 'required',
            'delivery_driver_id' => 'required',
            'typical_tour_id' => 'required',
        ]);

        return Tours::create($fields);
    }

    public function show(string $id)
    {
        return Tours::find($id);
    }

    public function showByDateAndDriver(string $date, string $driverId)
    {
        return Tours::where('date', $date)->where('delivery_driver_id', $driverId)->get();
    }

    public function update(Request $request, string $id)
    {
        return Tours::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return Tours::destroy($id);
    }
}
