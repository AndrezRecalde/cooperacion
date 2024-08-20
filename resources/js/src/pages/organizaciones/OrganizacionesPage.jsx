import { useEffect } from "react";
import { Button, Card, Group, Text } from "@mantine/core";
import { IconDownload, IconFileTypeXls } from "@tabler/icons-react";
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

            <Group position="right" mb={10}>
                <Button
                    color="teal"
                    leftIcon={<IconFileTypeXls size="1.4rem" />}
                    onClick={(e) => handleExportOrg(e)}
                >
                    Exportar
                </Button>
            </Group>

            <TableOrganizaciones />
            <ModalOrganizacion />
            <ModalActivateOrg />
            <ModalShowOrganizacion />
            <ModalEliminarOrg />
        </>
    );
};
