import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TitleSections, FormTipo } from "../../components";
import { useUiTipo } from "../../hooks";

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
            title={<TitleSections title="Tipos de Organizacion" />}
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
