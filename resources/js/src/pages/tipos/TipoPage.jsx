import { useEffect } from "react";
import { Card, Container, Text } from "@mantine/core";
import { InfoHeader, ModalTipo, TableTipos, TitleCard } from "../../components";
import { useTipoStore } from "../../hooks";

export const TipoPage = () => {
    const { tipos, startLoadTipos, startClearTipos } = useTipoStore();

    useEffect(() => {
        startLoadTipos();

        return () => {
            startClearTipos();
        };
    }, []);

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Proyectos
            </Text>
            <Text mb="xl" fz={15} fw={500} c="teal">
                Existen {tipos.length} Tipos de Organización registrados
            </Text>
            <InfoHeader
                texto="En esta seccion podras encontrar una lista de los Tipos de
                Organización realizados a través de las diferentes
                organizaciones nacionales e internacionales."
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Proyectos" />
                </Card.Section>
                <Card.Section>
                    <TableTipos />
                </Card.Section>
            </Card>
            <ModalTipo />
        </Container>
    );
};
