import { Modal, useMantineTheme } from "@mantine/core";
import { FormEliminar, TitleCard } from "../../../components";
import { useProyectoStore, useUiProyecto } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const ModalEliminarProyecto = () => {
    const theme = useMantineTheme();

    const { isOpenModalDeleteProyecto, modalActionDelete } = useUiProyecto();
    const { setClearActivateProyecto } = useProyectoStore();

    const form = useForm({
        initialValues: {
            confirm_proyecto: "",
        },
        validate: {
            confirm_proyecto: isNotEmpty(
                "Debe especificar el nombre del proyecto"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionDelete(0);
        setClearActivateProyecto();
    }

    return (
        <Modal
            opened={isOpenModalDeleteProyecto}
            onClose={handleCloseModal}
            title={<TitleCard title="Eliminar Proyecto" />}
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
            <FormEliminar form={form} />
        </Modal>
    );
};
