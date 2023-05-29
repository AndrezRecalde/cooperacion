import { Box, Button, Grid, Group, Select, Skeleton, TextInput } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useUsuarioStore } from "../../../hooks/usuario/useUsuarioStore";
import { useEffect } from "react";
import { useUiUsuario } from "../../../hooks/usuario/useUiUsuario";
import { useRoleStore } from "../../../hooks/role/useRoleStore";
import { useInstitucionStore } from "../../../hooks/institucion/useInstitucionStore";

export const FormUsuario = ({ form }) => {

    const { modalActionUsuario } = useUiUsuario();
    const { isLoading, activateUsuario, startAddUsuario, setClearActivateUsuario } = useUsuarioStore();
    const { roles, startLoadRoles, clearRoles } = useRoleStore();
    const { instituciones, startLoadInstituciones, clearInstituciones } = useInstitucionStore();

    useEffect(() => {
        startLoadInstituciones();
        startLoadRoles();
      return () => {
        setClearActivateUsuario();
        clearRoles();
        clearInstituciones();
      }
    }, []);


    useEffect(() => {
      if(activateUsuario !== null){
        form.setValues({
            ...activateUsuario,
            roles: activateUsuario.roles[0].id
        });
        return;
      }
    }, [activateUsuario]);

    const handleSubmit = () => {
        startAddUsuario(form.values);
        form.reset();
        modalActionUsuario(0);

    }


    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Skeleton visible={isLoading}>
                <Grid>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Nombres del usuario"
                            label="Nombres"
                            withAsterisk
                            mt={5}
                            {...form.getInputProps("nombres")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Apellidos del usuario"
                            label="Apellidos"
                            withAsterisk
                            mt={5}
                            {...form.getInputProps("apellidos")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Cédula del usuario"
                            label="Cedula"
                            withAsterisk
                            mt={5}
                            {...form.getInputProps("dni")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="xyz@abc.org"
                            label="Correo"
                            withAsterisk
                            mt={5}
                            {...form.getInputProps("email")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <Select
                            label="Institución"
                            placeholder="Seleccione la institución"
                            mt={5}
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("institucion_id")}
                            data={instituciones.map(institucion => {
                                return {
                                    label: institucion.nombre_institucion,
                                    value: institucion.id
                                }
                            })}
                        />
                    </Grid.Col>
                    <Grid.Col sm={6} md={6} lg={6} xl={6}>
                        <Select
                            label="Roles"
                            placeholder="Seleccione el role del usuario"
                            mt={5}
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("roles")}
                            data={roles.map(role => {
                                return {
                                    label: role.name,
                                    value: role.id
                                }
                            })}
                        />
                    </Grid.Col>


                </Grid>
            </Skeleton>
            <Group position="center" mt="xl" mb="xl">
                <Box w={230}>
                    <Button
                        fullWidth
                        variant="outline"
                        leftIcon={<IconUserPlus />}
                        type="submit"
                    >
                        Agregar Usuario
                    </Button>
                </Box>
            </Group>
        </Box>
    );
};
