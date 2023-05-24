import { Grid, MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import { IconPlusEqual, IconUsers } from "@tabler/icons-react";
import { useStateStore } from "../../../../../hooks/state/useStateStore";
import { useGrupoAtencionStore } from "../../../../../hooks/grupo_atencion/useGrupoAtencionStore";

export const UbicacionStepper = ({ form }) => {
    const { cantones, parroquias, recintos } = useStateStore();
    const { grupos_atencion } = useGrupoAtencionStore();
    return (
        <Grid>
            <Grid.Col xs={12} sm={12} md={4} lg={4}>
                <Select
                    label="Cantón"
                    placeholder="Elige tu Cantón"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("canton_id")}
                    data={cantones.map(canton => {
                        return {
                            label: canton.nombre_canton,
                            value: canton.id
                        }
                    })}
                />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} md={4} lg={4}>
                <Select
                    label="Parroquia"
                    placeholder="Elige la Parroquia"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("parroquia_id")}
                    data={parroquias.map(parroquia => {
                        return {
                            label: parroquia.nombre_parroquia,
                            value: parroquia.id
                        }
                    })}
                />
            </Grid.Col>
            <Grid.Col xs={12} sm={12} md={4} lg={4}>
                <Select
                    label="Recinto"
                    placeholder="Elige el recinto"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("recinto_id")}
                    data={recintos.map(recinto => {
                        return {
                            label: recinto.nombre_recinto,
                            value: recinto.id
                        }
                    })}
                />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} md={12} lg={12}>
                <MultiSelect
                    label="Grupo Atención Prioritaria"
                    placeholder="Elige el grupo de atención prioritario"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("grupo_atencion_id")}
                    data={grupos_atencion.map(grupo => {
                        return {
                            label: grupo.grupo,
                            value: grupo.id
                        }
                    })}
                />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} md={12} lg={12}>
                <TextInput
                    placeholder="Ingrese el Grupo Beneficiado"
                    label="Grupo Beneficiado"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconUsers size="1rem" />}
                    {...form.getInputProps("grupo_beneficiado")}
                />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} md={12} lg={12}>
                <NumberInput
                    placeholder="Ingrese el total de beneficiados"
                    label="Total Beneficiados"
                    mt={10}
                    withAsterisk
                    hideControls
                    icon={<IconPlusEqual size="1rem" />}
                    {...form.getInputProps("total_beneficiados")}
                />
            </Grid.Col>
        </Grid>
    );
};
