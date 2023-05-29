<?php

namespace App\Repositories;

use App\Interfaces\AfiliacionInterface;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AfiliacionRepository implements AfiliacionInterface
{
    public function getDirector(): object
    {
        $director = User::from('users as u')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->where('mhr.role_id', 2)
            ->first(['u.email']);

        return $director;
    }

    public function getAsistente(): object
    {
        $asistente = User::from('users as u')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->where('mhr.role_id', 3)
            ->first(['u.email']);

        return $asistente;
    }
}
