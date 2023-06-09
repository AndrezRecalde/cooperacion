import { Modal, useMantineTheme } from "@mantine/core";
import { TitleCard } from "../elements/TitleCard";
import { useUiTipo } from "../../hooks/tipo/useUiTipo";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormTipo } from "./form/FormTipo";

export const ModalTipo = () => {
    const theme = useMantineTheme();

    const { isOpenModalTipo, modalActionTipo } = useUiTipo();

    const form = useForm({
        initialValues: {
            tipo: ""
        },
        validate: {
            tipo: isNotEmpty("El tipo es obligatorio")
        }
    });

    const handleCloseModalTipo = () => {
        form.reset();
        modalActionTipo(0);
    }

    return (
        <Modal
            opened={isOpenModalTipo}
            onClose={handleCloseModalTipo}
            title={<TitleCard title="Tipos de Organizacion" />}
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
            <FormTipo form={form} />
        </Modal>
    );
};
