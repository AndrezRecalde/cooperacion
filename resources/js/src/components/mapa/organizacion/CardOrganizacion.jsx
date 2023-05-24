import {
    createStyles,
    Card,
    Image,
    Text,
    Group,
    Badge,
    Grid,
    Flex,
    ActionIcon,
    Anchor,
} from "@mantine/core";

import { useOrganizacionStore } from "../../../hooks/organizacion/useOrganizacionStore";
import { useEffect } from "react";
import Flag from "react-flagkit";
import { useUiOrganizacion } from "../../../hooks/organizacion/useUiOrganizacion";
import { IconDiscountCheckFilled } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.md,
    },
}));

export function CardOrganizacion() {
    const { classes } = useStyles();

    const { organizaciones, startLoadOrgActivas, setActivateOrganizacion, startShowOrganizacion } =
        useOrganizacionStore();
    const { modalShowOrganizacion } = useUiOrganizacion();

    const handleSelectedOrg = (selected) => {
        //setActivateOrganizacion(selected);
        startShowOrganizacion(selected)
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
                                            color="#1877F2"
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
                                    <Flag
                                        country={organizacion.code}
                                        size={50}
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
