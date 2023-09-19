import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TitleSections, FormTipoCoop } from "../../components";
import { useUiTipoCoop } from "../../hooks";

export const ModalTipoCoop = () => {
    const theme = useMantineTheme();
    const { isOpenModalTipoCoop, modalActionTipoCoop } = useUiTipoCoop();

    const form = useForm({
        initialValues: {
            tipo_cooperacion: "",
            activo: 1
        },
        validate: {
            tipo_cooperacion: isNotEmpty("El tipo de cooperación es obligatorio"),
            activo: isNotEmpty("¿Esta activo este item?")
        }
    });

    const handleCloseModalTipoCoop = () => {
        form.reset();
        modalActionTipoCoop(0);

    }

    return (
        <Modal
            opened={isOpenModalTipoCoop}
            onClose={handleCloseModalTipoCoop}
            title={<TitleSections title="Tipo de Cooperación" />}
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
            <FormTipoCoop form={form} />
        </Modal>
    );
};
