import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    Group,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TitleCard } from "../../components";
import { IconArrowsExchange } from "@tabler/icons-react";
import { useUsuarioStore } from "../../hooks/usuario/useUsuarioStore";
import { useAuthStore } from "../../hooks/auth/useAuthStore";

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
        <Container size="md">
            <Box
                component="form"
                mx="auto"
                sx={(theme) => ({
                    padding: theme.spacing.md,
                })}
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Card
                    withBorder
                    radius="md"
                    mt="lg"
                    mb="lg"
                    shadow="sm"
                    sx={{ position: "static" }}
                >
                    <Card.Section withBorder inheritPadding py="lg">
                        <TitleCard title="Cambio de contraseña" />
                    </Card.Section>
                    <Card.Section inheritPadding py="lg">
                        <Grid justify="center">
                            <Grid.Col sm={12} md={7} lg={7} xl={7}>
                                <PasswordInput
                                    label="Password"
                                    visible={visible}
                                    size="md"
                                    onVisibilityChange={toggle}
                                    {...form.getInputProps("password")}
                                />
                            </Grid.Col>
                            <Grid.Col sm={12} md={7} lg={7} xl={7}>
                                <PasswordInput
                                    label="Confirm password"
                                    visible={visible}
                                    size="md"
                                    onVisibilityChange={toggle}
                                    {...form.getInputProps("confirmPassword")}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card.Section>
                    <Group position="right" mt="xl" mb="xl">
                        <Box w={230}>
                            <Button variant="outline" color="teal" type="submit" leftIcon={<IconArrowsExchange />}>Cambiar Contraseña</Button>
                        </Box>
                    </Group>
                </Card>
            </Box>
        </Container>
    );
};
