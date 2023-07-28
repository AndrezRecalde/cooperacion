import { Grid, Select, Textarea, TextInput } from "@mantine/core";
import {
    IconBallpen,
    IconCalendarTime,
    IconList,
    IconWorldCheck,
} from "@tabler/icons-react";
import {
    useAuthStore,
    useOrganizacionStore,
    useTipoCoopStore,
    usePeriodoStore,
} from "../../../../../hooks";

export const InfoStepper = ({ form }) => {
    const { organizaciones } = useOrganizacionStore();
    const { tiposCopperaciones } = useTipoCoopStore();
    const { user } = useAuthStore();
    const { periodos } = usePeriodoStore();
    return (
        <Grid>
            {user.id ? (
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        label="Periodo Administrativo"
                        placeholder="Elige el periodo"
                        searchable
                        nothingFound="No options"
                        radius="md"
                        mt={10}
                        withAsterisk
                        icon={<IconCalendarTime size="1rem" />}
                        {...form.getInputProps("periodo_id")}
                        data={periodos.map((periodo) => {
                            return {
                                label: periodo.fechas_periodo,
                                value: periodo.id,
                            };
                        })}
                    />
                </Grid.Col>
            ) : null}
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <Select
                    label="Organización"
                    placeholder="Elige tu Organización"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconWorldCheck size="1rem" />}
                    {...form.getInputProps("organizacion_id")}
                    data={organizaciones.map((organizacion) => {
                        return {
                            label: organizacion.nombre_organizacion,
                            value: organizacion.id,
                        };
                    })}
                />
            </Grid.Col>
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <TextInput
                    placeholder="Ingrese Nombre de Proyecto"
                    label="Proyecto"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconBallpen size="1rem" />}
                    {...form.getInputProps("nombre_proyecto")}
                />
            </Grid.Col>
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <Select
                    label="Tipo"
                    placeholder="Elige el tipo de cooperación"
                    searchable
                    nothingFound="No options"
                    radius="md"
                    withAsterisk
                    mt={10}
                    icon={<IconList size="1rem" />}
                    data={tiposCopperaciones.map((tipo) => {
                        return {
                            label: tipo.tipo_cooperacion,
                            value: tipo.id,
                        };
                    })}
                    {...form.getInputProps("cooperacion_id")}
                />
            </Grid.Col>
            <Grid.Col sm={12} md={12} lg={12} xl={12}>
                <Textarea
                    label="Objetivo General"
                    placeholder="Por favor redacte el objetivo del proyecto"
                    mt={10}
                    withAsterisk
                    minRows={2}
                    maxRows={5}
                    {...form.getInputProps("objetivo_general")}
                />
            </Grid.Col>
        </Grid>
    );
};
