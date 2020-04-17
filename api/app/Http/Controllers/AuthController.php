<?php

namespace App\Http\Controllers;
use App\Services\RegisterService;
use Illuminate\Http\Request;
use App\User;
use App\Wallet;
use Validator;
class AuthController extends Controller
{
    private $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    public function login(Request $request)
    {
        $input = $request->only('username', 'password');
        $token = null;

        if (!$token = auth()->attempt($input)) {
            return response()->json([
                'message' => 'Invalid Username or Password',
            ], 401);
        }

        return response()->json([
            'token' => $token,
            'expiresIn' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function register(Request $request){


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required',


                ]);
        if ($validator->fails()) {
                    return response()->json(['error'=>$validator->errors()], 401);
                }
                $input = $request->all();
                $input['password'] = bcrypt($input['password']);
                $user = User::create($input);

                    $wallet = new Wallet(
                        [
                            'user_id'=> $user->id
                        ]
                        );
                    $wallet->save();


                return response()->json(['message'=>'Successfully registered']);
            }

    public function logout(Request $request)
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(Request $request)
    {
        $newToken = auth()->refresh();

        return response()->json([
            'token' => $newToken,
            'expiresIn'   => auth()->factory()->getTTL() * 60
        ]);
    }

    public function me(Request $request)
    {
        $user = auth()->user();

        return response()->json($user);
    }
}
