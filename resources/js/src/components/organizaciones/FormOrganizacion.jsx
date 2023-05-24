import {
    Box,
    Button,
    Grid,
    Group,
    Select,
    Skeleton,
    TextInput,
    Textarea,
} from "@mantine/core";
import { useStateStore } from "../../hooks/state/useStateStore";
import { IconWorldPlus } from "@tabler/icons-react";
import { useTipoStore } from "../../hooks/tipo/useTipoStore";
import { useEffect } from "react";
import { useUiOrganizacion } from "../../hooks/organizacion/useUiOrganizacion";
import { useOrganizacionStore } from "../../hooks/organizacion/useOrganizacionStore";

export const FormOrganizacion = ({ form }) => {
    const { modalActionOrganizacion } = useUiOrganizacion();
    const { paises, estados, startLoadPaises, startLoadEstados } =
        useStateStore();
    const {
        isLoading,
        activateOrganizacion,
        startAddOrganizacion,
        setClearActivateOrganizacion,
    } = useOrganizacionStore();
    const { tipos, startLoadTipos } = useTipoStore();

    const { country_id } = form.values;

    useEffect(() => {
        startLoadPaises();
        startLoadTipos();

        return () => {
            setClearActivateOrganizacion();
        };
    }, []);

    useEffect(() => {
        //Usarlo cuando sean mas de 3 selects y ponerlo en el ultimo select
        /* setTimeout(() => {
            setClearActivateOrganizacion();
        }, 1200); */
        startLoadEstados(country_id);
        form.setFieldValue("state_id", activateOrganizacion?.state_id ?? "");
        setClearActivateOrganizacion();
    }, [country_id]);

    useEffect(() => {
        if (activateOrganizacion !== null) {
            form.setValues({
                ...activateOrganizacion,
            });
            return;
        }
    }, [activateOrganizacion]);

    const handleSubmit = () => {
        startAddOrganizacion(form.values);
        form.reset();
        modalActionOrganizacion(0);
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Skeleton visible={isLoading}>
                <Grid>
                    <Grid.Col sm={12} md={8} lg={8} xl={8}>
                        <TextInput
                            placeholder="Nombre de la organización"
                            label="Organizacion"
                            withAsterisk
                            {...form.getInputProps("nombre_organizacion")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4} lg={4} xl={4}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            withAsterisk
                            {...form.getInputProps("telefono")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Razón Social"
                            label="Razón social"
                            withAsterisk
                            {...form.getInputProps("razon_social")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="xyz@abc.org"
                            label="Correo"
                            withAsterisk
                            {...form.getInputProps("email")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Abreviatura de la Organización"
                            label="Abreviatura"
                            withAsterisk
                            {...form.getInputProps("abreviatura")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Sitio Web"
                            label="Sitio web"
                            {...form.getInputProps("sitio_web")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            label="Tipo de Organizacion"
                            placeholder="Seleccione el tipo de organizacion"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("tipo_id")}
                            data={tipos.map((tipo) => {
                                return {
                                    label: tipo.tipo,
                                    value: tipo.id,
                                };
                            })}
                        />
                    </Grid.Col>

                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            label="Pais"
                            placeholder="Seleccione el país de la organización"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("country_id")}
                            data={paises.map((pais) => {
                                return {
                                    label: pais.name,
                                    value: pais.id,
                                };
                            })}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            label="Estado/Provincia"
                            placeholder="Seleccione el estado de la organización"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("state_id")}
                            data={estados.map((estado) => {
                                return {
                                    label: estado.name,
                                    value: estado.id,
                                };
                            })}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Textarea
                            placeholder="Ingresa la descripción"
                            label="Descripción"
                            description="Agregar una breve descripción de la organización."
                            radius="md"
                            withAsterisk
                            minRows={2}
                            maxRows={4}
                            {...form.getInputProps("descripcion")}
                        />
                    </Grid.Col>
                </Grid>
            </Skeleton>
            <Group position="center" mt="xl" mb="xl">
                <Box w={230}>
                    <Button
                        fullWidth
                        variant="outline"
                        leftIcon={<IconWorldPlus />}
                        type="submit"
                    >
                        Agregar Organización
                    </Button>
                </Box>
            </Group>
        </Box>
    );
};
