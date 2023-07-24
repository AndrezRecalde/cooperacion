<?php

namespace App\Http\Controllers\Admin;

use PDF;
use App\Http\Controllers\Controller;
use App\Models\Archivo;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function getFichaProyectoPDF(Request $request)
    {
        $proyecto =  Proyecto::from('proyectos as p')
        ->selectRaw('p.id, org.nombre_organizacion, p.nombre_proyecto, p.objetivo_general,
                            p.beneficiados_directos, p.beneficiados_indirectos,
                            coop.tipo_cooperacion, m.tipo_modalidad as modalidad, p.monto, e.estado, per.fechas_periodo as periodo, p.activo')
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
        ->where('p.id', $request->id)
        ->first();

        $pdf = PDF::loadView('pdf.proyectos.ficha', ['proyecto' => $proyecto]);
        return $pdf->download('ficha_proyecto.pdf');
    }

    public function getArchivosAfiliaciones(Request $request)
    {
        $archivo = Archivo::find($request->id);

        $headers = [
            'Content-Type' => 'application/pdf',
         ];
        return response()->download(storage_path('/app/public/'). $archivo->url, 'habilitante.pdf', $headers);
    }
}
