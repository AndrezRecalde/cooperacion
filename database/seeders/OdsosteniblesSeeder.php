<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OdsosteniblesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('odsostenibles')->delete();
        $odsostenibles = [
            ['objetivo_ods' => '1. Fin de la pobreza',
             'descripcion' => 'Poner fin a la pobreza en todas sus formas en todo el mundo.',
             'color' => 'rgba(255, 39, 39, 0.77)'],

            ['objetivo_ods' => '2. Hambre cero',
            'descripcion' => 'Poner fin al hambre, lograr la seguridad alimentaria y la mejora de la nutrición y promover la agricultura sostenible.',
            'color' => 'rgba(255, 203, 39, 0.77)'],

            ['objetivo_ods' => '3. Salud y bienestar',
            'descripcion' => 'Garantizar una vida sana y promover el bienestar para todos en todas las edades.',
            'color' => 'rgba(11, 195, 32, 0.77)'],

            ['objetivo_ods' => '4. Educación de calidad',
            'descripcion' => 'Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.',
            'color' => 'rgba(195, 11, 11, 0.77)'],

            ['objetivo_ods' => '5. Igualdad de género',
            'descripcion' => 'Lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas.',
            'color' => 'rgba(235, 60, 17, 0.77)'],

            ['objetivo_ods' => '6. Agua limpia y saneamiento',
            'descripcion' => 'Garantizar la disponibilidad de agua y su gestión sostenible y el saneamiento para todos.',
            'color' => 'rgba(17, 205, 235, 0.77)'],

            ['objetivo_ods' => '7. Energía Asequible y no contaminante',
            'descripcion' => 'Garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos.',
            'color' => 'rgba(235, 228, 17, 0.77)'],

            ['objetivo_ods' => '8. Trabajo decente y crecimiento económico',
            'descripcion' => 'Promover el crecimiento económico sistenido, incluyente y sostenible, el empleo pleno y productivo y el trabajo decente para todos.',
            'color' => 'rgba(197, 6, 6, 0.77)'],

            ['objetivo_ods' => '9. Industria, innovación e infaestructura',
            'descripcion' => 'Construir infraestructuras resilientes, promover la insdustrialización sostenible y fomentar la innovación.',
            'color' => 'rgba(255, 136, 0, 0.77)'],

            ['objetivo_ods' => '10. Reducción de las desigualdades',
            'descripcion' => 'Reducir la desigualdad en y entre los países.',
            'color' => 'rgba(206, 5, 82, 0.77)'],

            ['objetivo_ods' => '11. Ciudades y comunidades sostenibles',
            'descripcion' => 'Lograr que las ciudades y asentamientos humanos sean inclusivos, seguros, resistentes y sostenibles.',
            'color' => 'rgba(230, 153, 49, 0.77)'],

            ['objetivo_ods' => '12. Producción y consumo responsables',
            'descripcion' => 'Garantizar modalidades de consumo y producción sostenibles.',
            'color' => 'rgba(154, 92, 8, 0.77)'],

            ['objetivo_ods' => '13. Acción por el clima',
            'descripcion' => 'Adoptar medidas urgentes para combatir el cambio climático y sus efectos.',
            'color' => 'rgba(18, 100, 36, 0.77)'],

            ['objetivo_ods' => '14. Vida submarina',
            'descripcion' => 'Conservar y utilizar en forma sostenible los océanos, los mares y los recursos marinos para el desarrollo sostenible.',
            'color' => 'rgba(9, 134, 199, 0.77)'],

            ['objetivo_ods' => '15. Vida de ecosistemas terrestres',
            'descripcion' => 'Gestionar sosteniblemente los bosques, luchar contr la desertificación, detener e invertir la degradación de las tierras y detener la pérdida de biodiversidad.',
            'color' => 'rgba(7, 183, 31, 0.77)'],

            ['objetivo_ods' => '16. Paz, justicia e instituciones solidas',
            'descripcion' => 'Promover sociedades pacíficas e incluyentes para el desarrollo sostenible, promoveer acceso a la justicia para todos y crear instituciones efectivas, responsables e incluyentes en todos los niveles.',
            'color' => 'rgba(7, 75, 183, 0.77)'],

            ['objetivo_ods' => '17. Alianzas para lograr los objetivos',
            'descripcion' => 'Fortalecer las bases de implementación y la revitalización de la alianza global para el desarrollo sostenible.',
            'color' => 'rgba(0, 37, 155, 0.77)'],

        ];
        DB::table('odsostenibles')->insert($odsostenibles);
    }
}
