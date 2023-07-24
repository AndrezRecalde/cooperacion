import { Grid } from "@mantine/core";
import { ChartObjetivos } from "../../../components";
import { useProyectoStore } from "../../../hooks";
import { useEffect } from "react";

export const ViewGraphics = () => {
    const {
        setGraficoProyectosOds,
        setGraficoProyectosTipos,
        startClearGraficos,
    } = useProyectoStore();

    useEffect(() => {
        setGraficoProyectosOds();
        setGraficoProyectosTipos();
        return () => {
            startClearGraficos();
        };
    }, []);

    return (
        <Grid>
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <ChartObjetivos />
            </Grid.Col>
        </Grid>
    );
};
