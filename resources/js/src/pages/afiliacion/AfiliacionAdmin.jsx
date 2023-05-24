import { useEffect } from "react";
import { Card, Container, Text } from "@mantine/core";
import { useAfiliacionStore } from "../../hooks/afiliacion/useAfiliacionStore";
import { InfoHeader, TitleCard } from "../../components";
import { TableAfiliaciones } from "../../components/afiliacion/table/TableAfiliaciones";
import { ModalContactado } from "../../components/afiliacion/contactar/ModalContactado";

export const AfiliacionAdmin = () => {
    const { startLoadAfiliaciones, startClearAfiliaciones, afiliaciones } =
        useAfiliacionStore();

    useEffect(() => {
        startLoadAfiliaciones();

        return () => {
            startClearAfiliaciones();
        };
    }, []);

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Organizaciones
            </Text>
            <Text mb="xl" fz={16} fw={500} c="teal">
                Existen {afiliaciones.length} organizaciones registradas
            </Text>
            <InfoHeader
                texto="En esta seccion podras encontrar una lista de las organizaciones
                nacionales e internacionales con las que el Gobierno Autonomo
                Descentralizado de la Provincia de Esmeraldas guarda convenios
                de cooperacion."
            />
            <Card
                withBorder
                radius="md"
                mt="lg"
                mb="lg"
                shadow="sm"
                sx={{ position: "static" }}
            >
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Organizaciones" />
                </Card.Section>
                <Card.Section>
                    <TableAfiliaciones />
                </Card.Section>
            </Card>
            <ModalContactado />
        </Container>
    );
};
