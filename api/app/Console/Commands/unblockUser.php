<?php

namespace App\Console\Commands;
use Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

class unblockUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'unblock:id {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Unblock user by id';

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
        DB::table('blocked_users')->where(
            'blockedUserId',(int)$this->argument('id'))->update(['isBlocked' => false]
        );
        $this->info("done".$this->argument('id'));
    }
}
