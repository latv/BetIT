<?php

namespace App\Services;

use App\User;

use Exception;

class RegisterService
{
    public function store($userId)
    {
        $userName = User::where('username', $userId)->firstOrFail();
        return $userName;
    }

    // public function addAmount($userId, $amount)
    // {
    //     $wallet = $this->getWallet($userId);
    //     $wallet->amount += $amount;

    //     $wallet->save();

    //     $this->createAction($wallet->id, 'addAmount', $amount, $wallet->amount);
    // }

    // public function withdrawAmount($userId, $amount)
    // {
    //     $wallet = $this->getWallet($userId);

    //     if ($wallet->amount < $amount) {
    //         throw new Exception('Cannot withdraw this amount');
    //     }

    //     $wallet->amount -= $amount;

    //     $wallet->save();

    //     $this->createAction($wallet->id, 'withdrawAmount', -$amount, $wallet->amount);
    // }

    // public function createAction($walletId, $action, $change, $remaining)
    // {
    //     $walletAction = new WalletAction([
    //         'wallet_id' => $walletId,
    //         'action' => $action,
    //         'change' => $change,
    //         'remaining' => $remaining
    //     ]);
    //     $walletAction->save();
    // }

    // public function getWalletActions($userId)
    // {
    //     $wallet = $this->getWallet($userId);

    //     return $wallet->walletActions()->orderBy('created_at', 'desc')->get();
    // }

    // public function makeBet($userId, $amount)
    // {
    //     $wallet = $this->getWallet($userId);

    //     if ($wallet->amount < $amount) {
    //         throw new Exception('Cannot make a bet of this amount');
    //     }

    //     $wallet->amount -= $amount;

    //     $wallet->save();

    //     $this->createAction($wallet->id, 'makeBet', -$amount, $wallet->amount);
    // }

    // public function awardBet($userId, $amount)
    // {
    //     $wallet = $this->getWallet($userId);

    //     $wallet->amount += $amount;

    //     $wallet->save();

    //     $this->createAction($wallet->id, 'awardBet', $amount, $wallet->amount);
    // }
}
