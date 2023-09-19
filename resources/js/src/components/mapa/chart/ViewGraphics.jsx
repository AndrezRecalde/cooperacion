import { useEffect } from "react";
import { Grid } from "@mantine/core";
import { ChartObjetivos } from "../../../components";
import { useDashboardStore } from "../../../hooks";

export const ViewGraphics = () => {

    const { startLoadingProyectosOds, startClearDashboard } = useDashboardStore();

    useEffect(() => {
        startLoadingProyectosOds();
        return () => {
            startClearDashboard();
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
