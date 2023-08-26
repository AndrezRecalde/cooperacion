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
import { IconChecks, IconDeviceImacCheck } from "@tabler/icons-react";
import { useProyectoStore, useUiProyecto } from "../../../../hooks";

export const FormActivar = ({ form }) => {
    const { modalActionActivo } = useUiProyecto();
    const { activateProyecto, startUpdateActivo } = useProyectoStore();

    useEffect(() => {
      if(activateProyecto !== null) {
        form.setValues({...activateProyecto});
        return;
      }

    }, [activateProyecto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateActivo(form.values);
        form.reset();
        modalActionActivo(0);
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
                        <IconDeviceImacCheck size={30} />
                        <Text>{activateProyecto?.nombre_proyecto}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        data={[
                            { label: "Si", value: 1 },
                            { label: "No", value: 0 },
                        ]}
                        placeholder="¿Desea activar el proyecto?"
                        label="Activar"
                        description="El proyecto se visualizará cuando se active el proyecto"
                        radius="md"
                        mb={20}
                        withAsterisk
                        {...form.getInputProps("activo")}
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
                        onClick={(e) => handleSubmit(e)}
                    >
                        Guardar
                    </Button>
            </Group>
        </>
    );
};
