import { useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { InfoHeader, ModalModalidad, TableModalidades, TitleSections } from "../../components";
import { useModalidadStore } from "../../hooks";

export const ModalidadesPage = () => {
    const { startLoadModalidadesAdmin, modalidades } = useModalidadStore();

    useEffect(() => {
        startLoadModalidadesAdmin();
    }, []);

    return (
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Modalidades
            </Text>
            <InfoHeader
                texto={`Existen ${modalidades.length} modalidades registradas.`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Modalidades" />
                </Card.Section>
                <Card.Section>
                    <TableModalidades />
                </Card.Section>
            </Card>
            <ModalModalidad />
        </>
    );
};
