<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organizacion extends Model
{
    use HasFactory;

    protected $table = 'organizaciones';

    protected $fillable = [
        'nombre_organizacion',
        'abreviatura',
        'email',
        'razon_social',
        'sitio_web',
        'telefono',
        'descripcion',
        'tipo_id',
        'country_id',
        'state_id',
        'convenio_id',
        'imagen_url'
    ];

    public function proyectos(): HasMany
    {
        return $this->hasMany(Proyecto::class, 'organizacion_id','id');
    }

    function proyectos_iniciados() : HasMany {
        return $this->hasMany(Proyecto::class)->where('estado_id', 1);
    }

    function proyectos_proceso() : HasMany {
        return $this->hasMany(Proyecto::class)->where('estado_id', 2);
    }

    function proyectos_finalizados() : HasMany {
        return $this->hasMany(Proyecto::class)->where('estado_id', 3);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($organizacion){
            $organizacion->proyectos->each->delete();
        });
    }
}
