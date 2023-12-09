<?php

namespace App\Http\Controllers;

use App\Models\ToursBoxesClients;
use Illuminate\Http\Request;

class ToursBoxesClientsController extends Controller
{
    public function index()
    {
        return ToursBoxesClients::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'is_delivered' => 'required|boolean',
            'tour_id' => 'required|string',
            'client_id' => 'required|string',
            'box_id' => 'required|string',
        ]);

        return ToursBoxesClients::create($fields);
    }

    public function show(string $id)
    {
        return ClientsToursController::find($id);
    }

    public function update(Request $request, string $id)
    {
        return ClientsToursController::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return ClientsToursController::destroy($id);
    }
}
