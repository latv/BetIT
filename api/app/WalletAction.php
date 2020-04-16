<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WalletAction extends Model
{
    
    protected $fillable = [
        'wallet_id','action','change','remaining'
    ];
// get wallet action belong to
    public function wallet(){
        return $this->belongsTo(Wallet::class);
    }

}
