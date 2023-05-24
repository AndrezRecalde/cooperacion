<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\AfiliacionRequest;
use App\Http\Requests\ContactadoRequest;
use App\Models\Afiliacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AfiliacionController extends Controller
{
    public function getAfiliacionesAdmin(): JsonResponse
    {
        $afiliaciones = Afiliacion::with('archivos')->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'afiliaciones' => $afiliaciones], 200);
    }

    public function store(AfiliacionRequest $request): JsonResponse
    {
        try {
            $afiliacion = Afiliacion::create($request->validated());


            if ($request->file('archivos')) {

                $archivos = $request->file('archivos');

                foreach ($archivos as $archivo) {
                    $filenames = 'archivo_' . uniqid() . '.' . $archivo->getClientOriginalExtension();
                    $save_path = '/archivos/afiliaciones/' . $afiliacion->id . '/';
                    $public_path = $save_path . $filenames;
                    $path = Storage::putFileAs(
                        'public' . $save_path,
                        $archivo,
                        $filenames
                    );

                    $afiliacion->archivos()->create([
                        'url' => $public_path,
                    ]);

                    if (!$path) {
                        DB::rollback();
                        return response()->json(['status' => MsgStatusEnum::Error, 'msg' => 'Error al cargar los archivos'], 500);
                    }
                }
            }


            $afiliacion->save();

            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::CreacionAfiliacion], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function updateContactado(ContactadoRequest $request, int $id): JsonResponse
    {
        $afiliacion = Afiliacion::find($id);
        try {
            $afiliacion->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $afiliacion = Afiliacion::find($id);
        try {
            $path = storage_path() . '/app/public/archivos/afiliaciones/' . $id;
            if ($path) {
                File::deleteDirectory($path);
            }
            $afiliacion->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }
}
