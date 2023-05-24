<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;

    protected $fillable = [
        'maxima_autoridad',
        'fecha_inicial',
        'fecha_final',
        'activo'
    ];
}
