import { Card, Grid, Text } from "@mantine/core";
import { TitleSections } from "../../../components";
import { Doughnut, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useDashboardStore } from "../../../hooks";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const ChartModalidad = () => {

    const { errores, totalProyectosModalidades } = useDashboardStore();

    const proyectosModalidad = {
        labels: totalProyectosModalidades?.map(
            (grafico) => grafico.tipo_modalidad
        ),
        datasets: [
            {
                label: "Total",
                data: totalProyectosModalidades?.map((grafico) => grafico.total),
                backgroundColor: totalProyectosModalidades?.map(grafico => grafico.color),
                borderColor: totalProyectosModalidades?.map(grafico => grafico.border),
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card mt={5} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <TitleSections
                    title="Distribución de Proyectos por Modalidad"
                    fz={12}
                    fw={700}
                />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {totalProyectosModalidades.length > 0 ? (
                    <Pie
                        height={150}
                        data={proyectosModalidad}
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
