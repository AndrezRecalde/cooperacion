<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\MsgStatusEnum;
use App\Http\Requests\OdsostenibleRequest;
use App\Models\Odsostenible;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OdsostenibleController extends Controller
{
    public function getOdsostenibles(): JsonResponse
    {
        $odsostenibles = Odsostenible::get([
            'id', 'objetivo_ods',
            'descripcion', 'logo_url',
            'banner_url'
        ]);

        return response()->json(['status' => MsgStatusEnum::Success, 'odsostenibles' => $odsostenibles], 200);
    }

    public function update(OdsostenibleRequest $request, int $id): JsonResponse
    {
        $odsostenible = Odsostenible::find($id);

        if ($odsostenible) {
            $odsostenible->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }
}
