<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('provincias')->delete();
        $provincias = [
            [
                'nombre_provincia' => 'Azuay',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Bolívar',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Cañar',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Carchi',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Chimborazo',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Cotopaxi',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'El Oro',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Esmeraldas',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Galápagos',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Guayas',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Imbabura',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Loja',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Los Ríos',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Manabí',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Morona Santiago',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Napo',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Orellana',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Pastaza',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Pichincha',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Santa Elena',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Santo Domingo de los Tsáchilas',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Sucumbíos',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Tungurahua',
                'activo'     =>  '1',
            ],
            [
                'nombre_provincia' => 'Zamora Chinchipe',
                'activo'     =>  '1',
            ],
        ];
        DB::table('provincias')->insert($provincias);
    }
}
