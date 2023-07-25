import { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    Center,
    Container,
    FileInput,
    Grid,
    Group,
    Paper,
    Skeleton,
    Text,
    TextInput,
    Textarea,
    Transition,
    createStyles,
    rem,
} from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { TitleCard } from "../../../components";
import {
    IconBrandTelegram,
    IconChecks,
    IconFileDots,
    IconInfoCircle,
} from "@tabler/icons-react";
import { useAfiliacionStore } from "../../../hooks";
import Swal from "sweetalert2";

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "hidden",
        transition: "transform 150ms ease, box-shadow 100ms ease",
        padding: theme.spacing.md,
        paddingLeft: `calc(${theme.spacing.md} * 2)`,
        marginBottom: "20px",

        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: rem(8),
            backgroundImage: theme.fn.gradient({
                from: "teal.7",
                to: "teal.5",
                deg: 45,
            }),
        },
    },
}));

export const FormAfiliacion = () => {
    const { isLoading, isSend, starAddAfiliacion, startRestartSend, errores } =
        useAfiliacionStore();

    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            nombres: "",
            entidad: "",
            cargo: "",
            telefono: "",
            email: "",
            razon_social: "",
            sitio_web: "",
            telefono_org: "",
            direccion_org: "",
            descripcion_org: "",
            archivos: [],
        },
        validate: {
            nombres: isNotEmpty("Los nombres son requeridos"),
            entidad: isNotEmpty("La entidad es requerida"),
            cargo: isNotEmpty("El cargo es requerido"),
            telefono: isNotEmpty("El teléfono del contacto es requerido"),
            email: isEmail("Por favor digite un email válido"),
            razon_social: isNotEmpty("La razón social es requerida"),
            telefono_org: isNotEmpty("El teléfono corporativo es requerido"),
            direccion_org: isNotEmpty(
                "La dirección de la entidad es requerida"
            ),
            descripcion_org: hasLength(
                { min: 5 },
                "Por favor digite un breve resumen de la entidad"
            ),
            archivos: (value) =>
                value.length > 2 ? "Se admiten solo 2 archivos" : null,
        },
    });

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: errores,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    }, [errores]);

    function Value({ file }) {
        return (
            <Center
                inline
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[7]
                            : theme.colors.gray[1],
                    fontSize: theme.fontSizes.xs,
                    padding: `${rem(3)} ${rem(7)}`,
                    borderRadius: theme.radius.sm,
                })}
            >
                <IconFileDots size={rem(14)} style={{ marginRight: rem(5) }} />
                <span
                    style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: rem(200),
                        display: "inline-block",
                    }}
                >
                    {file.name}
                </span>
            </Center>
        );
    }

    const ValueComponent = ({ value }) => {
        if (Array.isArray(value)) {
            return (
                <Group spacing="sm" py="xs">
                    {value.map((file, index) => (
                        <Value file={file} key={index} />
                    ))}
                </Group>
            );
        }

        return <Value file={value} />;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        starAddAfiliacion(form.values);
        form.reset();
    };

    return (
        <>
            {isSend ? (
                <Container size="xs">
                    <Transition
                        mounted={isSend}
                        transition="slide-right"
                        duration={400}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                mt="lg"
                                mb="lg"
                                style={styles}
                            >
                                <Card.Section inheritPadding py="xs">
                                    <Group position="center">
                                        <IconChecks
                                            size={100}
                                            stroke={2.5}
                                            color="green"
                                        />
                                    </Group>
                                </Card.Section>

                                <Group position="center">
                                    <Text weight={700} size="lg">
                                        Formulario enviado con éxito
                                    </Text>
                                </Group>

                                <Text size="md" color="dimmed">
                                    Te agradecemos por querer participar en
                                    nuestra red de afiliados. Verificaremos la
                                    información y nos contactaremos lo más
                                    pronto posible.
                                </Text>

                                <Button
                                    variant="light"
                                    color="teal"
                                    fullWidth
                                    mt="md"
                                    radius="md"
                                    onClick={startRestartSend}
                                >
                                    Volver al formulario
                                </Button>
                            </Card>
                        )}
                    </Transition>
                </Container>
            ) : (
                <Box
                    component="form"
                    mx="auto"
                    sx={(theme) => ({
                        padding: theme.spacing.md,
                    })}
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <Skeleton visible={isLoading}>
                        <Card
                            withBorder
                            radius="md"
                            mt="lg"
                            mb="lg"
                            shadow="sm"
                        >
                            <Card.Section inheritPadding py="xs">
                                <TitleCard title="Datos del contacto" />
                            </Card.Section>
                            <Card.Section inheritPadding py="xs">
                                <Grid>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Nombres y apellidos del contacto"
                                            label="Nombres"
                                            withAsterisk
                                            {...form.getInputProps("nombres")}
                                            /* error={errores[0]?.nombres ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Cargo ocupacional del contacto"
                                            label="Cargo"
                                            withAsterisk
                                            {...form.getInputProps("cargo")}
                                            /* error={errores[0]?.cargo ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Nombre de la entidad"
                                            label="Entidad"
                                            withAsterisk
                                            {...form.getInputProps("entidad")}
                                            /* error={errores[0]?.entidad ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Número telefónico del contacto"
                                            label="Número telefónico"
                                            withAsterisk
                                            {...form.getInputProps("telefono")}
                                            /* error={errores[0]?.telefono ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                                        <TextInput
                                            placeholder="E-mail del contacto"
                                            label="E-mail"
                                            withAsterisk
                                            {...form.getInputProps("email")}
                                            /* error={errores[0]?.email ?? null} */
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Card.Section>
                            <Card.Section inheritPadding py="xs">
                                <TitleCard title="Información general de la entidad" />
                            </Card.Section>
                            <Card.Section inheritPadding py="xs">
                                <Grid>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Razón social de la entidad"
                                            label="Razón social"
                                            withAsterisk
                                            {...form.getInputProps(
                                                "razon_social"
                                            )}
                                            /* error={errores[0]?.razon_social ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Teléfono de la entidad"
                                            label="Teléfono"
                                            withAsterisk
                                            {...form.getInputProps(
                                                "telefono_org"
                                            )}
                                            /* error={errores[0]?.telefono_org ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Dirección de la entidad"
                                            label="Dirección"
                                            withAsterisk
                                            {...form.getInputProps(
                                                "direccion_org"
                                            )}
                                            /* error={errores[0]?.direccion_org ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                                        <TextInput
                                            placeholder="Ejem: www.sitio.com"
                                            label="Sitio web"
                                            withAsterisk
                                            {...form.getInputProps("sitio_web")}
                                            /* error={errores[0]?.sitio_web ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                                        <Textarea
                                            placeholder="Redacte una breve descripción de la entidad"
                                            label="Descripción de la entidad"
                                            radius="sm"
                                            withAsterisk
                                            minRows={3}
                                            maxRows={4}
                                            {...form.getInputProps(
                                                "descripcion_org"
                                            )}
                                            /* error={errores[0]?.descripcion_org ?? null} */
                                        />
                                    </Grid.Col>
                                    <Grid.Col sm={12} md={12} lg={6} xl={6}>
                                        <FileInput
                                            clearable
                                            description="Porfafolio de servicios, Estatuto Orgánico y Copia de RUC"
                                            accept="application/pdf"
                                            label="Documentos"
                                            placeholder="Máximo 3 archivos PDF (Opcional)"
                                            multiple
                                            valueComponent={ValueComponent}
                                            {...form.getInputProps("archivos")}
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Card.Section>
                            <Paper
                                withBorder
                                radius="sm"
                                className={classes.card}
                            >
                                <Group>
                                    <IconInfoCircle color="teal" />
                                    <Text fz={14}>
                                        Al enviar tu información estas aceptando
                                        la declaración de privacidad de los
                                        datos registrados en este sitio.
                                    </Text>
                                </Group>
                            </Paper>
                            <Group position="center">
                                <Button
                                    variant="light"
                                    color="teal.7"
                                    mb={15}
                                    type="submit"
                                    leftIcon={
                                        <IconBrandTelegram size="1.3rem" />
                                    }
                                >
                                    Enviar Formulario
                                </Button>
                            </Group>
                        </Card>
                    </Skeleton>
                </Box>
            )}
        </>
    );
};
