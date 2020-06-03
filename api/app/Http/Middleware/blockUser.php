<?php


namespace App\Http\Middleware;
use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Support\Facades\Auth;
use App\User;
class blockUser
{


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    //     if (DB::table('blocked_users')->where("blockedUserId")->value(Auth::user()->id)) {
    //         return  response()->json(['message' => 'You ar blocked']);
    //     }else{

    //      return $next($request);
    // }


    $id = Auth::user()->id;
    $isfound = DB::table('blocked_users')->where("blockedUserId",$id)->get();

    return response()->json(['token', $id],
                            ["is found in databse",$isfound]);
    }
}
