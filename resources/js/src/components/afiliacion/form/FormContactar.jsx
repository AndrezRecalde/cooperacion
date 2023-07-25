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
import { isNotEmpty, useForm } from "@mantine/form";
import { IconBuildingSkyscraper, IconChecks } from "@tabler/icons-react";
import { useUiAfiliacion, useAfiliacionStore } from "../../../hooks";

export const FormContactar = () => {
    const { modalActivateAfiliacion } = useUiAfiliacion();
    const { activeAfiliacion, startUpdateContactado } = useAfiliacionStore();

    const form = useForm({
        initialValues: {
            contactado: null,
        },
        validate: {
            contactado: isNotEmpty("¿Se ha contactado con la entidad?"),
        },
    });

    useEffect(() => {
      if(activeAfiliacion !== null){
        form.setValues({
            ...activeAfiliacion
        });
        return;
      }
    }, [activeAfiliacion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateContactado(form.values);
        form.reset();
        modalActivateAfiliacion(0);
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
                        <IconBuildingSkyscraper size={30} />
                        <Text>{activeAfiliacion.entidad}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        data={[
                            { label: "Si", value: 1 },
                            { label: "No", value: 0 },
                        ]}
                        placeholder="¿Se ha contactado con éxito?"
                        label="Contactado"
                        description="Con el primer contacto de la entidad; posteriormente se deberá registrar la organización"
                        radius="md"
                        mb={20}
                        withAsterisk
                        {...form.getInputProps("contactado")}
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
