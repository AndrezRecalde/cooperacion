import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { useAfiliacionStore } from "../../hooks";
import {
    InfoHeader,
    TitleSections,
    TableAfiliaciones,
    ModalContactado,
} from "../../components";

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
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Afiliaciones
            </Text>
            <InfoHeader
                texto={`Existen ${afiliaciones.length} afiliaciones registradas.`}
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
                    <TitleSections
                        fz="xs"
                        title="Lista de Organizaciones que desean afiliarse"
                    />
                </Card.Section>
                <Card.Section>
                    <TableAfiliaciones />
                </Card.Section>
            </Card>
            <ModalContactado />
        </>
    );
};
