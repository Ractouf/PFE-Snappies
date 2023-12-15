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
                  'date' => date('y-m-d'),
                  'delivery_driver_id' => $fields['delivery_driver_id'],
                  'typical_tour_id' => $fields['typical_tour_id'],
                  ]);

        $typicalTour = TypicalTours::find($fields['typical_tour_id']);

        $boxesClientsTours = $typicalTour->boxesClientsTours;

        foreach ($boxesClientsTours as $boxClientTour) {
            $clientTour = $boxClientTour->clientTour;
            $clientId = null;
            if ($clientTour) {
                $clientId = $clientTour->client_id;
            }

            ToursBoxesClients::create([
                'tour_id' => $tourId->id,
                'client_id' => $clientId,
                'box_id' => $boxClientTour->box_id,
                'quantity_box' => $boxClientTour->quantity_box
            ]);
        }

        $clientTours = $typicalTour->clientsTours;
        foreach ($clientTours as $clientTour) {
            $boxes = $clientTour->boxesClientsTours;

            foreach ($boxes as $box) {
                ToursBoxesClients::create([
                    'tour_id' => $tourId->id,
                    'client_id' => $clientTour->client_id,
                    'box_id' => $box->box_id,
                    'quantity_box' => $box->quantity_box
                ]);
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
        $tours = Tours::where('date', $date)->where('delivery_driver_id', $driverId)->get();

        $toursWithNames = [];
        foreach ($tours as $tour) {
            $tourName = TypicalTours::find($tour->typical_tour_id)->name;
            $tour['name'] = $tourName;
            $toursWithNames[] = $tour;
        }

        return response()->json($toursWithNames, 200);
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

    public function getTodayByUserId(Request $request)
    {
        $fields = $request->validate([
            'driver_id' => 'required',
        ]);

        $tour = Tours::where('date', date('d/m/y'))->where('delivery_driver_id', $fields['driver_id'])->first();
        $tourName = TypicalTours::find($tour->typical_tour_id)->name;
        return response()->json(['tour' => $tour, 'tourName' => $tourName], 200);
    }
}
