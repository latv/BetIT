<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Exception;
use App\Services\MatchService;


class SimulateUpcomingMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'match:simulate-upcoming';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'simulates all upcoming matches in the past';
    private $matchService;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(MatchService $matchService)
    {

        $this->matchService = $matchService;
        parent::__construct();

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        try {
            $matches = $this->matchService->getUpcomingMatches();

            foreach ($matches as $match) {
                $this->info('Attempting to simulate match between ' . $match->team_1 . ' and ' . $match->team_2);
                $this->matchService->simulateMatch($match->id);
                $this->info('Match between ' . $match->team_1 . ' and ' . $match->team_2 .' simulated');
            }
        } catch (Exception $e) {
            $this->error($e->getMessage());
        }

    }
}
