<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\MsgStatusEnum;
use App\Exports\OrganizacionExport;
use App\Http\Requests\OrganizacionRequest;
use App\Http\Requests\OrganizacionUpdateRequest;
use App\Http\Requests\OrgUpdateActivo;
use App\Models\Organizacion;
use App\Models\Proyecto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class OrganizacionController extends Controller
{
    public function getOrganizaciones(): JsonResponse
    {
        $organizaciones = Organizacion::from('organizaciones as org')
            ->selectRaw('org.id, org.nombre_organizacion, org.abreviatura, t.tipo, t.id as tipo_id,
                                            org.email, org.razon_social, org.sitio_web, org.telefono,
                                            org.descripcion, conv.id as convenio_id, conv.convenio,
                                            c.code, c.id as country_id, c.name as pais,
                                            s.id as state_id, s.name as estado,
                                            ref.longitud, ref.latitud')
            ->join('tipos as t', 't.id', 'org.tipo_id')
            ->join('countries as c', 'c.id', 'org.country_id')
            ->join('states as s', 's.id', 'org.state_id')
            ->leftJoin('referencias_internacionales as ref', 'ref.state_id', 's.id')
            ->join('convenios as conv', 'conv.id', 'org.convenio_id')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'organizaciones' => $organizaciones], 200);
    }

    public function getOrganizacionesActivas(): JsonResponse
    {
        $organizaciones = Organizacion::from('organizaciones as org')
            ->selectRaw('org.id, org.nombre_organizacion, org.abreviatura, t.tipo, t.id as tipo_id,
                        org.email, org.razon_social, org.sitio_web, org.telefono,
                        org.descripcion, conv.id as convenio_id, conv.convenio,
                        c.code, c.id as country_id, c.name as pais,
                        s.id as state_id, s.name as estado,
                        ref.longitud, ref.latitud')
            ->join('tipos as t', 't.id', 'org.tipo_id')
            ->join('countries as c', 'c.id', 'org.country_id')
            ->join('states as s', 's.id', 'org.state_id')
            ->join('referencias_internacionales as ref', 'ref.state_id', 's.id')
            ->join('convenios as conv', 'conv.id', 'org.convenio_id')
            ->where('org.convenio_id', '<>', 1)
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'organizaciones' => $organizaciones], 200);
    }

    public function store(OrganizacionRequest $request): JsonResponse
    {

        try {
            Organizacion::create($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }


        return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
    }

    public function update(OrganizacionUpdateRequest $request, int $id): JsonResponse
    {
        $organizacion = Organizacion::find($id);

        try {
            if ($organizacion) {

                $organizacion->update(array_filter($request->validated()));
                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function updateConvenio(OrgUpdateActivo $request, int $id): JsonResponse
    {
        $organizacion = Organizacion::find($id);

        if ($organizacion) {
            $organizacion->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function show(int $id): JsonResponse
    {
        $organizacion = Organizacion::from('organizaciones as org')
            ->selectRaw('org.id, org.nombre_organizacion, org.abreviatura, org.email,
                         org.razon_social, org.sitio_web, org.telefono, org.descripcion,
                        c.code, c.name as pais,
                        s.name as estado,
                        conv.convenio, t.tipo, pa.proyectos_activos, pi.proyectos_inactivos')
            ->join('countries as c', 'c.id', 'org.country_id')
            ->join('states as s', 's.id', 'org.state_id')
            ->join('convenios as conv', 'conv.id', 'org.convenio_id')
            ->join('tipos as t', 't.id', 'org.tipo_id')
            ->leftJoin(
                DB::raw('(SELECT p.organizacion_id, COUNT(p.organizacion_id) as proyectos_activos
                                FROM proyectos as p
                                WHERE p.activo = 1
                                GROUP BY p.organizacion_id) as pa'),
                function ($join) {
                    $join->on('pa.organizacion_id', '=', 'org.id');
                }
            )
            ->leftJoin(
                DB::raw('(SELECT p.organizacion_id, COUNT(p.organizacion_id) as proyectos_inactivos
            FROM proyectos as p
            WHERE p.activo = 0
            GROUP BY p.organizacion_id) as pi'),
                function ($join) {
                    $join->on('pi.organizacion_id', '=', 'org.id');
                }
            )
            ->where('org.id', $id)
            ->groupBy('org.id')
            ->first();

        return response()->json(['status' => MsgStatusEnum::Success, 'organizacion' => $organizacion], 200);
    }

    public function showForEdit(int $id)
    {
        $organizacion = Organizacion::find($id);

        if ($organizacion) {
            return response()->json(['status' => MsgStatusEnum::Success, 'organizacion' => $organizacion], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $organizacion = Organizacion::find($id);

        if ($organizacion) {
            $organizacion->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function totalOrganizaciones(): JsonResponse
    {
        $totalOrganizaciones = Organizacion::from('organizaciones as org')
            ->join('convenios as c', 'c.id', 'org.convenio_id')
            ->selectRaw('COUNT(org.convenio_id) as total, c.convenio')
            ->groupBy('org.convenio_id')
            ->get();

        if (sizeof($totalOrganizaciones) > 0) {
            return response()->json([
                'status' => MsgStatusEnum::Success,
                'totalOrganizaciones' => $totalOrganizaciones
            ], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => "Aún no existen datos"], 200);
        }
    }

    public function exportOrganizaciones()
    {
        return Excel::download(new OrganizacionExport, 'organizaciones.xlsx');
    }
}
