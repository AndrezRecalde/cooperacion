<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\PeriodoRequest;
use App\Models\Periodo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PeriodoController extends Controller
{
    public function getPeriodosAdmin(): JsonResponse
    {
        $periodos = Periodo::get(['id','maxima_autoridad','fechas_periodo']);
        return response()->json(['status' => MsgStatusEnum::Success, 'periodos' => $periodos], 200);
    }

    public function getPeriodos(): JsonResponse
    {
        $periodos = Periodo::where('activo', 1)->get(['id', 'maxima_autoridad', 'fechas_periodo']);
        return response()->json(['status' => MsgStatusEnum::Success, 'periodos' => $periodos], 200);
    }

    public function store(PeriodoRequest $request): JsonResponse
    {
        try {
            Periodo::create($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => $th->getMessage()], 500);
        }
    }

    public function update(PeriodoRequest $request, int $id): JsonResponse
    {
        $periodo = Periodo::find($id);
        try {
            $periodo->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => $th->getMessage()], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $periodo = Periodo::find($id);

        if($periodo){
            $periodo->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        }else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }
}
