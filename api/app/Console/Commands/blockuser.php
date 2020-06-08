<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
class blockuser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'block:id {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'block specific user by id';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::table('blocked_users')->insert(
            ['blockedUserId' => (int)$this->argument('id'), 'isBlocked' => true]
        );
        $this->info("done,blocked id: ".$this->argument('id'));

    }
}
