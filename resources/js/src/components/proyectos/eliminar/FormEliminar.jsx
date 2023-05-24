import {
    ActionIcon,
    Alert,
    Button,
    CopyButton,
    Divider,
    Flex,
    Grid,
    Group,
    Text,
    TextInput,
    Tooltip,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconCategory2,
    IconCheck,
    IconFileShredder,
    IconTrash,
} from "@tabler/icons-react";
import { useUiProyecto } from "../../../hooks/proyecto/useUiProyecto";
import { useProyectoStore } from "../../../hooks/proyecto/useProyectoStore";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export const FormEliminar = () => {
    const { modalActionDelete } = useUiProyecto();
    const { activateProyecto, startDelete } = useProyectoStore();

    const [btnDisabled, setBtnDisabled] = useState(true);

    const form = useForm({
        initialValues: {
            confirm_proyecto: "",
        },
        validate: {
            confirm_proyecto: isNotEmpty(
                "Debe especificar el nombre del proyecto"
            ),
        },
    });

    const { confirm_proyecto } = form.values;

    useEffect(() => {
        if (activateProyecto !== null) {
            form.setValues({ ...activateProyecto });
            return;
        }
    }, [activateProyecto]);

    useEffect(() => {
        if(confirm_proyecto === activateProyecto.nombre_proyecto){
            setBtnDisabled(false);
        }else {
            setBtnDisabled(true);
        }
    }, [confirm_proyecto]);

    const handleEliminar = (e) => {
        e.preventDefault();
        startDelete(activateProyecto);
        form.reset();
        modalActionDelete(0);
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
                        <CopyButton value={activateProyecto.nombre_proyecto} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip
                                    label={copied ? "Copiado" : "Copiar"}
                                    withArrow
                                    position="right"
                                >
                                    <ActionIcon
                                        color={copied ? "teal" : "gray"}
                                        onClick={copy}
                                    >
                                        {copied ? (
                                            <IconCheck size={30} />
                                        ) : (
                                            <IconFileShredder size={30} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>

                        <Text>{activateProyecto.nombre_proyecto}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Alert
                        icon={<IconAlertCircle size="1rem" />}
                        title="Informacion!"
                        color="yellow"
                    >
                        Para confirmar la eliminacion, escriba el nombre del
                        proyecto en el cuadro de a continuacion.
                    </Alert>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        data-autofocus
                        label="Nombre de proyecto"
                        placeholder="Escriba el nombre del proyecto"
                        icon={<IconCategory2 size="0.8rem" />}
                        {...form.getInputProps("confirm_proyecto")}
                    />
                    <Divider />
                </Grid.Col>
            </Grid>
            <Group position="center" mt="xl">
                <Button
                    disabled={btnDisabled}
                    fullWidth
                    variant="outline"
                    color="red"
                    size="xs"
                    leftIcon={<IconTrash />}
                    onClick={(e) => handleEliminar(e)}
                >
                    Eliminar
                </Button>
            </Group>
        </>
    );
};
