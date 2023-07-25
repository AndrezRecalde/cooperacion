<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MsgStatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function getRoles()
    {
        $roles = Role::where('id', '<>', 1)
        ->get(['id', 'name']);

        return response()->json(['status' => MsgStatusEnum::Success, 'roles' => $roles], 200);
    }
}
