<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class DirEmail extends Model
{
    use HasFactory;

    protected $table = 'dir_emails';

    protected $fillable = [
        'email',
        'emailable_id',
        'emailable_type'
    ];

    public function emailable(): MorphTo
    {
        return $this->morphTo();
    }
}
