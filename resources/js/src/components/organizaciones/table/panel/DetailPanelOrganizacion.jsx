import { Table } from "@mantine/core";

export const DetailPanelOrganizacion = ({ row }) => {
    return (
        <Table horizontalSpacing="lg" withBorder withColumnBorders>
            <thead>
                <tr>
                    <th>Correo Electrónico</th>
                    <th>Teléfono(s)</th>
                    <th>Tipo de Organización</th>
                    <th>Total Proyectos</th>
                </tr>
            </thead>
            <tbody>
                <tr key={row.original.id}>
                    <td>{row.original.email}</td>
                    <td>{row.original.telefono}</td>
                    <td>{row.original.tipo}</td>
                    <td>{row.original.proyectos_count}</td>
                </tr>
            </tbody>
        </Table>
    );
};
