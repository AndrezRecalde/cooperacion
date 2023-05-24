import { Card, Grid, Text } from "@mantine/core";
import { DivTitle } from "../elements/DivTitle";
import { useOrganizacionStore } from "../../hooks/organizacion/useOrganizacionStore";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export const ChartOrganizaciones = () => {

    const { errores, totalOrganizaciones } = useOrganizacionStore();

    const organizaciones = {
        labels: totalOrganizaciones?.map((org) => org.convenio),
        datasets: [
            {
                label: "Total",
                data: totalOrganizaciones?.map((org) => org.total),
                backgroundColor: [
                    "rgba(39, 255, 96, 0.61)", // Convenio Activo
                    "rgba(39, 96, 255, 0.54)", // En proceso de suscripcion
                    "rgba(255, 39, 39, 0.61)", // Convenio Finalizado
                ],
                borderColor: [
                    "rgba(0,100,0)",
                    "rgba(39, 96, 255, 1)",
                    "rgba(128,0,0)",
                ],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Card mt={10} shadow="sm" p="lg">
            <Card.Section withBorder inheritPadding py="xs">
                <DivTitle
                    title="Distribución de Organizaciones por Convenio"
                    fw={700}
                />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {totalOrganizaciones.length > 0 ? (
                    <Pie
                        height={350}
                        data={organizaciones}
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
