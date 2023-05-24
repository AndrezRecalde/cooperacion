import { Card, Container, Text } from "@mantine/core";
import { InfoHeader, ModalModalidad, TableModalidades, TitleCard } from "../../components";

import { useModalidadStore } from "../../hooks/modalidad/useModalidadStore";
import { useEffect } from "react";

export const ModalidadesPage = () => {
    const { startLoadModalidadesAdmin, modalidades } = useModalidadStore();

    useEffect(() => {
        startLoadModalidadesAdmin();
    }, []);

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Modalidades
            </Text>
            <Text mb="xl" fz={15} fw={500} c="teal">
                Existen {modalidades.length} modalidades registrados
            </Text>
            <InfoHeader
                texto="En esta seccion podras encontrar una lista de los tipos de
                modalidades de cooperación."
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Modalidades" />
                </Card.Section>
                <Card.Section>
                    <TableModalidades />
                </Card.Section>
            </Card>
            <ModalModalidad />
        </Container>
    );
};
