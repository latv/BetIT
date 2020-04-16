<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    //
    protected $fillable = [
        'user_id', 'match_id', 'amount', 'result', 'coef'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
