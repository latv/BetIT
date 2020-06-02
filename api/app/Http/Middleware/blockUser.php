<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\DB;
use Closure;
use api\app\User;
class blockUser
{
    public function __construct(User $user)
    {
        $this->User = $user;
        parent::__construct();
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if (DB::table('blocked_users')->where("blockedUserId")->value(auth('api')->user())) {
        //     return  response()->json(['message' => 'You ar blocked']);
        // }else{

         return $next($request);
    // }
        // $user = $this->$user->getJWTIdentifier();

        // return response()->json(compact('token', $user));
    }
}
