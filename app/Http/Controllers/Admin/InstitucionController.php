<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Institucion;
use Illuminate\Http\Request;

class InstitucionController extends Controller
{
    public function getInstituciones()
    {
        $instituciones = Institucion::get(['id', 'nombre_institucion']);

        return response()->json(['status' => MsgStatusEnum::Success, 'instituciones' => $instituciones], 200);
    }
}
