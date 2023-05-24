import { Modal, useMantineTheme } from "@mantine/core";
import { useUiUsuario } from "../../../hooks/usuario/useUiUsuario";
import { TitleCard } from "../../elements/TitleCard";


export const ModalPrueba = () => {
    const theme = useMantineTheme();

    const { isOpenModalActivateUser, modalActivateUsuario } = useUiUsuario();

    return (
        <Modal
            opened={isOpenModalActivateUser}
            onClose={() => modalActivateUsuario(0)}
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
        ></Modal>
    );
};
