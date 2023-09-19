import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { useTipoCoopStore } from "../../hooks";
import {
    InfoHeader,
    ModalTipoCoop,
    TableTiposCoop,
    TitleSections,
} from "../../components";

export const TiposCoopPage = () => {
    const { starLoadTiposCoopAdmin, tiposCopperaciones } = useTipoCoopStore();

    useEffect(() => {
        starLoadTiposCoopAdmin();
    }, []);

    return (
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Tipos de Cooperacion
            </Text>
            <InfoHeader
                texto={`Existen ${tiposCopperaciones.length} tipos de cooperación.`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Tipos de Cooperación" />
                </Card.Section>
                <Card.Section>
                    <TableTiposCoop />
                </Card.Section>
            </Card>
            <ModalTipoCoop />
        </>
    );
};
