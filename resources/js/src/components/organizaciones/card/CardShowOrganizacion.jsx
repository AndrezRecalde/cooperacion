import {
    Anchor,
    Badge,
    Box,
    Button,
    Card,
    Grid,
    Group,
    Image,
    Table,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import { IconThumbUp } from "@tabler/icons-react";
import { useOrganizacionStore } from "../../../hooks";
import { ChartShowOrganizacion, TitleSections } from "../../../components";
import Flag from "react-flagkit";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    section_a: {
        display: "flex",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
    },
    section_b: {
        display: "flex",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        marginTop: rem(12),
    },
    count: {
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        fontSize: rem(40),
        lineHeight: 1,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: rem(-0.25),
        textTransform: "uppercase",
    },
    title: {
        textTransform: "uppercase",
        fontWeight: 700,
        fontSize: theme.fontSizes.sm,
        color: "dimgray",
    },
    description: {
        fontSize: theme.fontSizes.sm,
        marginTop: rem(5),
    },
    section_info: {
        marginBottom: "10px",
    },
}));

export const CardShowOrganizacion = ({ handleCloseShowModal }) => {
    const { classes } = useStyles();

    const { activateOrganizacion } = useOrganizacionStore();

    return (
        <Card radius="md" className={classes.card}>
            <Card.Section inheritPadding>
                <Grid>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Group position="apart">
                            <Flag
                                country={activateOrganizacion?.code}
                                size={22}
                            />
                            <Text pr={0} fz={14} fs="italic">
                                {activateOrganizacion?.pais} -{" "}
                                {activateOrganizacion?.estado}
                            </Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Text fz={14} fw={700} c="dimmed" tt="uppercase">
                            {activateOrganizacion?.nombre_organizacion}
                        </Text>
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Group position="center">
                            <Image
                                radius="xl"
                                mt={10}
                                width={100}
                                height={90}
                                src={
                                    "/storage" +
                                    activateOrganizacion?.imagen_url
                                }
                                withPlaceholder
                                fit="contain"
                            />
                        </Group>
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Table
                            horizontalSpacing="sm"
                            verticalSpacing="sm"
                            striped
                            highlightOnHover
                            withBorder
                            withColumnBorders
                        >
                            <thead>
                                <tr>
                                    <th>Tipo de convenio</th>
                                    <th>Tipo de Organización</th>
                                    <th>Número de proyectos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{activateOrganizacion?.convenio}</td>
                                    <td>{activateOrganizacion?.tipo}</td>
                                    <td>{activateOrganizacion?.proyectos.length}</td>
                                    {/* {activateOrganizacion?.sitio_web ? (
                                        <td>
                                            <Anchor
                                                href={`https://${activateOrganizacion.sitio_web}`}
                                                target="_blank"
                                                underline={false}
                                                color="dark"
                                            >
                                                {activateOrganizacion.sitio_web}
                                            </Anchor>
                                        </td>
                                    ) : (
                                        <td>
                                            <Text fs="italic">
                                                Sitio web no registrado
                                            </Text>
                                        </td>
                                    )} */}
                                </tr>
                            </tbody>
                        </Table>
                    </Grid.Col>
                   {/*  <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Table
                            horizontalSpacing="sm"
                            verticalSpacing="sm"
                            striped
                            highlightOnHover
                            withBorder
                            withColumnBorders
                        >
                            <thead>
                                <tr>
                                    <th>Lugar del proyecto</th>
                                    <th>Número de proyectos</th>
                                </tr>
                            </thead>
                        </Table>
                    </Grid.Col> */}
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <ChartShowOrganizacion
                            activateOrganizacion={activateOrganizacion}
                        />
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Group position="center" mt="xl">
                <Box w={230}>
                    <Button
                        fullWidth
                        variant="light"
                        color="teal.7"
                        leftIcon={<IconThumbUp />}
                        onClick={handleCloseShowModal}
                    >
                        Entendido
                    </Button>
                </Box>
            </Group>
        </Card>
    );
};
