<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tours;
use App\Models\ToursBoxesClients;
use App\Models\TypicalTours;
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

        $tourId = Tours::create($fields)->id;

        $typicalTour = TypicalTours::find($fields['typical_tour_id']);

        $boxesClientsTours = $typicalTour->boxesClientsTours;

        $createdRows = [];
        foreach ($boxesClientsTours as $boxClientTour) {
            $clientTour = $boxClientTour->clientTour;
            $clientId = null;
            if ($clientTour) {
                $clientId = $clientTour->client_id;
            }

            $createdRow = ToursBoxesClients::create([
                'tour_id' => $tourId,
                'client_id' => $clientId,
                'box_id' => $boxClientTour->box_id
            ]);

            $createdRows[] = $createdRow;
        }

        $clientTours = $typicalTour->clientsTours;
        foreach ($clientTours as $clientTour) {
            $boxes = $clientTour->boxesClientsTours;

            foreach ($boxes as $box) {
                $createdRow = ToursBoxesClients::create([
                    'tour_id' => $tourId,
                    'client_id' => $clientTour->id,
                    'box_id' => $box->box_id
                ]);

                $createdRows[] = $createdRow;
            }
        }

        return response()->json($createdRows, 201);
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
