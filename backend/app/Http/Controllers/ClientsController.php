<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function index()
    {
        return Clients::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'address' => 'required|unique:clients,address',
            'phone' => 'required|unique:clients,phone',
        ]);

        return Clients::create($fields);
    }

    public function show(string $id)
    {
        return Clients::find($id);
    }

    public function update(Request $request, string $id)
    {
        return Clients::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return Clients::destroy($id);
    }
}
