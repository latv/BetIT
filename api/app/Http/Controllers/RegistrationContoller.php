<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
class RegistrationContoller extends Controller
{
    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'last_name' => 'required',
            'birthday' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::create(request(['name', 'email', 'password']));

        auth()->login($user);

        return redirect()->to('/games');
    }
}
