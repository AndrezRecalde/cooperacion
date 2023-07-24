import { Card, Grid, Text } from "@mantine/core";
import { DivTitle } from "../../../components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartShowOrganizacion = ({ activateOrganizacion }) => {
    const proyectosOrganizacion = {
        labels: ["Proyectos Ejecutados", "Proyectos en Revisión"],
        datasets: [
            {
                label: "Total",
                data: [
                    activateOrganizacion?.proyectos_activos,
                    activateOrganizacion?.proyectos_inactivos,
                ],
                backgroundColor: [
                    "rgba(39, 255, 96, 0.61)",
                    "rgba(255, 39, 39, 0.61)",
                ],
                borderColor: ["rgba(0,100,0)", "rgba(128,0,0)"],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <DivTitle title="Distribución de Proyectos" fw={700} />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {activateOrganizacion?.proyectos_activos === null &&
                activateOrganizacion?.proyectos_inactivos === null ? (
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
