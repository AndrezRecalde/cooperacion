import { useEffect, useState } from "react";
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
    IconCheck,
    IconFileShredder,
    IconTrash,
} from "@tabler/icons-react";
import { useUiProyecto, useProyectoStore } from "../../../hooks";

export const FormEliminar = ({ form }) => {
    const { confirm_proyecto } = form.values;
    const { modalActionDelete } = useUiProyecto();
    const { activateProyecto, startDeleteProyecto } = useProyectoStore();
    const [btnDisabled, setBtnDisabled] = useState(true);


    useEffect(() => {
        if (activateProyecto !== null) {
            form.setValues({ ...activateProyecto });
            return;
        }
    }, [activateProyecto]);

    useEffect(() => {
        if(confirm_proyecto === activateProyecto?.nombre_proyecto){
            setBtnDisabled(false);
        }else {
            setBtnDisabled(true);
        }
    }, [confirm_proyecto]);

    const handleEliminar = (e) => {
        e.preventDefault();
        startDeleteProyecto(activateProyecto);
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
                        <CopyButton value={activateProyecto?.nombre_proyecto} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip
                                    label={copied ? "Copiado" : "Copiar"}
                                    withArrow
                                    position="right"
                                >
                                    <ActionIcon
                                        color={copied ? "teal.5" : "gray"}
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

                        <Text>{activateProyecto?.nombre_proyecto}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Alert
                        icon={<IconAlertCircle size="1rem" />}
                        title="Informacion!"
                        color="yellow.7"
                    >
                        Para confirmar la eliminación, escriba el nombre del
                        proyecto en el cuadro de a continuación.
                    </Alert>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        data-autofocus
                        label="Nombre de proyecto"
                        placeholder="Escriba el nombre del proyecto"
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
