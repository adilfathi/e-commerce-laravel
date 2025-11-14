<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;

class CheckExpiredOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:check-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check and mark expired unpaid orders as failed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredOrders = Order::where('payment_status', 'pending')
            ->whereNotNull('payment_expires_at')
            ->where('payment_expires_at', '<', now())
            ->get();

        $count = 0;
        foreach ($expiredOrders as $order) {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);
            $count++;
        }

        if ($count > 0) {
            $this->info("Marked {$count} expired order(s) as failed.");
        } else {
            $this->info('No expired orders found.');
        }

        return Command::SUCCESS;
    }
}
