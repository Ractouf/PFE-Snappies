<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index()
    {
        return Users::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'lastname' => 'required',
            'firstname' => 'required',
            'phone' => 'required|unique:users,phone',
            'is_admin' => 'required|boolean',
        ]);

        if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
            return response([
                'message' => 'Invalid email'
            ], 400);
        }

        if (preg_match('/^04[0-9]{8}$/', $fields['phone'])) {
            $fields['phone'] = '+32' . substr($fields['phone'], 1);
        }

        // check if phone is valid or throw error
        if (!preg_match('/^\+?\d{11}$/', $fields['phone'])) {
            return response([
                'message' => 'Invalid phone number'
            ], 400);
        }

        $user = Users::create(
            [
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'lastname' => $fields['lastname'],
                'firstname' => $fields['firstname'],
                'phone' => $fields['phone'],
                'is_admin' => $fields['is_admin'],
            ]
        );

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function show(string $id)
    {
        return Users::find($id);
    }

    public function update(Request $request, string $id)
    {
        return Users::find($id)->update($request->all());
    }

    public function destroy(string $id)
    {
        return Users::destroy($id);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = Users::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }

        $userRole = $user->is_admin ? 'admin' : 'user';

        $token = $user->createToken('myapptoken', [$userRole])->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
}
