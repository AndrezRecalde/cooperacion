<?php

namespace App\Mail;

use App\Models\Afiliacion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AfiliacionMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $afiliacion;

    /**
     * Create a new message instance.
     */
    public function __construct(Afiliacion $afiliacion)
    {
        $this->afiliacion = $afiliacion;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'NUEVA SOLICITUD - RED AFILIACIÓN',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.afiliacion',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
