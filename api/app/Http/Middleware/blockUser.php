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


    try{
    $isBlocked=false;
    $id = Auth::user()->id;
    $found =DB::table('blocked_users')->where("isBlocked",true)->select("blockedUserId")->get();
    for ($x = 0; $x < count($found); $x++){
        if($found[$x]->blockedUserId === $id){
            $isBlocked=true;
        break;
        }
    }
        if ($isBlocked==true) {
            return  response()->json(['message' => 'You have been blocked']);
        }else{
         return $next($request);
    }}catch(Throwable $e){
        return $next($request);;
    }

    // $found =DB::table('blocked_users')->where("isBlocked",true)->select("blockedUserId")->get();
    // for ($x = 0; $x < count($found); $x++){

    //     return response()->json($found[0]->blockedUserId);
    // }


    // $id = Auth::user()->id;
    // // $found = DB::table('blocked_users')->where("blockedUserId",$id)->select("isBlocked")->get();
    // // // if ($found == null){
    // // //     $found=false;
    // // // }
    //     $found =DB::table('blocked_users')->where("isBlocked",true)->select("blockedUserId")->get();
    // $foundid=[];
    // for ($x = 0; $x < count($found); $x++){
    //     array_push($foundid,$found[$x]->blockedUserId);

    //     }
    //     return response()->json( $foundid);


    }
}
