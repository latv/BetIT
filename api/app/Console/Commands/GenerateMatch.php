<?php

namespace App\Console\Commands;
use App\Team;
use Illuminate\Console\Command;
use App\Match;
use Carbon\Carbon;
use App\Services\MatchService;
class GenerateMatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'match:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to generate a new match between 2 random team';
    private $matchService;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct( matchService $matchService)
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
        $this->matchService->generateMatch();
        $this ->info('Match Generated');
    }
}
