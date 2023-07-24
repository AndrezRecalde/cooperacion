import { Grid, MultiSelect, TextInput } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useStateStore, useGrupoAtencionStore } from "../../../../../hooks";

export const UbicacionStepper = ({ form }) => {
    const { cantones } = useStateStore();
    const { grupos_atencion } = useGrupoAtencionStore();
    return (
        <Grid>
            <Grid.Col xs={12} sm={12} md={12} lg={12}>
                <MultiSelect
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

            <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <TextInput
                    placeholder="Ingrese el Grupo Beneficiarios directos"
                    label="Beneficiarios directos"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconUsers size="1rem" />}
                    {...form.getInputProps("beneficiados_directos")}
                />
            </Grid.Col>
            <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <TextInput
                    placeholder="Ingrese el Grupo Beneficiarios indirectos"
                    label="Beneficiarios indirectos"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconUsers size="1rem" />}
                    {...form.getInputProps("beneficiados_indirectos")}
                />
            </Grid.Col>

        </Grid>
    );
};
