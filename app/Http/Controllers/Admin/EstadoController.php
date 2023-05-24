<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Estado;

class EstadoController extends Controller
{
    public function getEstadosActivos()
    {
        $estados = Estado::where('activo', 1)
                    ->get(['id', 'estado']);

        return response()->json(['status' => MsgStatusEnum::Success, 'estados' => $estados], 200);
    }

    public function getEstadosAll()
    {
        $estados = Estado::get(['id', 'estado']);

        return response()->json(['status' => MsgStatusEnum::Success, 'estados' => $estados], 200);
    }

}
