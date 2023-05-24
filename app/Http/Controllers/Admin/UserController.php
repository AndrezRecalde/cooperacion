<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserPassword;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateActivo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsuarios(): JsonResponse
    {
        $usuarios = User::from('users as u')
            ->selectRaw('u.id, CONCAT(u.nombres, " ", u.apellidos) as nombres, u.email, u.dni, i.nombre_institucion, r.name as role, u.activo')
            ->join('model_has_roles as mhr', 'mhr.model_id', 'u.id')
            ->join('roles as r', 'r.id', 'mhr.role_id')
            ->join('instituciones as i', 'i.id', 'u.institucion_id')
            ->get();

        return response()->json(['status' => MsgStatusEnum::Success, 'usuarios' => $usuarios], 200);
    }

    public function showForEdit(int $id): JsonResponse
    {
        $usuario = User::with('roles')->where('users.id', $id)->first();
        if ($usuario) {
            return response()->json(['status' => MsgStatusEnum::Success, 'usuario' => $usuario], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function store(UserRequest $request): JsonResponse
    {
        try {
            $usuario = User::create($request->validated());
            $usuario->assignRole($request->roles);
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Creacion], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 404);
        }
    }

    public function update(UserRequest $request, int $id): JsonResponse
    {
        $usuario = User::find($id);

        try {
            if ($usuario) {
                $usuario->update($request->validated());
                if ($request->filled('roles')) {
                    $usuario->roles()->detach();
                    $usuario->assignRole($request->roles);
                }
                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $usuario = User::find($id);

        if ($usuario) {
            $usuario->delete();
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Eliminado], 200);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }

    public function updatePassword(UserPassword $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
        try {
            if ($usuario) {
                $usuario->update($request->validated());
                return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
            } else {
                return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => $th->getMessage()], 500);
        }
    }

    public function updateActivo(UserUpdateActivo $request, int $id): JsonResponse
    {
        $usuario = User::find($id);
        if ($usuario) {
            $usuario->update($request->validated());
            return response()->json(['status' => MsgStatusEnum::Success, 'msg' => MsgStatusEnum::Actualizado], 201);
        } else {
            return response()->json(['status' => MsgStatusEnum::Error, 'msg' => MsgStatusEnum::NotFound], 404);
        }
    }
}
