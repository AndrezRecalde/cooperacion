<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\MsgStatusEnum;
use App\Models\Canton;
use App\Models\City;
use App\Models\Country;
use App\Models\Parroquia;
use App\Models\Provincia;
use App\Models\Recinto;
use App\Models\State;
use Illuminate\Http\Request;

class StatesController extends Controller
{
    /* Provincias, Cantones, parroquias y recintos */

    public function getProvincias()
    {
        $provincias = Provincia::where('activo', 1)->get(['id', 'nombre_provincia']);

        return response()->json(['status' => MsgStatusEnum::Success, 'provincias' => $provincias], 200);
    }

    public function getCantones()
    {
        $cantones = Canton::where('activo', 1)->get(['id', 'nombre_canton']);

        return response()->json(['status' => MsgStatusEnum::Success, 'cantones' => $cantones], 200);
    }

    public function getParroquias(Request $request)
    {
        $parroquias = Parroquia::where('canton_id', $request->canton_id)->get(['id','nombre_parroquia']);

        return response()->json(['status' => MsgStatusEnum::Success, 'parroquias' => $parroquias], 200);
    }

    public function getRecintos(Request $request)
    {
        $recintos = Recinto::where('parroquia_id', $request->parroquia_id)->get(['id', 'nombre_recinto']);

        return response()->json(['status' => MsgStatusEnum::Success, 'recintos' => $recintos], 200);
    }

    /* Paises, estados y ciudades */

    public function getPaises()
    {
        $paises = Country::get(['id', 'code', 'name']);

        return response()->json(['status' => MsgStatusEnum::Success, 'paises' => $paises], 200);
    }

    public function getEstados(Request $request)
    {
        $states = State::where('country_id', $request->country_id)
                    ->get(['id', 'name']);

        return response()->json(['status' => MsgStatusEnum::Success, 'states' => $states], 200);
    }

    public function getCiudades(Request $request)
    {
        $ciudades = City::where('state_id', $request->state_id)
                        ->get(['id', 'name']);
        return response()->json(['status' => MsgStatusEnum::Success, 'ciudades' => $ciudades], 200);
    }
}
