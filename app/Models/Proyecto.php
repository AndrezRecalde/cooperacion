<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Proyecto extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizacion_id',
        'nombre_proyecto',
        'objetivo_general',
        //'canton_id',
        'parroquia_id',
        'recinto_id',
        //'grupo_atencion_id',
        'beneficiados_directos',
        'beneficiados_indirectos',
        //'odsostenible_id',
        'cooperacion_id',
        'modalidad_id',
        'monto',
        'estado_id',
        'periodo_id',
        'activo'
    ];

    protected $hidden = ['pivot'];

    public function odsostenibles(): BelongsToMany
    {
        return $this->belongsToMany(Odsostenible::class);
    }

    public function grupos(): BelongsToMany
    {
        return $this->belongsToMany(GrupoAtencion::class, 'grupo_proyecto', 'proyecto_id', 'grupo_atencion_id');
    }

    public function cantones(): BelongsToMany
    {
        return $this->belongsToMany(Canton::class);
    }

    public function scopeCanton($query, $canton)
    {
        if ($canton) {
            return $query->where('cp.canton_id', $canton);
        }
    }

    public function scopeParroquia($query, $parroquia)
    {
        if ($parroquia) {
            return $query->where('p.parroquia_id', $parroquia);
        }
    }

    public function scopeRecinto($query, $recinto)
    {
        if ($recinto) {
            return $query->where('p.recinto_id', $recinto);
        }
    }
    public function scopeObjetivo($query, $objetivo)
    {
        if ($objetivo) {
            return $query->where('op.odsostenible_id', $objetivo);
        }
    }

    public function scopeOrganizacion($query, $organizacion)
    {
        if($organizacion){
            return $query->where('p.organizacion_id', $organizacion);
        }
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function($proyecto){
            $proyecto->cantones()->detach();
            $proyecto->odsostenibles()->detach();
            $proyecto->grupos()->detach();
        });
    }
}
