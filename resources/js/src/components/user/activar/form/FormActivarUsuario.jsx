import {
    Button,
    Divider,
    Flex,
    Grid,
    Group,
    Select,
    Text,
} from "@mantine/core";
import { IconChecks, IconUserCheck } from "@tabler/icons-react";
import { useUiUsuario } from "../../../../hooks/usuario/useUiUsuario";
import { useUsuarioStore } from "../../../../hooks/usuario/useUsuarioStore";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export const FormActivarUsuario = () => {

    const { modalActivateUsuario } = useUiUsuario();
    const { activateEstado, startUpdateActivo } = useUsuarioStore();

    const form = useForm({
        initialValues: {
            activo: null
        },
        validate: {
            activo: isNotEmpty("Por favor ingrese un estado para el usuario")
        }
    });


    useEffect(() => {
      if(activateEstado !== null){
        form.setValues({ ...activateEstado });
        return;
      }

    }, [activateEstado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateActivo(form.values);
        form.reset();
        modalActivateUsuario(0);
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
                        <IconUserCheck size={30} />
                        <Text>{activateEstado?.nombres}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        data={[
                            { label: "Si", value: 1 },
                            { label: "No", value: 0 },
                        ]}
                        placeholder="¿Desea activar el usuario?"
                        label="Activar"
                        description="El usuario podrá acceder a la plataforma cuando este activado."
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
