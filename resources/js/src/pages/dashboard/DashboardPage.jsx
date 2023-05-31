import { useEffect } from "react";
import { Container, Skeleton } from "@mantine/core";
import { Charts, DivHeader, Stats } from "../../components/";
import { data } from "../../components/dashboard/data.json";
import { useOrganizacionStore, useProyectoStore } from "../../hooks";
import { useAuthStore } from "../../hooks/auth/useAuthStore";
import { useUsuarioStore } from "../../hooks/usuario/useUsuarioStore";

export const DashboardPage = () => {
    const { isLoading, profile, startProfile } = useAuthStore();

    const {
        setTotalProyectos,
        startClearTotales,
        setMontoEjecutado,
        startClearMontos,
    } = useProyectoStore();

    const { startTotalOrganizaciones, setClearTotalesOrg } =
        useOrganizacionStore();

    const { startLoadUsuarios } = useUsuarioStore();

    useEffect(() => {
        startLoadUsuarios();
        setTotalProyectos();
        startTotalOrganizaciones();
        setMontoEjecutado();

        return () => {
            startClearTotales();
            setClearTotalesOrg();
            startClearMontos();
        };
    }, []);

    useEffect(() => {
        startProfile();
    }, []);

    return (
        <Container size="xl">
            <Skeleton visible={isLoading} height={8} mt={6} radius="xl">
                <DivHeader
                    saludo="Bienvenido, "
                    usuario={profile.nombres + " " + profile.apellidos}
                />
            </Skeleton>
            <Stats data={data} />
            <Charts />
        </Container>
    );
};
