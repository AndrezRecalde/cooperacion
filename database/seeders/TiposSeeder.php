<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipos')->delete();
        $tipos = [
            [
                'tipo' => 'Gubernamental',
            ],
            [
                'tipo' => 'No Gubernamental',
            ]
        ];
        DB::table('tipos')->insert($tipos);
    }
}
