<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ForgotPassMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mailData;
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
        $this->subject('Wibushop');
    }
    public function content(): Content
    {
        return new Content(
            view: 'emails.pass',
        );
    }
}
