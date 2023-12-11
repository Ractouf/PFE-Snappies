<?php

namespace App\Http\Controllers;

use App\Models\ToursBoxesClients;
use App\Models\Boxes;
use App\Models\TypicalTours;
use App\Models\ExtraTours;
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

    public function createRow(string $tourId)
    {
        $typicalTour = TypicalTours::find($tourId);

        $clientTours = $typicalTour->clientsTours;

        $createdRows = [];

        foreach ($clientTours as $clientTour) {
            $boxes = $clientTour->boxesClientsTours;

            foreach ($boxes as $box) {
                $fields = [
                    'tour_id' => $tourId,
                    'client_id' => $clientTour->id,
                    'box_id' => $box->box_id
                ];

                $createdRow = ToursBoxesClients::create($fields);
                $createdRows[] = $createdRow;
            }
        }

        return response()->json($createdRows, 201);
    }
}
