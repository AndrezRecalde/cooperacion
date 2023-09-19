import { useEffect } from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Grid,
    Flex,
    ActionIcon,
    Anchor,
} from "@mantine/core";

import { useOrganizacionStore, useUiOrganizacion } from "../../../hooks";
import { IconDiscountCheckFilled } from "@tabler/icons-react";

export function CardOrganizacion() {
    const { organizaciones, startLoadOrgActivas, startShowOrganizacion } =
        useOrganizacionStore();
    const { modalShowOrganizacion } = useUiOrganizacion();

    const handleSelectedOrg = (selected) => {
        startShowOrganizacion(selected);
        modalShowOrganizacion(1);
    };

    useEffect(() => {
        startLoadOrgActivas();
    }, []);

    return (
        <div>
            {organizaciones.length !== 0 ? (
                organizaciones.map((organizacion) => (
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        mb={10}
                        onClick={() => handleSelectedOrg(organizacion.id)}
                        sx={{ cursor: "pointer" }}
                        key={organizacion.id}
                    >
                        <Grid>
                            <Grid.Col sm={9} md={9} lg={9} xl={9}>
                                <Group spacing="xs">
                                    <Text fz="sm" weight={700}>
                                        {organizacion.nombre_organizacion}
                                    </Text>
                                    <ActionIcon
                                        color="#1877F2"
                                        size="lg"
                                        radius="xl"
                                    >
                                        <IconDiscountCheckFilled
                                            size={20}
                                            color="indigo.7"
                                        />
                                    </ActionIcon>
                                </Group>
                                <Text fw={500} fz="sm" fs="italic">
                                    {organizacion.abreviatura}
                                </Text>
                                <Text fz="sm" weight={500}>
                                    {organizacion.tipo}
                                </Text>

                                {organizacion.sitio_web ? (
                                    <Anchor
                                        href={`https://${organizacion.sitio_web}`}
                                        target="_blank"
                                        underline={false}
                                    >
                                        {organizacion.sitio_web}
                                    </Anchor>
                                ) : (
                                    <Text fs="italic">
                                        Sitio web no registrado
                                    </Text>
                                )}
                            </Grid.Col>
                            <Grid.Col sm={3} md={3} lg={3} xl={3}>
                                <Flex
                                    mih={30}
                                    gap="sm"
                                    justify="flex-end"
                                    align="flex-end"
                                    direction="column"
                                    wrap="wrap"
                                >
                                    {/* <Flag
                                        country={organizacion.code}
                                        size={50}
                                    /> */}
                                    <Image
                                        mt={10}
                                        width={90}
                                        height={90}
                                        src={
                                            "/storage" + organizacion.imagen_url
                                        }
                                        withPlaceholder
                                        fit="contain"
                                    />
                                    <Text fs="italic" fz="sm" weight={700}>
                                        {organizacion.pais}
                                    </Text>
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </Card>
                ))
            ) : (
                <div>No existen Organizaciones</div>
            )}
        </div>
    );
}
