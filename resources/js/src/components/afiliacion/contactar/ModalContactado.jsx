import { Modal, useMantineTheme } from "@mantine/core";
import { useUiAfiliacion } from "../../../hooks/afiliacion/useUiAfiliacion";
import { TitleCard } from "../../elements/TitleCard";
import { FormContactar } from "../form/FormContactar";

export const ModalContactado = () => {

    const theme = useMantineTheme();
    const { isOpenModalAfiActivo, modalActivateAfiliacion } = useUiAfiliacion();

    return (
        <Modal
            opened={isOpenModalAfiActivo}
            onClose={() => modalActivateAfiliacion(0)}
            title={<TitleCard title="¿Se ha llegado a contactar?" />}
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
            <FormContactar />
        </Modal>
    );
};
