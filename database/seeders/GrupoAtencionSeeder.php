<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GrupoAtencionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('grupo_atenciones')->delete();
        $estados = [
            ['grupo' => 'Personas adultas mayores'],
            ['grupo' => 'Niños, niñas y adolescentes'],
            ['grupo' => 'Mujeres embarazadas'],
            ['grupo' => 'Personas con discapacidad'],
            ['grupo' => 'Personas lesbianas, gays, bisexuales, trasngéneros, travesti, transexuales e intersexuales (LGBTTTI)'],
            ['grupo' => 'Personas migrantes y sujetas de protección internacional'],
            ['grupo' => 'Personas en situación de calle'],
            ['grupo' => 'Personas privadas de su libertad'],
            ['grupo' => 'Personas que residen en instituciones de asistencia social'],
            ['grupo' => 'Personas afrodescendientes'],
            ['grupo' => 'Personas de identidad indígena'],
            ['grupo' => 'Personas de pertecientes a minorías religiosas'],
            ['grupo' => 'Quienes adolezcan de enfermedades catastróficas o de alta complejidad'],
            ['grupo' => 'Personas en situación de riesgos'],
            ['grupo' => 'Victimas de violencia doméstica y sexual'],
            ['grupo' => 'Victimas de maltrato infantil'],
            ['grupo' => 'Victimas de desastres naturales o antroponénicos'],
            ['grupo' => 'Movilidad Humana'],
            ['grupo' => 'Otros'],

        ];
        DB::table('grupo_atenciones')->insert($estados);
    }
}
