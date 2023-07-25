import { useEffect, useState } from "react";
import { Grid, Group, Loader } from "@mantine/core";
import { useProyectoStore } from "../../hooks";
import {
    ChartReporteProyectos,
    ChartOrganizaciones,
    ChartObjetivos,
    ChartTipos,
} from "../../components";

export const Charts = () => {
    const {
        setGraficoProyectosOds,
        setGraficoProyectosTipos,
        startClearGraficos,
    } = useProyectoStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setGraficoProyectosOds();
        setGraficoProyectosTipos();
        return () => {
            startClearGraficos();
        };
    }, []);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    return (
        <div>
            {loading ? (
                <Group position="center">
                    <Loader color="teal" size="xl" />
                </Group>
            ) : (
                <Grid justify="center">
                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                        <ChartReporteProyectos />
                    </Grid.Col>

                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                        <ChartOrganizaciones />
                    </Grid.Col>

                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                        <ChartObjetivos />
                    </Grid.Col>

                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                        <ChartTipos />
                    </Grid.Col>
                </Grid>
            )}
        </div>
    );
};
