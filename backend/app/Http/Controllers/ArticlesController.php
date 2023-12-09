<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Articles;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Articles::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'size' => 'string',
        ]);

        return Articles::create($fields);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Articles::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return Articles::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Articles::destroy($id);
    }
}
