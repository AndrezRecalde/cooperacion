<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ModalidadRequest;
use App\Models\Modalidad;

class ModalidadController extends Controller
{
    public function getModalidadesActivas()
    {
        $modalidades = Modalidad::where('activo', 1)
            ->get(['id', 'tipo_modalidad']);

        return response()->json(['status' => MsgStatusEnum::Success, 'modalidades' => $modalidades], 200);
    }

    /* METODOS ADMIN */
    public function getModalidadesAll()
    {
        $modalidades = Modalidad::get(['id', 'tipo_modalidad', 'activo']);

        return response()->json(['status' => MsgStatusEnum::Success, 'modalidades' => $modalidades], 200);
    }

    public function store(ModalidadRequest $request)
    {
        Modalidad::create($request->validated());

        return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
    }

    public function update(ModalidadRequest $request, int $id)
    {
        $modalidad = Modalidad::find($id);

        if ($modalidad) {
            $modalidad->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function destroy(int $id)
    {
        $modalidad = Modalidad::find($id);

        if ($modalidad) {
            $modalidad->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }
}
