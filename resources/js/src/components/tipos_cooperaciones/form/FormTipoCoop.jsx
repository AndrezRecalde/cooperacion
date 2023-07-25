import { useEffect } from "react";
import { Box, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { useUiTipoCoop, useTipoCoopStore } from "../../../hooks";

export const FormTipoCoop = ({ form }) => {
    const { modalActionTipoCoop } = useUiTipoCoop();
    const { activateTipoCoop, startAddTipoCoop, setClearActivateTipoCoop } =
        useTipoCoopStore();

    useEffect(() => {
        return () => {
            setClearActivateTipoCoop();
        };
    }, []);

    useEffect(() => {
        if (activateTipoCoop !== null) {
            form.setValues({
                ...activateTipoCoop,
            });
            return;
        }
    }, [activateTipoCoop]);

    const handleSubmit = () => {
        startAddTipoCoop(form.values);
        form.reset();
        modalActionTipoCoop(0);
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
                        placeholder="Ingrese el Tipo de Cooperación"
                        label="Tipo de cooperación"
                        withAsterisk
                        {...form.getInputProps("tipo_cooperacion")}
                    />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            label="Activo"
                            placeholder="¿Esta activo este tipo de cooperación?"
                            searchable
                            defaultValue={1}
                            nothingFound="No options"
                            {...form.getInputProps("activo")}
                            data={[
                                { label: "Si", value: 1 },
                                { label: "No", value: 0 },
                            ]}
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
                        Agregar Tipo
                    </Button>
                </Box>
            </Group>
        </Box>
    );
};
