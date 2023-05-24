import { Card, Container, Text } from "@mantine/core";
import { useEffect } from "react";
import { InfoHeader, ModalActivateUser, ModalUsuario, TableUsuarios, TitleCard } from "../../components";
import { useUsuarioStore } from "../../hooks/usuario/useUsuarioStore";

export const UsuariosPage = () => {

    const { usuarios, startLoadUsuarios, startClearUsuarios } = useUsuarioStore();

    useEffect(() => {
        startLoadUsuarios();

        return () => {
            startClearUsuarios();
        };
    }, []);

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Usuarios
            </Text>
            <Text mb="xl" fz={16} fw={500} c="teal">
                Existen {usuarios.length} usuarios registradas
            </Text>
            <InfoHeader
                texto=" En esta seccion podras encontrar una lista de los usuarios
                registrados en el sistema."
            />
            <Card
                withBorder
                radius="md"
                mt="lg"
                mb="lg"
                shadow="sm"
            >
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Usuarios" />
                </Card.Section>
                <Card.Section>
                    <TableUsuarios />
                </Card.Section>
            </Card>
            <ModalUsuario />
            <ModalActivateUser />
        </Container>
    );
};
