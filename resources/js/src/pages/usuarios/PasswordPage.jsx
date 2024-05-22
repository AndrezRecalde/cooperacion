import {
    Box,
    Card,
    Grid,
    PasswordInput,
    rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsExchange } from "@tabler/icons-react";
import { BtnSubmit, TitleSections } from "../../components";
import { useUsuarioStore, useAuthStore } from "../../hooks";

export const PasswordPage = () => {
    const [visible, { toggle }] = useDisclosure(false);

    const { startUpdatePassword } = useUsuarioStore();

    const { user } = useAuthStore();

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password ? "Contraseñas no coinciden" : null,
        },
    });

    const { password } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdatePassword(user, password);
        form.reset();
    };

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.sm,
                width: rem(700)
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Card
                withBorder
                radius="md"
                mt="md"
                mb="md"
                shadow="sm"
                sx={{ position: "static" }}
            >
                <Card.Section withBorder inheritPadding py="lg">
                    <TitleSections title="Cambio de contraseña" fw={700} />
                </Card.Section>
                <Card.Section inheritPadding py="lg">
                    <Grid justify="center">
                        <Grid.Col sm={12} md={12} lg={12} xl={12}>
                            <PasswordInput
                                label="Contraseña"
                                visible={visible}
                                onVisibilityChange={toggle}
                                {...form.getInputProps("password")}
                            />
                        </Grid.Col>
                        <Grid.Col sm={12} md={12} lg={12} xl={12}>
                            <PasswordInput
                                label="Confirmar contraseña"
                                visible={visible}
                                onVisibilityChange={toggle}
                                {...form.getInputProps("confirmPassword")}
                            />
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <BtnSubmit IconSection={IconArrowsExchange} fontSize={14}>Cambiar Contraseña</BtnSubmit>
                {/* <Group position="center" mt="xl" mb="xl">
                    <Button
                        variant="light"
                        color="teal.7"
                        type="submit"
                        leftIcon={<IconArrowsExchange />}
                    >
                        Cambiar Contraseña
                    </Button>
                </Group> */}
            </Card>
        </Box>
    );
};
