<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function index(): JsonResponse
    {
        $users = Users::all();
        return response()->json($users);
    }
}
