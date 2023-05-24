<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\GrupoAtencion;
use Illuminate\Http\Request;

class GrupoAtencionController extends Controller
{
    public function getGrupoAtencion()
    {
        $grupos_atencion = GrupoAtencion::get(['id', 'grupo']);

        return response()->json(['status' => MsgStatusEnum::Success, 'grupos_atencion' => $grupos_atencion], 200);
    }
}
