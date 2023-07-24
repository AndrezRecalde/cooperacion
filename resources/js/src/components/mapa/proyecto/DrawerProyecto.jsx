import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Drawer,
    Flex,
    Grid,
    Group,
    Text,
    Tooltip,
} from "@mantine/core";
import { useUiMapa, useMarkerStore } from "../../../hooks";
import { DivTitle } from "../../../components";
import { IconChecks, IconChevronsLeft, IconLoader3 } from "@tabler/icons-react";
import Flag from "react-flagkit";

export const DrawerProyecto = () => {
    const {
        isOpenDrawerProyectos,
        drawerActionProyectos,
        modalActionInformation,
        drawerMenu
    } = useUiMapa();
    const { proyectosMarkers, setActiveMarker, startClearProyectoMarkers, errores } = useMarkerStore();

    const handleCloseDrawer = () => {
        drawerActionProyectos(0);
    };

    const handleSelected = (selected) => {
        setActiveMarker(selected);
        modalActionInformation(1);
    };

    const handleBack = () => {
        drawerActionProyectos(0);
        startClearProyectoMarkers();
        drawerMenu(1);
    }

    return (
        <Drawer
            opened={isOpenDrawerProyectos}
            onClose={handleCloseDrawer}
            withOverlay={false}
            padding="md"
            title={<DivTitle title="Resultado de Proyectos" fw={700} />}
            size="md"
        >
            <Button onClick={handleBack} fullWidth  variant="light" color="teal.7" mb={2} leftIcon={<IconChevronsLeft size="1rem" />}>
                Regresar
            </Button>
            {proyectosMarkers.length !== 0 ? (
                proyectosMarkers.map((proyecto) => (
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        mb={10}
                        onClick={() => handleSelected(proyecto)}
                        sx={{ cursor: "pointer" }}
                        key={proyecto.id}
                    >
                        <Grid align="center">
                            <Grid.Col sm={9} md={9} lg={9} xl={9}>
                                <Text fz="sm" weight={700}>
                                    {proyecto.nombre_organizacion}
                                </Text>
                            </Grid.Col>
                            <Grid.Col sm={3} md={3} lg={3} xl={3}>
                                <Flex
                                    mih={20}
                                    gap="sm"
                                    justify="flex-end"
                                    align="flex-start"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Flag country={proyecto.code} size={20} />
                                    <Flag country="EC" size={20} />
                                </Flex>
                            </Grid.Col>
                            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                                <Text fz="sm" weight={500}>
                                    {proyecto.nombre_proyecto}
                                </Text>
                            </Grid.Col>
                            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                                <Group position="apart">
                                    <Badge
                                        size="md"
                                        color="cyan"
                                        variant="outline"
                                        radius="sm"
                                    >
                                        {proyecto.tipo_cooperacion}
                                    </Badge>
                                    <Tooltip
                                        label={proyecto.estado}
                                        color={
                                            proyecto.estado === "Finalizado"
                                                ? "blue"
                                                : "red"
                                        }
                                        withArrow
                                        transitionProps={{
                                            transition: "slide-left",
                                            duration: 300,
                                        }}
                                    >
                                        <ActionIcon
                                            color={
                                                proyecto.estado === "Finalizado"
                                                    ? "blue"
                                                    : "red"
                                            }
                                            size="lg"
                                            radius="xl"
                                        >
                                            {proyecto.estado ===
                                            "Finalizado" ? (
                                                <IconChecks size="1.3rem" />
                                            ) : (
                                                <IconLoader3 size="1.3rem" />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Card>
                ))
            ) : (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    mb={10}
                    /* onClick={() => console.log("clic")} */
                    sx={{ cursor: "pointer" }}
                >
                    <Grid>
                        <Grid.Col sm={12} md={12} lg={12} xl={12}>
                            <Text fz="sm" weight={700}>
                                {errores}
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card>
            )}
        </Drawer>
    );
};
