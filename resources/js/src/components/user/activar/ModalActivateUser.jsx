import { Modal, useMantineTheme } from "@mantine/core";
import { useUiUsuario } from "../../../hooks/usuario/useUiUsuario";
import { TitleCard } from "../../elements/TitleCard";
import { FormActivarUsuario } from "./form/FormActivarUsuario";
import { useUsuarioStore } from "../../../hooks/usuario/useUsuarioStore";

export const ModalActivateUser = () => {
    const theme = useMantineTheme();

    const { isOpenModalActivateUser, modalActivateUsuario } = useUiUsuario();
    const { setClearActivateEstado } = useUsuarioStore();

    const handleCloseModal = (e) => {
        e.preventDefault();
        modalActivateUsuario(0)
        setClearActivateEstado();
    }

    return (
        <Modal
            opened={isOpenModalActivateUser}
            onClose={(e) => handleCloseModal(e)}
            title={<TitleCard title="Activar Usuario" />}
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
            <FormActivarUsuario />
        </Modal>
    );
};
