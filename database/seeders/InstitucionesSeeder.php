<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InstitucionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('instituciones')->delete();
        $instituciones = [
            ['nombre_institucion' => 'En Proceso',     'abreviatura' => 'GADPE',
            'telefono' => '(06) 272-1433'],
        ];
        DB::table('instituciones')->insert($instituciones);
    }
}
