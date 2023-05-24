import { Modal, useMantineTheme } from "@mantine/core";
import { TitleCard } from "../elements/TitleCard";
import { useUiModalidad } from "../../hooks/modalidad/useUiModalidad";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormModalidad } from "./form/FormModalidad";

export const ModalModalidad = () => {
    const theme = useMantineTheme();
    const { isOpenModalidad, modalActionModalidad } = useUiModalidad();

    const form = useForm({
        initialValues: {
            tipo_modalidad: "",
            activo: 1
        },
        validate: {
            tipo_modalidad: isNotEmpty("La modalidad es obligatorio"),
            activo: isNotEmpty("¿Esta activo este item?")
        }
    });

    const handleCloseModalModalidad = () => {
        form.reset();
        modalActionModalidad(0);
    }

    return (
        <Modal
            opened={isOpenModalidad}
            onClose={handleCloseModalModalidad}
            title={<TitleCard title="Modalidades" />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="lg"
        >
            <FormModalidad form={form} />
        </Modal>
    );
};
