<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\TipoRequest;
use App\Models\Tipo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TiposController extends Controller
{
    public function getTipos(): JsonResponse
    {
        $tipos = Tipo::get(['id', 'tipo']);
        return response()->json(['status' => MsgStatusEnum::Success, 'tipos' => $tipos], 200);
    }

    public function store(TipoRequest $request): JsonResponse
    {
        try {
            Tipo::create($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => $th->getMessage()], 500);
        }
    }

    public function update(TipoRequest $request, int $id): JsonResponse
    {
        $tipo = Tipo::find($id);
        try {
            $tipo->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => $th->getMessage()], 500);

        }
    }
}
