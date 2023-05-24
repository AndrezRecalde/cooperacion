<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModalidadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('modalidades')->delete();
        $modalidades = [
            ['tipo_modalidad' => 'Horizontal',          'activo' => 1],
            ['tipo_modalidad' => 'Vertical',            'activo' => 1],
            ['tipo_modalidad' => 'Triangular',          'activo' => 1],
            ['tipo_modalidad' => 'Bilateral',           'activo' => 1],
            ['tipo_modalidad' => 'Multilateral',        'activo' => 1],
            ['tipo_modalidad' => 'Descentralizada',     'activo' => 1],
            ['tipo_modalidad' => 'No Gubernamental',    'activo' => 1],
            ['tipo_modalidad' => 'Interinstitucional',  'activo' => 1],
        ];
        DB::table('modalidades')->insert($modalidades);
    }
}
