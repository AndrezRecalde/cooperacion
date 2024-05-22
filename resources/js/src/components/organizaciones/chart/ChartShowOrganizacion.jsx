import { Card, Grid, Text } from "@mantine/core";
import { TitleSections } from "../../../components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartShowOrganizacion = ({ activateOrganizacion }) => {
    const proyectosOrganizacion = {
        labels: [
            "Proyectos Finalizados",
            "Proyectos en Proceso",
            "Proyectos Iniciados",
        ],
        datasets: [
            {
                label: "Total",
                data: [
                    activateOrganizacion?.proyectos_finalizados.length,
                    activateOrganizacion?.proyectos_proceso.length,
                    activateOrganizacion?.proyectos_iniciados.length,
                ],
                backgroundColor: [
                    "rgba(39, 255, 96, 0.8)",
                    "rgba(58, 76, 249, 0.8)",
                    "rgba(246, 223, 74, 0.8)",
                ],
                borderColor: [
                    "rgba(0, 211, 56, 0.8)",
                    "rgba(9, 33, 247, 0.8)",
                    "rgba(243, 211, 7, 0.8)",
                ],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card withBorder radius="sm" mt="md" mb="lg" shadow="sm">
            <Card.Section withBorder inheritPadding py="xs">
                <TitleSections title="Distribución de Proyectos" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {activateOrganizacion?.proyectos_finalizados.length === 0 &&
                activateOrganizacion?.proyectos_proceso.length === 0 &&
                activateOrganizacion.proyectos_iniciados.length === 0 ? (
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
                                    Aun no se registran proyectos
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                ) : (
                    <Pie
                        height={180}
                        data={proyectosOrganizacion}
                        options={{ maintainAspectRatio: false }}
                    />
                )}
            </Card.Section>
        </Card>
    );
};
