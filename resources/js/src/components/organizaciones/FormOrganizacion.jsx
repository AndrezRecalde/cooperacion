import { useEffect, useState } from "react";
import {
    Box,
    Center,
    FileInput,
    Grid,
    Group,
    Image,
    Select,
    Skeleton,
    TextInput,
    Textarea,
    rem,
} from "@mantine/core";
import {
    useStateStore,
    useTipoStore,
    useUiOrganizacion,
    useOrganizacionStore,
} from "../../hooks";
import { BtnSubmit } from "../../components";
import { IconPhoto, IconWorldPlus } from "@tabler/icons-react";

export const FormOrganizacion = ({ form }) => {
    const [img, setImg] = useState("");
    const [change, setChange] = useState(null);
    const { modalActionOrganizacion } = useUiOrganizacion();
    const { paises, estados, startLoadPaises, startLoadEstados } =
        useStateStore();
    const {
        isLoading,
        activateOrganizacion,
        startAddOrganizacion,
        setClearActivateOrganizacion,
    } = useOrganizacionStore();
    const { tipos, startLoadTipos } = useTipoStore();

    const { country_id, imagen_url } = form.values;

    useEffect(() => {
        startLoadPaises();
        startLoadTipos();

        return () => {
            setClearActivateOrganizacion();
        };
    }, []);

    useEffect(() => {
        //Usarlo cuando sean mas de 3 selects y ponerlo en el ultimo select
        /* setTimeout(() => {
            setClearActivateOrganizacion();
        }, 1200); */
        startLoadEstados(country_id);
        form.setFieldValue("state_id", activateOrganizacion?.state_id ?? "");
        setClearActivateOrganizacion();
    }, [country_id]);

    useEffect(() => {
        if (activateOrganizacion !== null) {
            form.setValues({
                ...activateOrganizacion,
            });
            setImg("/storage" + activateOrganizacion?.imagen_url);
            return;
        }
    }, [activateOrganizacion]);

    const handleSubmit = () => {
        startAddOrganizacion(form.values);
        modalActionOrganizacion(0);
        form.reset();
    };

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
                <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
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

    const setImagePrev = (e) => {
        form.setFieldValue("imagen_url", e);
        setChange((change) => change + 1);
    };

    useEffect(() => {
        if (!imagen_url) {
            setImg(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(imagen_url);
        setImg(objectUrl);

        // free memory when ever this component is unmounted
        return () => {
            URL.revokeObjectURL(objectUrl);
            setChange(null);
        };
    }, [change]);

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
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <FileInput
                            mt="md"
                            label="Logo"
                            placeholder="Logo de la organización"
                            radius="md"
                            accept="image/png,image/jpeg,image/jpeg"
                            valueComponent={ValueComponent}
                            onChange={(e) => setImagePrev(e)}
                            error={
                                imagen_url === null || imagen_url === ""
                                    ? "Por favor carga el logo de la organización"
                                    : null
                            }
                            withAsterisk
                        />
                        <Group position="center">
                            <Image mt={10} width={100} height={90} src={img} />
                        </Group>
                    </Grid.Col>
                    <Grid.Col sm={12} md={8} lg={8} xl={8}>
                        <TextInput
                            placeholder="Nombre de la organización"
                            label="Organizacion"
                            withAsterisk
                            {...form.getInputProps("nombre_organizacion")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4} lg={4} xl={4}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            withAsterisk
                            {...form.getInputProps("telefono")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Razón Social"
                            label="Razón social"
                            withAsterisk
                            {...form.getInputProps("razon_social")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="xyz@abc.org"
                            label="Correo"
                            withAsterisk
                            {...form.getInputProps("email")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Abreviatura de la Organización"
                            label="Abreviatura"
                            withAsterisk
                            {...form.getInputProps("abreviatura")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <TextInput
                            placeholder="Sitio Web"
                            label="Sitio web"
                            {...form.getInputProps("sitio_web")}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Select
                            label="Tipo de Organizacion"
                            placeholder="Seleccione el tipo de organizacion"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("tipo_id")}
                            data={tipos.map((tipo) => {
                                return {
                                    label: tipo.tipo,
                                    value: tipo.id,
                                };
                            })}
                        />
                    </Grid.Col>

                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <Select
                            label="Pais"
                            placeholder="Seleccione el país de la organización"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("country_id")}
                            data={paises.map((pais) => {
                                return {
                                    label: pais.name,
                                    value: pais.id,
                                };
                            })}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={6} xl={6}>
                        <Select
                            label="Estado/Provincia"
                            placeholder="Seleccione el estado de la organización"
                            searchable
                            nothingFound="No options"
                            {...form.getInputProps("state_id")}
                            data={estados.map((estado) => {
                                return {
                                    label: estado.name,
                                    value: estado.id,
                                };
                            })}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12} xl={12}>
                        <Textarea
                            placeholder="Ingresa la descripción"
                            label="Descripción"
                            description="Agregar una breve descripción de la organización."
                            radius="md"
                            withAsterisk
                            minRows={2}
                            maxRows={4}
                            {...form.getInputProps("descripcion")}
                        />
                    </Grid.Col>
                </Grid>
            </Skeleton>
            <BtnSubmit IconSection={IconWorldPlus} fontSize={14}>
                Agregar Organización
            </BtnSubmit>
            {/* <Button
                        fullWidth
                        variant="outline"
                        leftIcon={<IconWorldPlus />}
                        type="submit"
                    >
                        Agregar Organización
                    </Button> */}
        </Box>
    );
};
