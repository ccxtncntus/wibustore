<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class commentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $username;
    public $idProduct;
    public $message;

    public function __construct($username, $idProduct)
    {
        $this->username = $username;
        $this->idProduct = $idProduct;
        $this->message = "{$username} comment {$idProduct}";
    }

    public function broadcastOn(): array
    {
        return ['comment'];
    }
    public function broadcastAs()
    {
        return 'message';
    }
}
