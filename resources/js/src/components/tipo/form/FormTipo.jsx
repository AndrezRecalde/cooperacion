import { useEffect } from "react";
import { Box, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { useTipoStore } from "../../../hooks";
import { useUiTipo } from "../../../hooks/tipo/useUiTipo";

export const FormTipo = ({ form }) => {
    const { modalActionTipo } = useUiTipo();
    const { activateTipo, startAddTipo, setClearActivateTipo } = useTipoStore();

    useEffect(() => {
      return () => {
        setClearActivateTipo();
      }
    }, []);


    useEffect(() => {
        if (activateTipo !== null) {
            form.setValues({
                ...activateTipo,
            });
            return;
        }
    }, [activateTipo]);

    const handleSubmit = () => {
        startAddTipo(form.values);
        form.reset();
        modalActionTipo(0);
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <TextInput
                        placeholder="Ingrese el Tipo de Organización"
                        label="Tipo de Organización"
                        withAsterisk
                        {...form.getInputProps("tipo")}
                    />
                </Grid.Col>
            </Grid>
            <Group position="center" mt="xl" mb="xl">
                <Box w={230}>
                    <Button
                        fullWidth
                        variant="outline"
                        leftIcon={<IconChecks />}
                        type="submit"
                    >
                        Agregar Tipo de Organización
                    </Button>
                </Box>
            </Group>
        </Box>
    );
};
