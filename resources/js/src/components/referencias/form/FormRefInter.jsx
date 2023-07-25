import { useEffect } from "react";
import { Box, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import {
    useUiInternacional,
    useInternacionalStore,
    useStateStore,
} from "../../../hooks";

export const FormRefInter = ({ form }) => {
    const { modalActionRefInter } = useUiInternacional();
    const { activateReferencia, startAddRefInter, setClearActivateRefInter } =
        useInternacionalStore();
    const { paises, estados, startLoadPaises, startLoadEstados } =
        useStateStore();

    const { latitud, longitud, country_id, state_id } = form.values;

    useEffect(() => {
        startLoadPaises();

        return () => {
            setClearActivateRefInter();
        };
    }, []);

    useEffect(() => {
        //Usarlo cuando sean mas de 3 selects y ponerlo en el ultimo select
        /* setTimeout(() => {
            setClearActivateOrganizacion();
        }, 1200); */
        startLoadEstados(country_id);
        form.setFieldValue("state_id", activateReferencia?.state_id ?? "");
        //setClearActivateRefInter();
    }, [country_id]);

    useEffect(() => {
        if (activateReferencia !== null) {
            form.setValues({
                ...activateReferencia,
            });
            return;
        }
    }, [activateReferencia]);

    const handleSubmit = () => {
        startAddRefInter(form.values);
        form.reset();
        modalActionRefInter(0);
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
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Ingrese la latitud"
                        label="Latitud"
                        withAsterisk
                        {...form.getInputProps("latitud")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Ingrese la longitud"
                        label="Longitud"
                        withAsterisk
                        {...form.getInputProps("longitud")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Pais"
                        placeholder="Seleccione el país"
                        searchable
                        defaultValue={1}
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
                        label="Estado"
                        placeholder="Seleccione el estado"
                        searchable
                        defaultValue={1}
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
            </Grid>
            <Group position="center" mt="xl" mb="xl">
                <Box w={230}>
                    <Button
                        fullWidth
                        variant="outline"
                        leftIcon={<IconChecks />}
                        type="submit"
                    >
                        Agregar Referencia
                    </Button>
                </Box>
            </Group>
        </Box>
    );
};
