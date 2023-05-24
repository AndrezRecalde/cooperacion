<?php

namespace App\Exports;

use App\Models\Organizacion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;


class OrganizacionExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
{

    public function columnWidths(): array
    {
        return [
            'A' => 80,
            'B' => 20,
            'C' => 30,
            'D' => 30,
            'E' => 30,
            'F' => 30,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);

    }


    /**
    * @return \Illuminate\Support\Collection
    */

    public function headings(): array
    {
        return [
            'Nombre Organización',
            'Abreviatura',
            'Email',
            'Teléfono',
            'País',
            'Estado',
        ];
    }

    public function collection()
    {
        $organizaciones = Organizacion::from('organizaciones as org')
                        ->selectRaw('org.nombre_organizacion, org.abreviatura,
                                    org.email, org.telefono, c.name as pais, s.name as estado')
        ->join('countries as c', 'c.id', 'org.country_id')
        ->join('states as s', 's.id', 'org.state_id')
        ->get();

        return $organizaciones;
    }
}
