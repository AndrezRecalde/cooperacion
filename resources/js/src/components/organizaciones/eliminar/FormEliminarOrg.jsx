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
    IconTrash,
    IconWorldX,
} from "@tabler/icons-react";
import { useUiOrganizacion, useOrganizacionStore } from "../../../hooks";

export const FormEliminarOrg = ({ form }) => {
    const { confirm_org } = form.values;
    const { modalActionEliminarOrg } = useUiOrganizacion();
    const { activateOrganizacion, startDeleteOrganizacion } = useOrganizacionStore();
    const [btnDisabled, setBtnDisabled] = useState(true);


    useEffect(() => {
        if (activateOrganizacion !== null) {
            form.setValues({ ...activateOrganizacion });
            return;
        }
    }, [activateOrganizacion]);

    useEffect(() => {
        if(confirm_org === activateOrganizacion?.nombre_organizacion){
            setBtnDisabled(false);
        }else {
            setBtnDisabled(true);
        }
    }, [confirm_org]);

    const handleEliminar = (e) => {
        e.preventDefault();
        startDeleteOrganizacion(activateOrganizacion);
        form.reset();
        modalActionEliminarOrg(0);
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
                        <CopyButton value={activateOrganizacion?.nombre_organizacion} timeout={2000}>
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
                                            <IconWorldX size={30} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>

                        <Text>{activateOrganizacion?.nombre_organizacion}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Alert
                        icon={<IconAlertCircle size="2rem" />}
                        title="Informacion!"
                        color="red.7"
                    >
                        Para confirmar la eliminación, escriba el nombre de la
                        organización en el cuadro de a continuación.
                        Si elimina la organización estará eliminando los proyectos asociados.
                    </Alert>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        data-autofocus
                        label="Nombre de organización"
                        placeholder="Escriba el nombre de la organización"
                        {...form.getInputProps("confirm_org")}
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
