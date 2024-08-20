import { Card, Grid, Text } from "@mantine/core";
import { useDashboardStore } from "../../../hooks";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TitleSections } from "../../../components";

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
        ],
    };

    const options = {
        maintainAspectRatio: false, // Desactiva la relación de aspecto
    };

    return (
        <>
            {totalProyectosOds.length > 0 ? (
                <Card mt={5} shadow="sm" p="lg">
                    <Card.Section withBorder inheritPadding py="xs">
                        <TitleSections
                            title="Distribución de Proyectos por Objetivos"
                            fw={700}
                        />
                    </Card.Section>
                    <Card.Section withBorder inheritPadding py="xs">
                        <div style={{ width: "100%", height: "60%" }}>
                            <Doughnut height={350} data={proyectosOds} options={options} />
                        </div>
                    </Card.Section>
                </Card>
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
