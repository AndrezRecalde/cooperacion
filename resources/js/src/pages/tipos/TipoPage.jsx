import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import {
    InfoHeader,
    ModalTipo,
    TableTipos,
    TitleSections,
} from "../../components";
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
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Tipos de Organización
            </Text>
            <InfoHeader
                texto={`Existen ${tipos.length} tipos de organización registrados.`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Proyectos" />
                </Card.Section>
                <Card.Section>
                    <TableTipos />
                </Card.Section>
            </Card>
            <ModalTipo />
        </>
    );
};
