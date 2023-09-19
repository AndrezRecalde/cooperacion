import { useEffect } from "react";
import { Flex, Grid, Loader, Skeleton } from "@mantine/core";
import {
    ChartModalidad,
    ChartObjetivos,
    ChartTipos,
    DivHeader,
    StatMontoEjecutado,
    StatMontoPartida,
    StatOrganizacion,
    StatProyecto,
} from "../../components/";
import { proyectoData } from "../../components/dashboard/json/proyectoData.json";
import { organizacionData } from "../../components/dashboard/json/organizacionData.json";
import { useAuthStore, useDashboardStore } from "../../hooks";

export const DashboardPage = () => {
    const { isLoading, profile } = useAuthStore();
    const {
        isLoading: isLoad,
        startLoadingTotalOrganizaciones,
        startLoadingTotalProyectos,
        startLoadingProyectosModalidad,
        startLoadingProyectosOds,
        startLoadingProyectosTipos,
        startLoadingMontos,
        startClearDashboard,
    } = useDashboardStore();

    useEffect(() => {
        startLoadingTotalOrganizaciones();
        startLoadingTotalProyectos();
        startLoadingProyectosModalidad();
        startLoadingProyectosTipos();
        startLoadingMontos();
        startLoadingProyectosOds();
        return () => {
            startClearDashboard();
        };
    }, []);

    return (
        <>
            <Grid>
                <Grid.Col span={12}>
                    <Skeleton
                        visible={isLoading}
                        height={8}
                        mt={6}
                        mb={20}
                        radius="xl"
                    >
                        <DivHeader
                            saludo="Bienvenido, "
                            usuario={profile.nombres + " " + profile.apellidos}
                        />
                    </Skeleton>
                </Grid.Col>
                {!isLoad ? (
                    <>
                        <Grid.Col xs={12} md={6} lg={6} xl={6}>
                            <StatMontoEjecutado />
                        </Grid.Col>
                        <Grid.Col xs={12} md={6} lg={6} xl={6}>
                            <StatMontoPartida />
                        </Grid.Col>
                        <Grid.Col xs={12} md={8} lg={8} xl={8}>
                            <StatProyecto proyectoData={proyectoData} />
                            <StatOrganizacion
                                organizacionData={organizacionData}
                            />
                        </Grid.Col>
                        <Grid.Col xs={12} md={4} lg={4} xl={4}>
                            <ChartModalidad />
                        </Grid.Col>
                        <Grid.Col xs={12} md={6} lg={6} xl={6}>
                            <ChartTipos />
                        </Grid.Col>
                        <Grid.Col xs={12} md={6} lg={6} xl={6}>
                            <ChartObjetivos />
                        </Grid.Col>
                    </>
                ) : (
                    <Flex
                        mih={150}
                        gap="md"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        <Loader variant="bars" color="teal.5" size="xl" />
                    </Flex>
                )}
            </Grid>
        </>
    );
};
