import { useEffect } from "react";
import { Button, Card, Group, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import {
    InfoHeader,
    ModalActivateOrg,
    ModalEliminarOrg,
    ModalOrganizacion,
    ModalShowOrganizacion,
    TableOrganizaciones,
    TitleSections,
} from "../../components";
import { useOrganizacionStore } from "../../hooks";

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
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Organizaciones
            </Text>
            <InfoHeader
                texto={`Existen ${organizaciones.length} organizaciones registradas.`}
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
                        <TitleSections title="Lista de Organizaciones" fw={700} />
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
            <ModalEliminarOrg />
        </>
    );
};
