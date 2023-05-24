<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InitialPointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('initial_points')->delete();
        $initial_points = [
            [
                'longitud' => '-79.5',
                'latitud' => '0.5316',
                'zoom'     => '8.1',
                'point_id' => 1
            ],
            [
                'longitud' => '0',
                'latitud' => '20',
                'zoom'     => '1.8',
                'point_id' => 2
            ],

        ];
        DB::table('initial_points')->insert($initial_points);
    }
}
