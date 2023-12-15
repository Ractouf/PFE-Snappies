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
            'delivery_driver_id' => 'required',
            'typical_tour_id' => 'required',
        ]);

        $tourId = Tours::create([
                  'date' => date('d/m/y'),
                  'delivery_driver_id' => $fields['delivery_driver_id'],
                  'typical_tour_id' => $fields['typical_tour_id'],
                  ]);

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
                'box_id' => $boxClientTour->box_id,
                'quantity_box' => $boxClientTour->quantity_box
            ]);

            $createdRows[] = $createdRow;
        }

        $clientTours = $typicalTour->clientsTours;
        foreach ($clientTours as $clientTour) {
            $boxes = $clientTour->boxesClientsTours;

            foreach ($boxes as $box) {
                $createdRow = ToursBoxesClients::create([
                    'tour_id' => $tourId,
                    'client_id' => $clientTour->client_id,
                    'box_id' => $box->box_id,
                    'quantity_box' => $box->quantity_box
                ]);

                $createdRows[] = $createdRow;
            }
        }

        return response()->json($tourId, 201);
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

    public function getAvailableTour()
    {
        $typicalTours = TypicalTours::all();
        // get the typical_tour_id of the tours of today
        $tours = Tours::where('date', date('d/m/y'))->get();
        $typicalToursId = [];
        foreach ($tours as $tour) {
            $typicalToursId[] = $tour->typical_tour_id;
        }

        $availableTours = [];

        foreach ($typicalTours as $typicalTour) {
            if (!in_array($typicalTour->id, $typicalToursId)) {
                $availableTours[] = $typicalTour;
            }
        }

        return $availableTours;
    }
}
