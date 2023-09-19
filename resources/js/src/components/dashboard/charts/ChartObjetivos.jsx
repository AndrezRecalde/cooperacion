import { Card, Grid, Text } from "@mantine/core";
import { TitleSections } from "../..";
import { useDashboardStore, useProyectoStore } from "../../../hooks";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartObjetivos = () => {

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
        ]
    };



    return (
        <Card mt={5} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <TitleSections title="Distribución de Proyectos por Objetivos" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {totalProyectosOds.length > 0 ? (
                    <Doughnut
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
