import { Card, Grid, Text } from "@mantine/core";
import { DivTitle } from "../../components";
import { useProyectoStore } from "../../hooks";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartObjetivos = () => {

    const { errores, graficoProyectosOds } = useProyectoStore()

    const proyectosOds = {
        labels: graficoProyectosOds?.map((grafico) => grafico.objetivo_ods),
        datasets: [
            {
                label: "Total",
                data: graficoProyectosOds?.map((grafico) => grafico.total),
                backgroundColor: graficoProyectosOds?.map(
                    (grafico) => grafico.color
                ),
                borderColor: [],
                borderWidth: 1.5,
            },
        ]
    };



    return (
        <Card mt={10} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <DivTitle title="Distribución de Proyectos por Objetivos" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {graficoProyectosOds.length > 0 ? (
                    <Pie
                        height={350}
                        data={proyectosOds}
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
