<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\Services\WalletService;

class WalletController extends Controller
{
    private $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function getAmount()
    {
        $userId = auth()->user()->id;

        return $this->walletService->getWallet($userId)->amount;
    }

    public function addAmount(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        $amount = $request->input('amount');
        
        $userId = auth()->user()->id;

        $this->walletService->addAmount($userId, $amount);
    
        return $this->walletService->getWallet($userId)->amount;
    }
    public function withdrawAmount(Request $request)
    {

        $validatedData = $request->validate([
            'amount' => 'required|numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        $amount = $request->input('amount');

        $userId = auth()->user()->id;

        $this->walletService->withdrawAmount($userId, $amount);
            try{

                $this->walletService->getWallet($userId)->amount;


            }catch(Exception $e){

                return response()->json(['error' => $e -> getMessage()], 422);

            }finally{

            }
        return $this->walletService->getWallet($userId)->amount;
    }
    public function getWalletActions(){

        $userId = auth()->user()->id;
        return $this->walletService->getWalletActions($userId);

    }
    
    
}
