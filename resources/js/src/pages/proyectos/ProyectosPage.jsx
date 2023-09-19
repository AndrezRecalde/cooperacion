import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import {
    InfoHeader,
    ModalActivateProyecto,
    ModalEliminarProyecto,
    ModalProyecto,
    TableProyectos,
    TitleSections,
} from "../../components";
import { useProyectoStore } from "../../hooks";

export const ProyectosPage = () => {
    const { proyectos, startLoadProyectosAdmin, startClearProyectos } =
        useProyectoStore();

    useEffect(() => {
        startLoadProyectosAdmin();

        return () => {
            startClearProyectos();
        };
    }, []);

    return (
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Proyectos
            </Text>
            <InfoHeader
                texto={`Existen ${proyectos.length} proyectos registrados`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Proyectos" fw={700} />
                </Card.Section>
                <Card.Section>
                    <TableProyectos />
                </Card.Section>
            </Card>
            <ModalProyecto />
            <ModalActivateProyecto />
            <ModalEliminarProyecto />
        </>
    );
};
