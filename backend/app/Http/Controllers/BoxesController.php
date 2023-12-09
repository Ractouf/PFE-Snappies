<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Boxes;
use Illuminate\Http\Request;

class BoxesController extends Controller
{
    public function index()
    {
        return Boxes::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'quantity' => 'required',
            'clients_tours_id' => 'string',
            'article_id' => 'required',
        ]);

        return Boxes::create($fields);
    }

    public function show(string $id)
    {
        return Boxes::find($id);
    }

    public function update(Request $request, string $id)
    {
        return Boxes::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return Boxes::destroy($id);
    }
}
