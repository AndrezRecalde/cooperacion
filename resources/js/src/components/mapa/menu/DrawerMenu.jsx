import { useEffect } from "react";
import {
    Badge,
    Button,
    Card,
    Divider,
    Drawer,
    Grid,
    Group,
    Image,
    Select,
    Text,
    createStyles,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DivTitle, DrawerProyecto } from "../../../components";
import {
    useUiMapa,
    useStateStore,
    useOdsStore,
    useMarkerStore,
    useOrganizacionStore,
} from "../../../hooks";
import { useForm } from "@mantine/form";
import odsImage from "../../../assets/images/ods.png";

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
        paddingTop: theme.spacing.md,
        position: "fixed",
        bottom: 30,
    },
}));

export const DrawerMenu = () => {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const { isOpenDrawerMenu, drawerMenu, drawerActionProyectos } = useUiMapa();

    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
    } = useStateStore();

    const { starLoadObjetivos, objetivos } = useOdsStore();

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
                <Group position="center">
                    <Badge size="lg" color="teal.7" radius="md">
                        Bienvenido a la Plataforma OCIE del GADPE
                    </Badge>
                </Group>
                <Divider my="sm" />
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

                <Card
                    p="md"
                    radius="md"
                    component="a"
                    href="https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/"
                    target="_blank"
                    className={classes.footer}
                >
                    <Group position="center">
                        <Text
                            color="dimmed"
                            size="xs"
                            transform="uppercase"
                            weight={700}
                            mt="xs"
                        >
                            Conoce los Objetivos de Desarrollo Sostenible
                        </Text>
                        <Image maw={220} src={odsImage} alt="ODS Image" />
                    </Group>
                </Card>
            </Drawer>
            <DrawerProyecto />
        </>
    );
};
