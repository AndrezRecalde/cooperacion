import { useEffect } from "react";
import { Grid, Group, Table } from "@mantine/core";
import { ChartObjetivos } from "../../../components";
import { useDashboardStore } from "../../../hooks";

export const ViewGraphics = () => {
    const { startLoadingProyectosOds, startClearDashboard, totalProyectosOds } =
        useDashboardStore();

    useEffect(() => {
        startLoadingProyectosOds();
        return () => {
            startClearDashboard();
        };
    }, []);

    const rows = totalProyectosOds.map((proyecto) => (
        <tr key={proyecto.objetivo_ods}>
            <td>{proyecto.objetivo_ods}</td>
            <td>{proyecto.total}</td>
        </tr>
    ));

    return (
        <Grid>
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <ChartObjetivos />
                    <Table
                        striped
                        highlightOnHover
                        withBorder
                        withColumnBorders
                        mt={20}
                    >
                        <thead>
                            <tr>
                                <th>Objetivo de Desarrollo Sostenible</th>
                                <th>Cantidad de Proyectos ejecutados</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
            </Grid.Col>
        </Grid>
    );
};
