import {
    Badge,
    Button,
    Divider,
    Drawer,
    Flex,
    Grid,
    Group,
    Select,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DivTitle } from "../../../components";
import { useUiMapa } from "../../../hooks/mapa/useUiMapa";
import { useStateStore } from "../../../hooks/state/useStateStore";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useOdsStore } from "../../../hooks/ods/useOdsStore";
import { useMarkerStore } from "../../../hooks/marker/useMarkerStore";
import { DrawerProyecto } from "../proyecto/DrawerProyecto";
import { useOrganizacionStore } from "../../../hooks/organizacion/useOrganizacionStore";

export const DrawerMenu = () => {
    const theme = useMantineTheme();

    const { isOpenDrawerMenu, drawerMenu, drawerActionProyectos } = useUiMapa();

    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        starClearStates,
    } = useStateStore();

    const { starLoadObjetivos, startClearObjetivos, objetivos } = useOdsStore();

    const { startOnSearch } = useMarkerStore();

    const { startLoadOrgActivas, organizaciones } = useOrganizacionStore();

    const form = useForm({
        initialValues: {
            canton_id: "",
            parroquia_id: "",
            recinto_id: "",
            ods_id: "",
            organizacion_id: "",
        },
    });

    const { canton_id, parroquia_id } = form.values;

    useEffect(() => {
        startLoadCantones();
        starLoadObjetivos();
        startLoadOrgActivas();
    }, []);

    useEffect(() => {
        form.setFieldValue("parroquia_id", "");
        startLoadParroquias(canton_id);
    }, [canton_id]);

    useEffect(() => {
        form.setFieldValue("recinto_id", "");
        startLoadRecintos(parroquia_id);
    }, [parroquia_id]);

    const handleCloseDrawer = () => {
        drawerMenu(0);
        form.reset();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        startOnSearch(form.values);
        form.reset();
        drawerMenu(0);
        drawerActionProyectos(1);
    };

    return (
        <>
            <Drawer
                opened={isOpenDrawerMenu}
                onClose={handleCloseDrawer}
                overlayProps={{
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[9]
                            : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                padding="md"
                title={<DivTitle title="Búsqueda de Proyectos" fw={700} />}
                size="md"
            >
                <Grid>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            placeholder="Selecciona Cantón"
                            label="Cantón"
                            data={cantones.map((canton) => {
                                return {
                                    label: canton.nombre_canton,
                                    value: canton.id,
                                };
                            })}
                            {...form.getInputProps("canton_id")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            placeholder="Selecciona Parroquia"
                            label="Parroquia"
                            data={parroquias.map((parroquia) => {
                                return {
                                    label: parroquia.nombre_parroquia,
                                    value: parroquia.id,
                                };
                            })}
                            mt={5}
                            {...form.getInputProps("parroquia_id")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            placeholder="Selecciona Recinto"
                            label="Recinto"
                            data={recintos.map((recinto) => {
                                return {
                                    label: recinto.nombre_recinto,
                                    value: recinto.id,
                                };
                            })}
                            mt={5}
                            {...form.getInputProps("recinto_id")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            placeholder="Selecciona ODS"
                            label="Objetivo de Desarrollo Sostenible"
                            data={objetivos.map((objetivo) => {
                                return {
                                    label: objetivo.objetivo_ods,
                                    value: objetivo.id,
                                };
                            })}
                            {...form.getInputProps("ods_id")}
                            mt={5}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            placeholder="Selecciona la Organización"
                            label="Organización"
                            data={organizaciones.map((organizacion) => {
                                return {
                                    label: organizacion.nombre_organizacion,
                                    value: organizacion.id,
                                };
                            })}
                            {...form.getInputProps("organizacion_id")}
                            mt={5}
                        />
                    </Grid.Col>
                </Grid>

                <Group position="center">
                    <Button
                        variant="outline"
                        color="teal"
                        leftIcon={<IconSearch size={15} />}
                        mt={20}
                        mb={20}
                        onClick={(e) => handleSearch(e)}
                    >
                        Realizar Búsqueda
                    </Button>
                </Group>

                <Divider my="sm" />
                {/* <DivTitle title="Selección rápida" fw={700} />
                <Chip.Group position="center" mt={15} mb={15}>
                    <Group position="center" mt="md">
                        <Chip radius="md" color="teal" value="1">
                            Educación
                        </Chip>
                        <Chip radius="md" color="teal" value="2">
                            Bienestar y salud
                        </Chip>
                        <Chip radius="md" color="teal" value="3">
                            Trabajo y crecimiento
                        </Chip>
                    </Group>
                </Chip.Group>
                <Divider my="sm" /> */}
                <Flex
                    mih={100}
                    gap="md"
                    justify="flex-end"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Badge size="lg" color="teal.7" radius="md">
                        Bienvenido a la Plataforma OCIE del GADPE
                    </Badge>
                </Flex>
            </Drawer>
            <DrawerProyecto />
        </>
    );
};
