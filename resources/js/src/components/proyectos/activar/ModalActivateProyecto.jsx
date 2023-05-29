import { Modal, useMantineTheme } from "@mantine/core";
import { useUiProyecto } from "../../../hooks/proyecto/useUiProyecto";
import { FormActivar } from "./form/FormActivar";
import { TitleCard } from "../../elements/TitleCard";
import { useProyectoStore } from "../../../hooks/proyecto/useProyectoStore";

export const ModalActivateProyecto = () => {
    const theme = useMantineTheme();
    const { isOpenModalProyectoActivo, modalActionActivo } = useUiProyecto();
    const { setClearActivateEstado } = useProyectoStore();

    const handleCloseModal = (e) => {
        e.preventDefault();
        modalActionActivo(0);
        setClearActivateEstado();
    }
    return (
        <Modal
            opened={isOpenModalProyectoActivo}
            onClose={(e) => handleCloseModal(e)}
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
            <FormActivar />
        </Modal>
    );
};
