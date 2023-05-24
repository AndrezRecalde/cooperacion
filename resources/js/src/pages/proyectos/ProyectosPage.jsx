import { useEffect } from "react";
import { Card, Container, Text } from "@mantine/core";
import {
    InfoHeader,
    ModalActivateProyecto,
    ModalEliminarProyecto,
    ModalProyecto,
    TableProyectos,
    TitleCard,
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
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Proyectos
            </Text>
            <Text mb="xl" fz={15} fw={500} c="teal">
                Existen {proyectos.length} proyectos registrados
            </Text>
            <InfoHeader
                texto="En esta seccion podras encontrar una lista de los proyectos
                realizados a través de las diferentes organizaciones nacionales
                e internacionales."
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Proyectos" />
                </Card.Section>
                <Card.Section>
                    <TableProyectos />
                </Card.Section>
            </Card>
            <ModalProyecto />
            <ModalActivateProyecto />
            <ModalEliminarProyecto />
        </Container>
    );
};
