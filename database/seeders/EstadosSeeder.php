<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('estados')->delete();
        $estados = [
            ['estado' => 'En Proceso',          'activo' => 1],
            ['estado' => 'Finalizado',          'activo' => 1],
        ];
        DB::table('estados')->insert($estados);
    }
}
