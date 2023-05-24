import { Card, Container, Text } from "@mantine/core";
import { useTipoCoopStore } from "../../hooks/tipo_cooperacion/useTipoCoopStore";
import { InfoHeader, ModalTipoCoop, TableTiposCoop, TitleCard } from "../../components";
import { useEffect } from "react";

export const TiposCoopPage = () => {
    const { starLoadTiposCoopAdmin } = useTipoCoopStore();

    useEffect(() => {
        starLoadTiposCoopAdmin();
    }, []);

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Tipos de Cooperacion
            </Text>
            <Text mb="xl" fz={16} fw={500} c="teal">
                Existen 12 tipos de cooperación
            </Text>
            <InfoHeader
                texto=" En esta seccion podras encontrar una lista de los usuarios
                registrados en el sistema."
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Tipos de Cooperación" />
                </Card.Section>
                <Card.Section>
                    <TableTiposCoop />
                </Card.Section>
            </Card>
            <ModalTipoCoop />
        </Container>
    );
};
