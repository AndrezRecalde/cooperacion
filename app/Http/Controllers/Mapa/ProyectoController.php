<?php

namespace App\Http\Controllers\Mapa;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProyectoRequest;
use App\Http\Requests\ProyectoUpdateActivo;
use App\Interfaces\AfiliacionInterface;
use App\Mail\ProyectoMail;
use App\Models\Proyecto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ProyectoController extends Controller
{

    public function __construct(AfiliacionInterface $afiliacionRepository)
    {
        $this->afiliacionRepository = $afiliacionRepository;
    }
    private AfiliacionInterface $afiliacionRepository;
    public function getProyectosAdmin(): JsonResponse
    {
        $proyectos = Proyecto::from('proyectos as p')
            ->selectRaw('p.id, org.nombre_organizacion, p.nombre_proyecto, p.objetivo_general,
                        p.beneficiados_directos, p.beneficiados_indirectos,
                        coop.tipo_cooperacion, m.tipo_modalidad as modalidad,
                        p.monto, p.contrapartida, e.estado, per.fechas_periodo as periodo, p.activo')
            ->with(
                [
                    'odsostenibles'  => function ($query) {
                        return $query->select('odsostenibles.id', 'odsostenibles.objetivo_ods');
                    },
                    'grupos' => function ($query) {
                        return $query->select('grupo_atenciones.id', 'grupo_atenciones.grupo');
                    },
                    'cantones' => function ($query) {
                        return $query->select('cantones.id', 'cantones.nombre_canton');
                    }
                ]
            )
            ->join('organizaciones as org', 'org.id', 'p.organizacion_id')
            ->join('cooperaciones as coop', 'coop.id', 'p.cooperacion_id')
            ->join('modalidades as m', 'm.id', 'p.modalidad_id')
            ->join('estados as e', 'e.id', 'p.estado_id')
            ->leftJoin('periodos as per', 'per.id', 'p.periodo_id')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'proyectos' => $proyectos], 200);
    }

    public function getProyectosActivos(): JsonResponse
    {
        $proyectos = Proyecto::from('proyectos as p')
            ->selectRaw('p.id, org.nombre_organizacion, p.nombre_proyecto, p.objetivo_general,
                                p.beneficiados_directos, p.beneficiados_indirectos,
                                coop.tipo_cooperacion, m.tipo_modalidad as modalidad,
                                p.monto, p.contrapartida, e.estado, per.fechas_periodo as periodo, p.activo')
            ->with(
                [
                    'odsostenibles'  => function ($query) {
                        return $query->select('odsostenibles.id', 'odsostenibles.objetivo_ods');
                    },
                    'grupos' => function ($query) {
                        return $query->select('grupo_atenciones.id, grupo_atenciones.grupo');
                    },
                    'cantones' => function ($query) {
                        return $query->select('cantones.id', 'cantones.nombre_canton');
                    }
                ]
            )
            ->join('organizaciones as org', 'org.id', 'p.organizacion_id')
            ->join('odsostenible_proyecto as op', 'op.proyecto_id', 'p.id')
            ->join('cooperaciones as coop', 'coop.id', 'p.cooperacion_id')
            ->join('modalidades as m', 'm.id', 'p.modalidad_id')
            ->join('estados as e', 'e.id', 'p.estado_id')
            ->join('periodos as per', 'per.id', 'p.periodo_id')
            ->where('p.activo', 1)
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'proyectos' => $proyectos], 200);
    }

    function getCountProyectosWithCanton(Request $request): JsonResponse
    {
        $proyecto = Proyecto::where('organizacion_id', $request->organizacion_id);
        if ($proyecto) {
            $proyectosCount = $proyecto->with([
                'cantones' => function ($query) {
                    $query->select('cantones.id')->count();
                }
            ])->get();
            return response()->json(['status' => MsgStatusEnum::Success, 'proyectosCount' => $proyectosCount], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function store(ProyectoRequest $request): JsonResponse
    {
        $proyecto = Proyecto::create($request->validated());

        $proyecto->cantones()->attach($request->canton_id);

        $proyecto->grupos()->attach($request->grupo_atencion_id);

        $proyecto->odsostenibles()->attach($request->odsostenible_id);

        /* Aquí realizo el envío del correo a los responsables de la gestión */
        $director = $this->afiliacionRepository->getDirector();
        $asistente = $this->afiliacionRepository->getAsistente();

        Mail::to($director->email)
            ->cc($asistente->email)
            ->queue(new ProyectoMail($proyecto));

        return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::CreacionProyecto], 201);
    }

    public function update(ProyectoRequest $request, int $id): JsonResponse
    {
        $proyecto = Proyecto::find($id);

        if ($proyecto) {
            $proyecto->update($request->validated());

            if ($request->filled('canton_id')) {
                $proyecto->cantones()->detach();
                $proyecto->cantones()->sync($request->canton_id);
            }

            if ($request->filled('odsostenible_id')) {
                $proyecto->odsostenibles()->detach();
                $proyecto->odsostenibles()->sync($request->odsostenible_id);
            }

            if ($request->filled('grupo_atencion_id')) {
                $proyecto->grupos()->detach();
                $proyecto->grupos()->sync($request->grupo_atencion_id);
            }

            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function showForEdit(int $id): JsonResponse
    {
        $proyecto = Proyecto::with(
            [
                'odsostenibles' => function ($query) {
                    return $query->select('odsostenibles.id', 'odsostenibles.objetivo_ods');
                },
                'grupos' => function ($query) {
                    return $query->select('grupo_atenciones.id', 'grupo_atenciones.grupo');
                },
                'cantones' => function ($query) {
                    return $query->select('cantones.id', 'cantones.nombre_canton');
                }
            ]
        )->where('proyectos.id', $id)->first();
        if ($proyecto) {
            return response()->json(['status' => MsgStatusEnum::Success, 'proyecto' => $proyecto], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function updateActivo(ProyectoUpdateActivo $request, int $id): JsonResponse
    {
        $proyecto = Proyecto::find($id);

        if ($proyecto) {
            if ($proyecto->periodo_id !== null) {
                $proyecto->update($request->validated());
                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => 'Por favor especifique el periodo administrativo'], 500);
            }
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $proyecto = Proyecto::find($id);

        if ($proyecto) {
            $proyecto->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function searchProyecto(Request $request): JsonResponse
    {
        $proyectos = Proyecto::from('proyectos as p')
            ->with(
                [
                    'odsostenibles' => function ($query) {
                        return $query->select('odsostenibles.id', 'odsostenibles.objetivo_ods');
                    },
                    'grupos' => function ($query) {
                        return $query->select('grupo_atenciones.id', 'grupo_atenciones.grupo');
                    },
                    'cantones' => function ($query) {
                        return $query->select('cantones.id', 'cantones.nombre_canton');
                    }
                ]
            )
            ->join('organizaciones as org', 'org.id', 'p.organizacion_id')
            ->join('countries as coun', 'coun.id', 'org.country_id')
            ->join('states as s', 's.id', 'org.state_id')
            ->join('odsostenible_proyecto as op', 'op.proyecto_id', 'p.id')
            ->join('cooperaciones as coop', 'coop.id', 'p.cooperacion_id')
            ->join('modalidades as m', 'm.id', 'p.modalidad_id')
            ->leftJoin('estados as e', 'e.id', 'p.estado_id')
            ->join('periodos as pe', 'pe.id', 'p.periodo_id')
            ->join('canton_proyecto as cp', 'cp.proyecto_id', 'p.id')
            ->where('p.activo', 1)
            ->canton($request->canton_id)
            ->objetivo($request->ods_id)
            ->organizacion($request->organizacion_id)
            ->selectRaw('p.id, coun.code, org.nombre_organizacion, p.nombre_proyecto, p.objetivo_general,
                        p.beneficiados_directos, p.beneficiados_indirectos, coop.tipo_cooperacion,
                        m.tipo_modalidad, p.monto, e.estado, p.activo, pe.fechas_periodo')
            ->distinct()
            ->get();


        if (sizeof($proyectos) >= 1) {
            return response()->json(['status' => MsgStatusEnum::Success, 'proyectos' => $proyectos], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => "No existen proyectos en esa zona"], 201);
        }
    }
}
