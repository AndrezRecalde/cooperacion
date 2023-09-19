import { Card, Grid, Text } from "@mantine/core";
import { useDashboardStore } from "../../../hooks";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { TitleSections } from "../../../components";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const ChartTipos = () => {

    const { errores,  totalProyectosTipos } = useDashboardStore();


    const proyectosTipos = {
        labels: totalProyectosTipos?.map(
            (grafico) => grafico.tipo_cooperacion
        ),
        datasets: [
            {
                label: "Total",
                data: totalProyectosTipos?.map((grafico) => grafico.monto),
                backgroundColor: totalProyectosTipos?.map(grafico => grafico.color),
                borderColor: totalProyectosTipos?.map(grafico => grafico.border),
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card mt={5} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <TitleSections title="Distribución de Montos por Tipos de Coop" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {totalProyectosTipos.length > 0 ? (
                    <Doughnut
                        height={350}
                        data={proyectosTipos}
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
