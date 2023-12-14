<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Boxes;
use Illuminate\Http\Request;

class BoxesController extends Controller
{
    public function index()
    {
        $allboxes = Boxes::with('article')->get();
        return $allboxes;
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'quantity_article' => 'required',
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
