import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiProyecto, useProyectoStore } from "../../../hooks";
import { FormActivar, TitleCard } from "../../../components";

export const ModalActivateProyecto = () => {
    const theme = useMantineTheme();
    const { isOpenModalProyectoActivo, modalActionActivo } = useUiProyecto();
    const { setClearActivateProyecto } = useProyectoStore();

    const form = useForm({
        initialValues: {
            activo: null
        },
        validate: {
            activo: isNotEmpty("Por favor ingrese un estado para el proyecto")
        }
    });

    const handleCloseModal = () => {
        modalActionActivo(0);
        setClearActivateProyecto();
    }
    return (
        <Modal
            opened={isOpenModalProyectoActivo}
            onClose={handleCloseModal}
            title={<TitleCard title="Activar Proyecto" />}
            centered
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
        >
            <FormActivar form={form} />
        </Modal>
    );
};
