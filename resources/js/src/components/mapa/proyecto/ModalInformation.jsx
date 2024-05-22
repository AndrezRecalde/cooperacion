import {
    Card,
    Flex,
    Grid,
    Group,
    List,
    Modal,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Tooltip,
    createStyles,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconCircleCheckFilled, IconFlag2Filled } from "@tabler/icons-react";
import { useUiMapa, useMarkerStore } from "../../../hooks";
import { TitleSections } from "../../../components";
import Flag from "react-flagkit";

const useStyles = createStyles((theme) => ({
    section_a: {
        display: "flex",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    },
    section: {
        padding: theme.spacing.xs,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
    title: {
        textTransform: "uppercase",
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
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

export const ModalInformation = () => {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const { isOpenModalInformation, modalActionInformation } = useUiMapa();
    const { startClearActivateMarker, activateMarker } = useMarkerStore();

    const handleCloseModalInf = () => {
        modalActionInformation(0);
        startClearActivateMarker();
    };
    return (
        <Modal
            opened={isOpenModalInformation}
            onClose={handleCloseModalInf}
            title={
                <TitleSections
                    title="Información Técnica del proyecto"
                    fw={700}
                    fz="sm"
                />
            }
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
        >
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Stack>
                        <div>
                            <Text fz="sm" fw={700}>
                                {activateMarker?.nombre_organizacion}
                            </Text>
                            <Text fz="sm" c="dimmed">
                                Organización
                            </Text>
                        </div>
                        <div mt="lg">
                            <Text fz="sm" fw={700}>
                                {activateMarker?.nombre_proyecto}
                            </Text>
                            <Text fz="sm" c="dimmed">
                                Proyecto
                            </Text>
                        </div>
                        <Table striped withBorder withColumnBorders>
                            <thead>
                                <tr>
                                    <th>Tipo Cooperación</th>
                                    <th>Tipo Modalidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{activateMarker?.tipo_cooperacion}</td>
                                    <td>{activateMarker?.tipo_modalidad}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Stack>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <div className={classes.section}>
                        <Text className={classes.title}>
                            Area de Intervención
                        </Text>
                        <div className={classes.section_a}>
                            <Group spacing={8} mb={-8}>
                                {activateMarker?.cantones.map((canton) => (
                                    <List
                                        key={canton.id}
                                        spacing="xs"
                                        size="sm"
                                        center
                                        icon={
                                            <ThemeIcon
                                                color="cyan.7"
                                                size={24}
                                                radius="xl"
                                            >
                                                <IconFlag2Filled size="1rem" />
                                            </ThemeIcon>
                                        }
                                    >
                                        <List.Item>
                                            {canton.nombre_canton}
                                        </List.Item>
                                    </List>
                                ))}
                            </Group>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col sm={6} md={6} lg={6} xl={6}>
                    <div className={classes.section}>
                        <Text className={classes.title}>
                            Objetivos de Desarrollo
                        </Text>
                        <div className={classes.section_a}>
                            <Group spacing={8} mb={-8}>
                                {activateMarker?.odsostenibles.map((ods) => (
                                    <List
                                        key={ods.id}
                                        spacing="xs"
                                        size="sm"
                                        center
                                        icon={
                                            <ThemeIcon
                                                color="blue.7"
                                                size={24}
                                                radius="xl"
                                            >
                                                <IconCircleCheckFilled size="1rem" />
                                            </ThemeIcon>
                                        }
                                    >
                                        <List.Item>
                                            {ods.objetivo_ods}
                                        </List.Item>
                                    </List>
                                ))}
                            </Group>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col sm={6} md={6} lg={6} xl={6}>
                    <div className={classes.section}>
                        <Text className={classes.title}>
                            Grupos de Atencion Prioritario
                        </Text>
                        <div className={classes.section_a}>
                            <Group spacing={8} mb={-8}>
                                {activateMarker?.grupos.map((grupo) => (
                                    <List
                                        key={grupo.id}
                                        spacing="xs"
                                        size="sm"
                                        center
                                        icon={
                                            <ThemeIcon
                                                color="teal"
                                                size={24}
                                                radius="xl"
                                            >
                                                <IconCircleCheckFilled size="1rem" />
                                            </ThemeIcon>
                                        }
                                    >
                                        <List.Item>{grupo.grupo}</List.Item>
                                    </List>
                                ))}
                            </Group>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Flex
                        mih={20}
                        gap="sm"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                        mb={10}
                    >
                        <Text fz={14} fw={700} c="dimmed" tt="uppercase">
                            {activateMarker?.fechas_periodo}
                        </Text>
                        <Flag country={activateMarker?.code} size={20} />
                        <Flag country="EC" size={20} />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Modal>
    );
};
