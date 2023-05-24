import { useEffect } from "react";
import { Button, Card, Container, Group, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import {
    InfoHeader,
    ModalActivateOrg,
    ModalOrganizacion,
    ModalShowOrganizacion,
    TableOrganizaciones,
    TitleCard,
} from "../../components";
import { useOrganizacionStore } from "../../hooks/organizacion/useOrganizacionStore";

export const OrganizacionesPage = () => {
    const {
        starLoadOrganizaciones,
        startClearOrganizaciones,
        organizaciones,
        exportExcelOrganizaciones,
    } = useOrganizacionStore();

    useEffect(() => {
        starLoadOrganizaciones();

        return () => {
            startClearOrganizaciones();
        };
    }, []);

    const handleExportOrg = (e) => {
        e.preventDefault();
        exportExcelOrganizaciones();
    };

    return (
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Organizaciones
            </Text>
            <Text mb="xl" fz={16} fw={500} c="teal">
                Existen {organizaciones.length} organizaciones registradas
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
                    <Group position="apart">
                        <TitleCard title="Lista de Organizaciones" />
                        <Button
                            variant="light"
                            color="teal"
                            uppercase
                            leftIcon={<IconDownload size="1.2rem" />}
                            onClick={(e) => handleExportOrg(e)}
                        >
                            Excel
                        </Button>
                    </Group>
                </Card.Section>
                <Card.Section>
                    <TableOrganizaciones />
                </Card.Section>
            </Card>
            <ModalOrganizacion />
            <ModalActivateOrg />
            <ModalShowOrganizacion />
        </Container>
    );
};
