<?php

namespace App\Http\Controllers;

use App\Models\ClientsTours;
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
                        'boxes' => [],
                        'extras' => [],
                    ];
                }

                $res['clients'][$clientId]['boxes'][] = [
                    'is_delivered' => $tourBoxClient->is_delivered,
                    'quantity_box' => $tourBoxClient->boxesClientsTours->quantity_box,
                    'quantity_article' => $tourBoxClient->boxesClientsTours->box->quantity_article,
                    'article' => $tourBoxClient->boxesClientsTours->box->article->name,
                ];

                $boxesClientsTours = $tourBoxClient->boxesClientsTours;

                foreach ($boxesClientsTours as $boxClientTour) {
                    $extrasTours = $boxClientTour->extras;
                    foreach ($extrasTours as $extraTour) {
                        $isDelivered = ToursBoxesClients::where('box_id', $extraTour->box_id)->value('is_delivered');
                        $clientId = $boxClientTour->clientTour->client_id;

                        $res['clients'][$clientId]['extras'][] = [
                            'is_delivered' => $isDelivered,
                            'quantity_box' => $extraTour->quantity_box,
                            'quantity_article' => $extraTour->box->quantity_article,
                            'article' => $extraTour->box->article->name,
                        ];
                    }
                }
            } else {
                $res['rab'][] = [
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