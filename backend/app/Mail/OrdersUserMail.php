<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrdersUserMail extends Mailable
{
    use Queueable, SerializesModels;

    public $dataOrders;
    public function __construct($dataOrders)
    {
        $this->dataOrders = $dataOrders;
        $this->subject('WibuStore');
    }
    public function content(): Content
    {
        return new Content(
            view: 'emails.orders',
        );
    }
}
