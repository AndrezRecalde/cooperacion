import { Card, Grid, Text } from "@mantine/core";
import { DivTitle } from "../elements/DivTitle";
import { useProyectoStore } from "../../hooks/proyecto/useProyectoStore";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export const ChartReporteProyectos = () => {
    const { errores, totalProyectos } = useProyectoStore();

    const proyectos = {
        labels: totalProyectos?.map((proyecto) =>
            proyecto.activo === 0 ? "Proyectos NO activos" : "Proyectos Activos"
        ),
        datasets: [
            {
                label: "Total",
                data: totalProyectos?.map((proyecto) => proyecto.total),
                backgroundColor: [
                    "rgba(39, 255, 96, 0.61)",
                    "rgba(255, 39, 39, 0.61)"
                ],
                borderColor: [ "rgba(0,100,0)", "rgba(128,0,0)"],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card mt={10} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <DivTitle title="Reporte Proyectos" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {totalProyectos.length > 0 ? (
                    <Pie
                        height={350}
                        data={proyectos}
                        options={{ maintainAspectRatio: false }}
                    />
                ) : (
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        mb={20}
                        mt={20}
                        /* onClick={() => console.log("clic")} */
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
            </Card.Section>
        </Card>
    );
};
