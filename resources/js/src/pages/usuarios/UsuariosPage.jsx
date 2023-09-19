import { Card, Text } from "@mantine/core";
import { useEffect } from "react";
import {
    InfoHeader,
    ModalActivateUser,
    ModalUsuario,
    TableUsuarios,
    TitleSections,
} from "../../components";
import { useUsuarioStore } from "../../hooks";

export const UsuariosPage = () => {
    const { usuarios, startLoadUsuarios, startClearUsuarios } =
        useUsuarioStore();

    useEffect(() => {
        startLoadUsuarios();

        return () => {
            startClearUsuarios();
        };
    }, []);

    return (
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Usuarios
            </Text>
            <InfoHeader
                texto={`Existen ${usuarios.length} usuarios registradas.`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Usuarios" fw={700} />
                </Card.Section>
                <Card.Section>
                    <TableUsuarios />
                </Card.Section>
            </Card>
            <ModalUsuario />
            <ModalActivateUser />
        </>
    );
};
