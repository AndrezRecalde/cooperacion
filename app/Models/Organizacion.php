<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function proyectos()
    {
        return $this->hasMany(Proyecto::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($organizacion){
            $organizacion->proyectos->each->delete();
        });
    }
}
