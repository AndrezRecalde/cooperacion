<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\DirPrefecturaRequest;
use App\Models\DirPrefectura;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DirPrefecturaController extends Controller
{
    public function getPrefecturas(): JsonResponse
    {
        $prefecturas = DirPrefectura::from('dir_prefecturas as dp')
            ->with([
                'emails' => function($query){
                    return $query->select('id', 'email');
                },
                 'telefonos' => function($query){
                    return $query->select('id', 'telefono');

                 }
                 ])
            ->selectRaw('dp.id, dp.direccion, dp.prefecto, dp.viceprefecto, dp.gobernador, p.nombre_provincia as provincia')
            ->join('provincias as p', 'p.id', 'dp.provincia_id')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'prefecturas' => $prefecturas], 200);
    }

    public function store(DirPrefecturaRequest $request): JsonResponse
    {
        try {
            $prefectura = DirPrefectura::create($request->validated());

            foreach ($request->telefonos as $telefono ) {
                $prefectura->telefonos()->create([
                    'telefono'  =>  $telefono
                ]);
            }

            foreach ($request->emails as $email) {
                $prefectura->emails()->create([
                    'email'    =>  $email
                ]);
            }



            $prefectura->save();

            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);

        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function update(DirPrefecturaRequest $request, int $id): JsonResponse
    {
        $prefectura = DirPrefectura::find($id);

        try {
            if ($prefectura) {
                $prefectura->update($request->validated());

                $prefectura->correos()->update([
                    'correo' => $request->email
                ]);
                $prefectura->telefonos()->update([
                    'telefono'  =>  $request->telefono
                ]);

                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
