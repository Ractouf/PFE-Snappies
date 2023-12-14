<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BoxesClientsTours;
use Illuminate\Http\Request;

class BoxesClientsToursController extends Controller
{
    public function storeBox(Request $request)
    {
        $fields = $request->validate([
            'box_id' => 'required',
            'client_tour_id' => 'required',
            'quantity_box' => 'required',
        ]);

        $created = BoxesClientsTours::create($fields);

        $created->load('box.article');
        return $created;
    }

    public function storeRab(Request $request)
    {
        $fields = $request->validate([
            'typical_tour_id' => 'required',
            'quantity_box' => 'required',
            'box_id' => 'required',
        ]);

        return BoxesClientsTours::create($fields);
    }

    public function updateQuantityBox(Request $request, string $id)
    {
        return BoxesClientsTours::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return BoxesClientsTours::destroy($id);
    }
}
