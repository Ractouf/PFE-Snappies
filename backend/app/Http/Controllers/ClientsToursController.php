<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ClientsTours;
use Illuminate\Http\Request;

class ClientsToursController extends Controller
{
    public function store(Request $request)
    {
        $fields = $request->validate([
            'client_id' => 'required|string',
            'typical_tour_id' => 'required|string',
        ]);

        return ClientsTours::create($fields);
    }

    public function update(Request $request, string $id)
    {
        return ClientsTours::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return ClientsTours::destroy($id);
    }
}
