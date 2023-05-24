import { Card, Container, Text } from "@mantine/core";
import { InfoHeader, ModalRefInter, TableRefInter, TitleCard } from "../../../components";
import { useInternacionalStore } from "../../../hooks/referencia/internacional/useInternacionalStore";
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
        <Container size="xl">
            <Text mt={15} tt="capitalize" fw={700} fz="xl">
                Referencias Internacionales
            </Text>
            <Text mb="xl" fz={15} fw={500} c="teal">
                Existen {referencias.length} referencias internacionales registrados
            </Text>
            <InfoHeader
                texto="En esta seccion podras encontrar una lista de las Referencias
                Internacionales para la visualizacion correcta de las
                organizaciones."
            />
            <Card withBorder radius="md" mt="lg" mb="lg" shadow="sm">
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleCard title="Lista de Refeencias Internacionales" />
                </Card.Section>
                <Card.Section>
                    <TableRefInter />
                </Card.Section>
            </Card>
            <ModalRefInter />
        </Container>
    );
};
