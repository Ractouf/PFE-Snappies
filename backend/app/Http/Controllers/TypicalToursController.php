<?php

namespace App\Http\Controllers;

use App\Models\TypicalTours;
use Illuminate\Http\Request;

class TypicalToursController extends Controller
{
    public function index()
    {
        return TypicalTours::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|unique:typical_tours,name',
        ]);

        return TypicalTours::create($fields);
    }

    public function getOne(string $id)
    {
        $typicalTour = TypicalTours::find($id);

        if (!$typicalTour) {
            return response()->json([
                'message' => 'Typical tour not found',
            ], 404);
        }

        $clientsTours = $typicalTour->clientsTours;

        $typicalTourRes = [];
        foreach ($clientsTours as $clientsTour) {
            $client = $clientsTour->client;

            $boxesClientsTours = $clientsTour->boxesClientsTours;

            $clientBoxes = [];
            foreach ($boxesClientsTours as $boxes) {
                $boxes['box'] = $boxes->box;
                $boxes['box']['article'] = $boxes->box->article;
                $clientBoxes[] = $boxes;
            }

            $client['boxes'] = $clientBoxes;

            $typicalTourRes[] = [
                'id' => $clientsTour->id,
                'client' => $client,
            ];
        }

        return $typicalTourRes;
    }

    public function update(Request $request, string $id)
    {
        return TypicalTours::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return TypicalTours::destroy($id);
    }
}
