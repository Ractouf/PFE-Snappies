<?php

namespace App\Http\Controllers;

use App\Models\Tours;
use App\Models\ToursBoxesClients;
use App\Models\TypicalTours;
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

    public function getTour(string $tourId, string $deliveryDriverId, string $date)
    {
        $tour = Tours::where('id', $tourId)
            ->where('delivery_driver_id', $deliveryDriverId)
            ->whereDate('date', $date)
            ->first();

        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        $toursBoxesClients = $tour->toursBoxesClients;

        $res = ['clients' => []];
        foreach ($toursBoxesClients as $tourBoxClient) {
            $client = $tourBoxClient->client;
            if ($client) {
                $clientId = $client->id;

                if (!isset($res['clients'][$clientId])) {
                    $res['clients'][$clientId] = [
                        'name' => $client->name,
                        'address' => $client->address,
                        'phone' => $client->phone,
                        'boxes' => []
                    ];
                }

                $res['clients'][$clientId]['boxes'][] = [
                    'is_delivered' => $tourBoxClient->is_delivered,
                    'quantity_box' => $tourBoxClient->boxesClientsTours->quantity_box,
                    'quantity_article' => $tourBoxClient->boxesClientsTours->box->quantity_article,
                    'article' => $tourBoxClient->boxesClientsTours->box->article->name,
                ];
            } else {
                $res['extra'][] = [
                    'is_delivered' => $tourBoxClient->is_delivered,
                    'quantity_box' => $tourBoxClient->boxesClientsTours->quantity_box,
                    'quantity_article' => $tourBoxClient->boxesClientsTours->box->quantity_article,
                    'article' => $tourBoxClient->boxesClientsTours->box->article->name,
                ];
            }
        }

        $res['clients'] = array_values($res['clients']);
        return response()->json($res);
    }
}
