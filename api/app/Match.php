<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'team_1', 'team_2', 'team_1_win_chance', 'team_2_win_chance', 'draw_chance','team_1_win_coef',
        'team_2_win_coef', 'draw_coef', 'time'
    ];
    protected $hidden = [
        'draw_chance'
    ];

    //get the bets that belongs to matches
    public function bets()
    {
        return $this->hasMany(Bet::class);
    }
// returns QeuryBulder
public static function withPersonalBets($userId)
{
    return self::leftJoin('bets', function ($join) use ($userId) {
            $join
                ->on('matches.id', '=', 'bets.match_id')
                ->where('bets.user_id', $userId);
        })
        ->select('matches.*', 'bets.amount');
}
}
