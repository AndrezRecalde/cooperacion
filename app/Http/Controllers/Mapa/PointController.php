<?php

namespace App\Http\Controllers\Mapa;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PointController extends Controller
{
    public function getPoints(Request $request)
    {
        $points = DB::table('initial_points')->where('point_id', $request->point_id)->first();

        return response()->json(['status' => MsgStatusEnum::Success, 'points' => $points], 200);
    }
}
