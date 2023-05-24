<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Convenio;
use Illuminate\Http\Request;

class ConvenioController extends Controller
{
    public function getConvenios()
    {
        $convenios = Convenio::get(['id','convenio']);

        return response()->json(['status' => MsgStatusEnum::Success, 'convenios' => $convenios], 200);
    }
}
