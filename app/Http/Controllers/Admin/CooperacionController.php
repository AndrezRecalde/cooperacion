<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\MsgStatusEnum;
use App\Http\Requests\CooperacionRequest;
use App\Models\Cooperacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CooperacionController extends Controller
{
    public function getCooperacionesActivas(): JsonResponse
    {
        $cooperaciones = Cooperacion::where('activo', 1)
            ->get(['id', 'tipo_cooperacion']);

        return response()->json(['status' => MsgStatusEnum::Success, 'cooperaciones' => $cooperaciones], 200);
    }

    /* METODOS ADMIN */

    public function getCooperacionesAll(): JsonResponse
    {
        $cooperaciones = Cooperacion::get(['id', 'tipo_cooperacion', 'activo']);

        return response()->json(['status' => MsgStatusEnum::Success, 'cooperaciones' => $cooperaciones], 200);
    }

    public function getCooperacionesSearch(Request $request)
    {
        $cooperaciones = Cooperacion::where('activo', $request->activo)
            ->get(['id', 'tipo_cooperacion', 'activo']);

        return response()->json(['status' => MsgStatusEnum::Success, 'cooperaciones' => $cooperaciones], 200);
    }

    public function store(CooperacionRequest $request): JsonResponse
    {
        Cooperacion::create($request->validated());

        return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
    }

    public function update(CooperacionRequest $request, int $id): JsonResponse
    {
        $cooperacion = Cooperacion::find($id);

        if ($cooperacion) {
            $cooperacion->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $cooperacion = Cooperacion::find($id);

        if ($cooperacion) {
            $cooperacion->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

}
