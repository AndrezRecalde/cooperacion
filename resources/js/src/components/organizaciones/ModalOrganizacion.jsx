import { Modal, useMantineTheme } from "@mantine/core";
import { FormOrganizacion } from "./FormOrganizacion";
import { useUiOrganizacion } from "../../hooks/organizacion/useUiOrganizacion";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { TitleCard } from "../elements/TitleCard";

export const ModalOrganizacion = () => {
    const theme = useMantineTheme();
    const { isOpenModalAddOrg, modalActionOrganizacion } = useUiOrganizacion();

    const form = useForm({
        initialValues: {
            imagen_url: "",
            nombre_organizacion: "",
            abreviatura: "",
            email: "",
            razon_social: "",
            sitio_web: "",
            telefono: "",
            descripcion: "",
            tipo_id: "",
            country_id: "",
            state_id: "",
        },
        validate: {
            imagen_url: isNotEmpty("Por favor ingrese el logo de la organización"),
            nombre_organizacion: isNotEmpty("El nombre es obligatorio"),
            abreviatura: hasLength(
                { min: 2, max: 4 },
                "La Abreviatura es obligatoria"
            ),
            email: isEmail("Ingrese un correo válido"),
            razon_social: isNotEmpty("La razón social es obligatoria"),
            telefono: isNotEmpty("El teléfono es obligatorio"),
            descripcion: hasLength(
                { min: 5 },
                "Por favor especifique la descripción de la organización"
            ),
            tipo_id: isNotEmpty("El tipo es obligatorio"),
            country_id: isNotEmpty("El pais es obligatorio"),
            state_id: isNotEmpty("El estado es obligatorio"),
        },
    });

    const handleCloseModalOrg = () => {
        form.reset();
        modalActionOrganizacion(0);
    };

    return (
        <Modal
            opened={isOpenModalAddOrg}
            onClose={handleCloseModalOrg}
            title={<TitleCard title="Organizacion" />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            className="modalForm"
        >
            <FormOrganizacion form={form} />
        </Modal>
    );
};
