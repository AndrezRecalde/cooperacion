<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CooperacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cooperaciones')->delete();
        $cooperaciones = [
            ['tipo_cooperacion' => 'Financiera',                            'activo' => 1, 'color' => 'rgba(46, 219, 112, 0.77)' ],
            ['tipo_cooperacion' => 'Técnica',                               'activo' => 1, 'color' => 'rgba(224, 165, 42, 0.77)' ],
            ['tipo_cooperacion' => 'Ayuda Humanitaria y de Emergencia',     'activo' => 1, 'color' => 'rgba(42, 93, 224, 0.77)' ],
            ['tipo_cooperacion' => 'Ayuda Alimentaria',                     'activo' => 1, 'color' => 'rgba(224, 222, 42, 0.77)' ],
            ['tipo_cooperacion' => 'Ciencia,Tecnología e Innovación',       'activo' => 1, 'color' => 'rgba(100, 42, 224, 0.77)' ],
            ['tipo_cooperacion' => 'Cultural',                              'activo' => 1, 'color' => 'rgba(54, 176, 52, 0.77)' ],
            ['tipo_cooperacion' => 'Becas Estudiantiles',                   'activo' => 1, 'color' => 'rgba(127, 3, 171, 0.77)' ],
            ['tipo_cooperacion' => 'Donaciones',                            'activo' => 1, 'color' => 'rgba(114, 202, 227, 0.77)' ],
        ];
        DB::table('cooperaciones')->insert($cooperaciones);
    }
}
