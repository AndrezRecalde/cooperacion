<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenciaInteracionalRequest;
use App\Models\ReferenciasInternacionales;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReferenciaInternacionalController extends Controller
{
    public function getRefInternacionales(): JsonResponse
    {
        $referencias = ReferenciasInternacionales::from('referencias_internacionales as ri')
                        ->join('states as s', 's.id', 'ri.state_id')
                        ->join('countries as c', 'c.id', 's.country_id')
                        ->selectRaw('ri.id, c.id as country_id, c.name as pais, s.id as state_id, s.name as state, ri.latitud, ri.longitud')
                        ->orderBy('c.name', 'ASC')
                        ->get();
        return response()->json(['status' => MsgStatusEnum::Success, 'referencias' => $referencias], 200);
    }

    public function store(ReferenciaInteracionalRequest $request): JsonResponse
    {
        try {
            ReferenciasInternacionales::create($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);

        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function update(ReferenciaInteracionalRequest $request, int $id): JsonResponse
    {
        $referencia = ReferenciasInternacionales::find($id);
        try {
            if($referencia){
                $referencia->update($request->validated());
                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            }else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
