<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConvenioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('convenios')->delete();
        $convenios = [
            ['convenio' => 'En Proceso de Suscripción'],
            ['convenio' => 'Convenio Activo'],
            ['convenio' => 'Convenio Finalizado'],
        ];
        DB::table('convenios')->insert($convenios);
    }
}
