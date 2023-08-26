import { useEffect } from "react";
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
import { useUiOrganizacion, useOrganizacionStore, useConvenioStore } from "../../../../hooks";

export const FormActivarOrg = ({ form }) => {

    const { modalActivateOrg } = useUiOrganizacion();
    const { activateOrganizacion, startUpdateConvenioOrg } = useOrganizacionStore();
    const { convenios, startLoadConvenios } = useConvenioStore();



    useEffect(() => {
        startLoadConvenios();
    }, []);

    useEffect(() => {
      if(activateOrganizacion !== null){
        form.setValues({ ...activateOrganizacion });
        return;
      }

    }, [activateOrganizacion]);

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
                        <Text>{activateOrganizacion?.nombre_organizacion}</Text>
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
