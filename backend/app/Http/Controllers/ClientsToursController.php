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

        $clientsTours = ClientsTours::create($fields);

        return response()->json(['message' => 'ClientsTours created successfully', 'data' => $clientsTours], 201);
    }

    public function update(Request $request, string $id)
    {
        return ClientsTours::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return ClientsTours::destroy($id);
    }

    public function getByClientId(string $clientId)
    {
        try {
            $clientsTours = ClientsTours::where('client_id', $clientId)->first();
            if (!$clientsTours) {
                return response()->json(['message' => 'ClientsTours record not found', 'data' => false], 200);
            }
            return response()->json(['message' => 'ClientsTours record found', 'data' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching ClientsTours data', 'error' => $e->getMessage()], 500);
        }
    }

}
