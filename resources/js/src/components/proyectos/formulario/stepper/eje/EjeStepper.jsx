import { Grid, MultiSelect, NumberInput, Select } from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";
import { useOdsStore, useModalidadStore, useEstadoStore } from "../../../../../hooks";

export const EjeStepper = ({ form }) => {
    const { objetivos } = useOdsStore();
    const { modalidades } = useModalidadStore();
    const { estados } = useEstadoStore();
    return (
        <Grid>
            <Grid.Col xs={12} md={12} lg={12}>
                <MultiSelect
                    label="Objetivo Desarrollo Sostenible"
                    placeholder="Elige uno o varios objetivos"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("odsostenible_id")}
                    data={objetivos.map( objetivo => {
                        return {
                            label: objetivo.objetivo_ods,
                            value: objetivo.id
                        }
                    })}
                />
            </Grid.Col>
            <Grid.Col xs={12} md={12} lg={12}>
                <Select
                    label="Modalidad"
                    placeholder="Elige la Modalidad de Cooperación"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("modalidad_id")}
                    data={modalidades.map( modalidad => {
                        return {
                            label: modalidad.tipo_modalidad,
                            value: modalidad.id
                        }
                    })}
                />
            </Grid.Col>
            <Grid.Col xs={12} md={6} lg={6}>
                <NumberInput
                    placeholder="Monto de contrapartida"
                    label="Monto de contrapartida"
                    description="Omitir el campo si no conoce los valores"
                    mt={10}
                    withAsterisk
                    hideControls
                    icon={<IconCoins size="1rem" />}
                    precision={2}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                          ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                          : '$ '
                      }
                    {...form.getInputProps("contrapartida")}
                />
            </Grid.Col>
            <Grid.Col xs={12} md={6} lg={6}>
                <NumberInput
                    placeholder="Monto del Proyecto"
                    label="Monto del Proyecto"
                    description="Omitir el campo si no conoce los valores"
                    mt={10}
                    withAsterisk
                    hideControls
                    icon={<IconCoins size="1rem" />}
                    precision={2}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                          ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                          : '$ '
                      }
                    {...form.getInputProps("monto")}
                />
            </Grid.Col>
            <Grid.Col xs={12} md={12} lg={12}>
                <Select
                    label="Estado"
                    placeholder="Estado del proyecto"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    {...form.getInputProps("estado_id")}
                    data={estados.map(estado => {
                        return {
                            label: estado.estado,
                            value: estado.id
                        }
                    })}
                />
            </Grid.Col>
        </Grid>
    );
};
