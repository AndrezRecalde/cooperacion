import { Card, Text } from "@mantine/core";
import {
    InfoHeader,
    ModalRefInter,
    TableRefInter,
    TitleSections,
} from "../../../components";
import { useInternacionalStore } from "../../../hooks";
import { useEffect } from "react";

export const InternacionalPage = () => {
    const { startLoadRefInter, referencias } = useInternacionalStore();

    useEffect(() => {
        startLoadRefInter();

        /* return () => {
       second
     } */
    }, []);

    return (
        <>
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Referencias Internacionales
            </Text>
            <InfoHeader
                texto={`Existen ${referencias.length} referencias internacionales
                registrados`}
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Lista de Refeencias Internacionales" />
                </Card.Section>
                <Card.Section>
                    <TableRefInter />
                </Card.Section>
            </Card>
            <ModalRefInter />
        </>
    );
};
