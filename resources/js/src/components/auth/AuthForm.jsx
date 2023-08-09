import {
    Box,
    Button,
    Card,
    Checkbox,
    Grid,
    Group,
    Image,
    PasswordInput,
    Text,
    TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconKey } from "@tabler/icons-react";

import logo from "../../assets/images/logo/logo.png";
import { useAuthStore } from "../../hooks/auth/useAuthStore";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const AuthForm = () => {
    const { errores, startLogin } = useAuthStore();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: isEmail("Por favor introduce tu email correctamente"),
            password: isNotEmpty("Por favor introduce tu contraseña"),
        },
    });

    const { email, password } = form.values;

    const handleLogin = (e) => {
        e.preventDefault();
        startLogin({ email, password });
    };

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire("Error", errores, "error");
        }
    }, [errores]);

    return (
        <Box
            component="form"
            mx="auto"
            onSubmit={form.onSubmit((_, e) => handleLogin(e))}
        >
            <Grid justify="center">
                <Grid.Col sm={7} md={7} lg={7} xl={7}>
                    <Card
                        withBorder
                        shadow="lg"
                        p="lg"
                        radius="md"
                        sx={{ position: "static" }}
                        mt={100}
                    >
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position="apart">
                                <Text
                                    c="dimmed"
                                    fz={15}
                                    tt="uppercase"
                                    fw={700}
                                >
                                    Cooperación Internacional
                                </Text>
                            </Group>
                        </Card.Section>
                        <Card.Section inheritPadding mt="xl" pb="lg">
                            <Image
                                maw={220}
                                mx="auto"
                                mt="md"
                                mb="md"
                                radius="xs"
                                src={logo}
                                alt="logo"
                            />
                            <TextInput
                                label="Correo Electronico"
                                placeholder="hello@gadpe.gob.ec"
                                withAsterisk
                                {...form.getInputProps("email")}
                            />
                            <PasswordInput
                                label="Contraseña"
                                placeholder="Tu contraseña"
                                mt="md"
                                withAsterisk
                                {...form.getInputProps("password")}
                            />
                            <Checkbox
                                label="Mantenme conectado"
                                mt="xl"
                                color="teal"
                            />
                        </Card.Section>
                        <Card.Section inheritPadding mt="md" pb="md">
                            <Group position="center">
                                <Button
                                    leftIcon={<IconKey size="1.1rem" />}
                                    variant="outline"
                                    color="teal"
                                    type="submit"
                                >
                                    Autenticarse
                                </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                </Grid.Col>
            </Grid>
        </Box>
    );
};
