<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cooperacion extends Model
{
    use HasFactory;

    protected $table = 'cooperaciones';

    protected $fillable = [
        'tipo_cooperacion',
        'activo'
    ];
}
