import { Modal, useMantineTheme } from "@mantine/core";
import { useUiProyecto } from "../../../hooks/proyecto/useUiProyecto";
import { FormEliminar } from "./FormEliminar";
import { TitleCard } from "../../elements/TitleCard";

export const ModalEliminarProyecto = () => {
    const theme = useMantineTheme();

    const { isOpenModalDeleteProyecto, modalActionDelete } = useUiProyecto();
    return (
        <Modal
            opened={isOpenModalDeleteProyecto}
            onClose={() => modalActionDelete(0)}
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
            <FormEliminar />
        </Modal>
    );
};
