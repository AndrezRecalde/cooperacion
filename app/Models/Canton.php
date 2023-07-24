<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Canton extends Model
{
    use HasFactory;

    protected $table = 'cantones';

    public function proyectos(): BelongsToMany
    {
        return $this->belongsToMany(Proyecto::class);
    }
}
