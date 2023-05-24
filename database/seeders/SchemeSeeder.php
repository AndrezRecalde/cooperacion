<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SchemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('schemes')->delete();
        $schemes = [
            [ 'color_scheme' => 'light' ],
            [ 'color_scheme' => 'dark'  ],
        ];
        DB::table('schemes')->insert($schemes);
    }
}
