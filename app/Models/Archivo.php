<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Archivo extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'afiliacion_id'
    ];

    public function afiliacion(): BelongsTo
    {
        return $this->belongsTo(Afiliacion::class);
    }
}
