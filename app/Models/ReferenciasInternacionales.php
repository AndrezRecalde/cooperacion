<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferenciasInternacionales extends Model
{
    use HasFactory;

    protected $table = 'referencias_internacionales';

    protected $fillable = [
        'latitud',
        'longitud',
        'state_id'
    ];
}
