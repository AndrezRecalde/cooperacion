<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Afiliacion extends Model
{
    use HasFactory;

    protected $table = 'afiliaciones';

    protected $fillable = [
        'nombres',
        'entidad',
        'cargo',
        'telefono',
        'email',
        'razon_social',
        'sitio_web',
        'telefono_org',
        'direccion_org',
        'descripcion_org',
        'contactado'
    ];


    public function archivos(): HasMany
    {
        return $this->hasMany(Archivo::class);
    }

    protected static function boot(){
        parent::boot();

        static::deleting(function($afiliacion){
            $afiliacion->archivos->each->delete();
        });
    }
}
