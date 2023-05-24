<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class GrupoAtencion extends Model
{
    use HasFactory;

    protected $table = 'grupo_atenciones';

    protected $hidden = ['pivot'];

    public function proyectos(): BelongsToMany
    {
        return $this->belongsToMany(Proyecto::class, 'grupo_proyecto', 'grupo_atencion_id', 'proyecto_id');
    }
}
