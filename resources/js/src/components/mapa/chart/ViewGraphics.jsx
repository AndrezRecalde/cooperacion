import { Grid } from "@mantine/core";
import { ChartObjetivos } from "../../dashboard/ChartObjetivos";
import { ChartTipos } from "../../dashboard/ChartTipos";
import { useProyectoStore } from "../../../hooks/proyecto/useProyectoStore";
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
            {/* <Grid.Col sm={12} md={6} lg={6} xl={6}>
                <ChartTipos />
            </Grid.Col> */}
        </Grid>
    );
};
