<?php

namespace App\Http\Controllers\Admin;

use PDF;
use App\Http\Controllers\Controller;
use App\Models\Afiliacion;
use App\Models\Archivo;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class PDFController extends Controller
{
    public function getFichaProyectoPDF(Request $request)
    {
        $proyecto =  Proyecto::from('proyectos as p')
        ->selectRaw('p.id, org.nombre_organizacion, p.nombre_proyecto, p.objetivo_general,
                            c.nombre_canton as canton, parr.nombre_parroquia as parroquia,re.nombre_recinto as recinto,
                            ref.longitud, ref.latitud,
                            p.grupo_beneficiado, p.total_beneficiados,
                            coop.tipo_cooperacion, m.tipo_modalidad as modalidad, p.monto, e.estado, per.fechas_periodo as periodo, p.activo')
        ->with(
            [
                'odsostenibles'  => function ($query) {
                    return $query->select('odsostenibles.id', 'odsostenibles.objetivo_ods');
                },
                'grupos' => function ($query) {
                    return $query->select('grupo_atenciones.id', 'grupo_atenciones.grupo');
                }
            ]
        )
        ->join('organizaciones as org', 'org.id', 'p.organizacion_id')
        ->join('cantones as c', 'c.id', 'p.canton_id')
        ->join('parroquias as parr', 'parr.id', 'p.parroquia_id')
        ->join('recintos as re', 're.id', 'p.recinto_id')
        ->leftJoin('referencias_cantonales as ref', 'ref.recinto_id', 're.id')
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
