import {
    Button,
    Divider,
    Flex,
    Grid,
    Group,
    Select,
    Text,
} from "@mantine/core";
import { IconChecks, IconWorldCheck } from "@tabler/icons-react";
import { useUiOrganizacion } from "../../../../hooks/organizacion/useUiOrganizacion";
import { useOrganizacionStore } from "../../../../hooks/organizacion/useOrganizacionStore";
import { useConvenioStore } from "../../../../hooks/convenio/useConvenioStore";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export const FormActivarOrg = () => {

    const { modalActivateOrg } = useUiOrganizacion();
    const { activateEstado, startUpdateConvenioOrg } = useOrganizacionStore();
    const { convenios, startLoadConvenios, startClearConvenios } = useConvenioStore();

    const form = useForm({
        initialValues: {
            convenio_id: null
        },
        validate: {
           convenio_id: isNotEmpty("Por favor seleccione el tipo de convenio")
        }
    });

    useEffect(() => {
        startLoadConvenios();
    }, []);

    useEffect(() => {
      if(activateEstado !== null){
        form.setValues({ ...activateEstado });
        return;
      }

    }, [activateEstado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateConvenioOrg(form.values);
        form.reset();
        modalActivateOrg(0);

    }


    return (
        <>
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Flex
                        mih={50}
                        gap="md"
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        <IconWorldCheck size={30} />
                        <Text>{activateEstado?.nombre_organizacion}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        data={convenios.map(convenio => {
                            return {
                                label: convenio.convenio,
                                value: convenio.id
                            }
                        })}
                        placeholder="Tipo de convenio"
                        label="Convenio"
                        description="La organización se visualizará cuando se disponga un tipo de convenio"
                        radius="md"
                        mb={20}
                        withAsterisk
                        {...form.getInputProps("convenio_id")}
                    />
                    <Divider />
                </Grid.Col>
            </Grid>
            <Group position="center" mt="xl">
                <Button
                    fullWidth
                    variant="outline"
                    color="teal"
                    leftIcon={<IconChecks />}
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>
            </Group>
        </>
    );
};
