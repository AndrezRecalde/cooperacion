import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Center,
    FileInput,
    Group,
    Image,
    Select,
    SimpleGrid,
    Skeleton,
    Stack,
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
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const { modalActionOrganizacion, isOpenModalAddOrg } = useUiOrganizacion();
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
        if (isOpenModalAddOrg) {
            startLoadPaises();
            startLoadTipos();
        }
        return () => {
            setClearActivateOrganizacion();
        };
    }, [isOpenModalAddOrg]);

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
            const imageUrl = "/storage" + activateOrganizacion?.imagen_url;
            setPreview(imageUrl);

            fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File(
                        [blob],
                        activateOrganizacion.imagen_url,
                        { type: blob.type }
                    );
                    setFile(file);
                    form.setFieldValue("imagen_url", file);
                });
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

    const handleImageChange = useCallback((file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setFile(file);
        } else {
            setPreview(null);
            setFile(null);
        }
    }, []);

    return (
        <Box
            component="form"
            mx="auto"
            sx={(theme) => ({
                padding: theme.spacing.sm,
            })}
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Skeleton visible={isLoading}>
                <Stack align="stretch" justify="center">
                    <FileInput
                        withAsterisk
                        label="Logo"
                        placeholder="Logo de la organización"
                        accept="image/png,image/jpeg,image/jpeg"
                        valueComponent={ValueComponent}
                        {...form.getInputProps("imagen_url")}
                        onChange={(file) => {
                            form.setFieldValue("imagen_url", file);
                            handleImageChange(file);
                        }}
                    />
                    {preview && (
                        <Group position="center">
                            <Image
                                src={preview}
                                alt="Vista previa"
                                fit="contain"
                                maw={100}
                            />
                        </Group>
                    )}

                    <SimpleGrid cols={2}>
                        <TextInput
                            placeholder="Nombre de la organización"
                            label="Organizacion"
                            withAsterisk
                            {...form.getInputProps("nombre_organizacion")}
                        />
                        <TextInput
                            placeholder="Razón Social"
                            label="Razón social"
                            withAsterisk
                            {...form.getInputProps("razon_social")}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={2}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            withAsterisk
                            {...form.getInputProps("telefono")}
                        />
                        <TextInput
                            placeholder="xyz@abc.org"
                            label="Correo"
                            withAsterisk
                            {...form.getInputProps("email")}
                        />
                    </SimpleGrid>

                    <SimpleGrid cols={2}>
                        <TextInput
                            placeholder="Abreviatura de la Organización"
                            label="Abreviatura"
                            withAsterisk
                            {...form.getInputProps("abreviatura")}
                        />
                        <TextInput
                            placeholder="Sitio Web"
                            label="Sitio web"
                            {...form.getInputProps("sitio_web")}
                        />
                    </SimpleGrid>

                    <Select
                        withAsterisk
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

                    <SimpleGrid cols={2}>
                        <Select
                            withAsterisk
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
                        <Select
                            withAsterisk
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
                    </SimpleGrid>
                    <Textarea
                        placeholder="Ingresa la descripción"
                        label="Descripción"
                        description="Agregar una breve descripción de la organización."
                        withAsterisk
                        minRows={2}
                        maxRows={4}
                        {...form.getInputProps("descripcion")}
                    />
                </Stack>
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
