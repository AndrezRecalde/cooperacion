<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Odsostenible extends Model
{
    use HasFactory;

    protected $fillable = [
        'objetivo_ods',
        'descripcion',
        'logo_url',
        'banner_url'
    ];

    protected $hidden = ['pivot'];

    public function proyectos(): BelongsToMany
    {
        return $this->belongsToMany(Proyecto::class);
    }
}
