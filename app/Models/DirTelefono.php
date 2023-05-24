<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class DirTelefono extends Model
{
    use HasFactory;

    protected $table = 'dir_telefonos';

    protected $fillable = [
        'telefono',
        'telefonoable_id',
        'telefonoable_type'
    ];


    public function telefonoable(): MorphTo
    {
        return $this->morphTo();
    }
}
