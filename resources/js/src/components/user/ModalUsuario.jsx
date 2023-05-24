import { Modal, useMantineTheme } from "@mantine/core";
import { useUiUsuario } from "../../hooks/usuario/useUiUsuario";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { FormUsuario } from "./form/FormUsuario";
import { TitleCard } from "../elements/TitleCard";

export const ModalUsuario = () => {
    const theme = useMantineTheme();
    const { isOpenModalUser, modalActionUsuario } = useUiUsuario();

    const form = useForm({
        initialValues: {
            nombres: "",
            apellidos: "",
            dni: "",
            email: "",
            institucion_id: "",
            roles: []
        },
        validate: {
            nombres: isNotEmpty("El nombre es obligatorio"),
            apellidos: isNotEmpty("El apellido es obligatorio"),
            dni: hasLength({ max: 10 }, "El número de cédula debe tener máximo 10 caracteres"),
            email: isEmail("Introduzca un email válido"),
            institucion_id: isNotEmpty("La institución es obligatorio"),
            roles: isNotEmpty("Seleccione un role al usuario")
        }
    })

    const handleCloseModal = () => {
        form.reset();
        modalActionUsuario(0);
    }


    return (
        <Modal
            opened={isOpenModalUser}
            onClose={handleCloseModal}
            title={<TitleCard title="Usuario" />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            radius="md"
        >
            <FormUsuario form={form} />
        </Modal>
    );
};
