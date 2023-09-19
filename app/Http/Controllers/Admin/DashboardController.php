<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Organizacion;
use App\Models\Proyecto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function getTotalOrganizaciones(): JsonResponse
    {
        $totalOrganizaciones = Organizacion::from('organizaciones as org')
            ->selectRaw('conv.id, conv.convenio, COUNT(org.convenio_id) as total')
            ->rightJoin('convenios as conv', 'conv.id', 'org.convenio_id')
            ->groupBy('org.convenio_id')
            ->orderBy('conv.convenio')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'totalOrganizaciones' => $totalOrganizaciones], 200);
    }

    function getTotalProyectos(): JsonResponse
    {
        $totalProyectos = Proyecto::from('proyectos as p')
            ->selectRaw('e.id, e.estado, COUNT(p.estado_id) as total')
            ->join('estados as e', 'e.id', 'p.estado_id')
            ->groupBy('p.estado_id')
            ->orderBy('e.estado')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'totalProyectos' => $totalProyectos], 200);
    }

    function getTotalProyectosModalidad(): JsonResponse
    {
        $proyectosModalidad = Proyecto::from('proyectos as p')
            ->selectRaw('m.tipo_modalidad, COUNT(p.modalidad_id) as total, m.color, m.border')
            ->join('modalidades as m', 'm.id', 'p.modalidad_id')
            ->groupBy('p.modalidad_id')
            ->orderBy('m.tipo_modalidad')
            ->get();

            if (sizeof($proyectosModalidad) >= 1) {
                return response()->json(['status' => MsgStatusEnum::Success, 'proyectosModalidad' => $proyectosModalidad], 200);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => "Aún no existen datos"], 200);
            }
    }

    function getTotalProyectosODS(): JsonResponse
    {
        $proyectosOds = Proyecto::from('proyectos as p')
            ->selectRaw('ods.objetivo_ods, COUNT(p.id) as total, ods.color, ods.border')
            ->join('odsostenible_proyecto as op', 'op.proyecto_id', 'p.id')
            ->join('odsostenibles as ods', 'ods.id', 'op.odsostenible_id')
            ->groupBy('ods.objetivo_ods', 'ods.color')
            ->get();

        if (sizeof($proyectosOds) >= 1) {
            return response()->json(['status' => MsgStatusEnum::Success, 'proyectosOds' => $proyectosOds], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => "Aún no existen datos"], 200);
        }
    }

    public function getTotalProyectosTipos(): JsonResponse
    {
        $proyectosTipos = Proyecto::from('proyectos as p')
            ->selectRaw('coop.tipo_cooperacion, SUM(p.monto) as monto, coop.color, coop.border')
            ->join('cooperaciones as coop', 'coop.id', 'p.cooperacion_id')
            ->groupBy('coop.tipo_cooperacion')
            ->get();

        if (sizeof($proyectosTipos) >= 1) {
            return response()->json(['status' => MsgStatusEnum::Success, 'proyectosTipos' => $proyectosTipos], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => "Aún no existen datos"], 200);
        }
    }

    function getMontosProyectos(): JsonResponse
    {
        $montos = Proyecto::from('proyectos as p')
            ->selectRaw('SUM(p.monto) as monto, SUM(p.contrapartida) as contrapartida')
            ->whereIn('p.estado_id', [2, 3])
            ->first();

        return response()->json(['status' => MsgStatusEnum::Success, 'montos' => $montos], 200);
    }
}
