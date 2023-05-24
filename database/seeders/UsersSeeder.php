<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();
        Role::truncate();

        $adminRole = Role::create(['name' => 'Administrador']);
        $directorRole = Role::create(['name' => 'Director']);
        $asistenteRole = Role::create(['name' => 'Asistente']);
        $grupo = Role::create(['name' => 'Grupo']);

        $admin = New User;
        $admin->nombres = "Cristhian";
        $admin->apellidos = "Recalde";
        $admin->dni = "0802704171";
        $admin->email = "crecalde@gadpe.gob.ec";
        $admin->password = Hash::make('a123456');
        $admin->institucion_id = 1;
        $admin->activo = 1;
        $admin->save();
        $admin->assignRole($adminRole);

        $director = New User;
        $director->nombres = "Lady";
        $director->apellidos = "Cedeño";
        $director->dni = "0800332244";
        $director->email = "lacedeno@gadpe.gob.ec";
        $director->password = Hash::make('123456');
        $director->institucion_id = 1;
        $director->activo = 1;
        $director->save();
        $director->assignRole($directorRole);

        $asistente = New User;
        $asistente->nombres = "Daniela";
        $asistente->apellidos = "Reyes";
        $asistente->dni = "0800445577";
        $asistente->email = "dareyes@gadpe.gob.ec";
        $asistente->password = Hash::make('123456');
        $asistente->institucion_id = 1;
        $asistente->activo = 1;
        $asistente->save();
        $asistente->assignRole($asistenteRole);
    }
}
