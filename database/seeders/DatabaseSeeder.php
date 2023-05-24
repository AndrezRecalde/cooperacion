<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $this->call(CooperacionesSeeder::class);
        $this->call(TiposSeeder::class);
        $this->call(PointSeeder::class);
        $this->call(InitialPointSeeder::class);
        $this->call(EstadosSeeder::class);
        $this->call(InstitucionesSeeder::class);
        $this->call(ModalidadesSeeder::class);
        $this->call(OdsosteniblesSeeder::class);
        $this->call(SchemeSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(ConvenioSeeder::class);
        $this->call(GrupoAtencionSeeder::class);
        $this->call(PeriodosSeeder::class);
        $this->call(ProvinciasSeeder::class);
        $this->call(CountriesSeeder::class);
        $this->call(StatesSeeder::class);
        $this->call(CitiesSeeder::class);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    }
}
