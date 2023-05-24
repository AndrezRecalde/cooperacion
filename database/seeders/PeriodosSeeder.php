<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeriodosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('periodos')->delete();
        $periodos = [
            [
                'maxima_autoridad' => 'María Roberta Zambrano Ortíz',
                'fechas_periodo'     =>  '2019-2023',
            ],
            [
                'maxima_autoridad' => 'María Roberta Zambrano Ortíz',
                'fechas_periodo'     =>  '2023-2027',
            ]
        ];
        DB::table('periodos')->insert($periodos);
    }
}
