import { Card, Grid, Text } from "@mantine/core";
import { DivTitle } from "../elements/DivTitle";
import { useProyectoStore } from "../../hooks/proyecto/useProyectoStore";
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const ChartTipos = () => {

    const { errores, graficoProyectosTipos } = useProyectoStore()

    const proyectosTipos = {
        labels: graficoProyectosTipos?.map(
            (grafico) => grafico.tipo_cooperacion
        ),
        datasets: [
            {
                label: "Total",
                data: graficoProyectosTipos?.map((grafico) => grafico.monto),
                backgroundColor: [
                    "rgba(0,255,127)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(54, 162, 120, 0.5)",
                    "rgba(54, 120, 120, 0.5)",
                ],
                borderColor: ["rgba(12, 202, 69)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card mt={10} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <DivTitle title="Distribución de Montos por Tipos de Coop" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {graficoProyectosTipos.length > 0 ? (
                    <PolarArea
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
