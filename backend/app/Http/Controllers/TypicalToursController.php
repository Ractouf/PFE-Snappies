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

    public function showByName(string $name)
    {
        $typicalTour = TypicalTours::where('name', $name)->first();

        if (!$typicalTour) {
            return response()->json([
                'message' => 'Typical tour not found',
            ], 404);
        }

        $clientsTours = $typicalTour->clientsTours;

        $typicalTourRes = [];
        foreach ($clientsTours as $clientsTour) {
            $client = $clientsTour->client;

            $boxes = $clientsTour->boxes;
            foreach ($boxes as $box) {
                $box['article'] = $box->article;
            }
            $client['boxes'] = $boxes;

            $typicalTourRes[] = $client;
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
