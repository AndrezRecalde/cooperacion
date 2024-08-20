import { Card, Grid, Group, Table, Text } from "@mantine/core";
import { useDashboardStore } from "../../../hooks";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";


ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartObjetivos = () => {
    const [centerText, setCenterText] = useState('');

    const { errores, totalProyectosOds } = useDashboardStore();

    const proyectosOds = {
        labels: totalProyectosOds?.map((grafico) => grafico.objetivo_ods),
        datasets: [
            {
                label: "Total",
                data: totalProyectosOds?.map((grafico) => grafico.total),
                backgroundColor: totalProyectosOds?.map(
                    (grafico) => grafico.color
                ),
                borderColor: totalProyectosOds?.map(
                    (grafico) => grafico.border
                ),
                borderWidth: 1.5,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Desactiva la relación de aspecto

      };

    const rows = totalProyectosOds.map((proyecto) => (
        <tr key={proyecto.objetivo_ods}>
            <td>{proyecto.objetivo_ods}</td>
            <td>{proyecto.total}</td>
        </tr>
    ));

    return (
        <>
            {totalProyectosOds.length > 0 ? (
                <>
                    <div style={{ width: '100%', height: '60%' }}>
                        <Doughnut
                            data={proyectosOds}
                            options={options}
                        />
                    </div>
                    <Group>
                        <Table striped highlightOnHover withBorder withColumnBorders mt={20}>
                            <thead>
                                <tr>
                                    <th>Objetivo de Desarrollo Sostenible</th>
                                    <th>Cantidad de Proyectos ejecutados</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Group>
                </>
            ) : (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    mb={20}
                    mt={20}
                >
                    <Grid>
                        <Grid.Col sm={12} md={12} lg={12} xl={12}>
                            <Text fz="sm" weight={700}>
                                {errores}
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card>
            )}
        </>
    );
};
