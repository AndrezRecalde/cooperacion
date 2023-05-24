<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class DirPrefectura extends Model
{
    use HasFactory;

    protected $table = 'dir_prefecturas';

    protected $fillable = [
        'provincia_id',
        'direccion',
        'prefecto',
        'viceprefecto',
        'gobernador',
    ];

    public function telefonos():MorphMany
    {
        return $this->morphMany(DirTelefono::class, 'telefonoable');
    }

    public function emails():MorphMany
    {
        return $this->morphMany(DirEmail::class, 'emailable');

    }
}
