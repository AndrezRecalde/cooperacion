import { useEffect } from "react";
import {
    Box,
    Button,
    Checkbox,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useAuthStore } from "../../hooks";
import { AlertSection, BtnSubmit, LoaderCustom } from "../../components";
import { IconInfoCircle, IconKey } from "@tabler/icons-react";

export const AuthForm = () => {
    const { isLoading, validate, errores, startLogin } = useAuthStore();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validate: {
            email: isEmail("Por favor introduce tu email correctamente"),
            password: isNotEmpty("Por favor introduce tu contraseña"),
        },
    });

    const { email, password } = form.values;

    useEffect(() => {
        if (validate !== undefined) {
            form.setErrors(validate);
            return;
        }

        return () => {
            form.clearErrors();
        };
    }, [validate]);

    const handleLogin = (e) => {
        e.preventDefault();
        startLogin({ email, password });
        //console.log(form.values);
    };

    return (
        <Box
            component="form"
            mx="auto"
            onSubmit={form.onSubmit((_, e) => handleLogin(e))}
        >
            <LoadingOverlay loader={LoaderCustom} visible={isLoading} overlayBlur={2} />
            <Stack>
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
                    {...form.getInputProps("remember", {
                        type: "checkbox",
                    })}
                    label="Recuerdame"
                    mt="xl"
                    color="teal"
                />
                {errores ? (
                    <AlertSection
                        variant="light"
                        color="red.8"
                        icon={IconInfoCircle}
                        title="Error"
                    >
                        {errores}
                    </AlertSection>
                ) : null}
                <BtnSubmit IconSection={IconKey}>Autenticarse</BtnSubmit>
                {/* <Button
                    fullWidth
                    leftIcon={<IconKey size="1.1rem" />}
                    variant="outline"
                    color="teal"
                    type="submit"
                >
                    Autenticarse
                </Button> */}
            </Stack>
        </Box>
    );
};
