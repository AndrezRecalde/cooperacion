import { Modal, useMantineTheme } from "@mantine/core";
import { FormEliminarOrg, TitleSections } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useOrganizacionStore, useUiOrganizacion } from "../../../hooks";

export const ModalEliminarOrg = () => {
    const theme = useMantineTheme();
    const { isOpenModalEliminarOrg, modalActionEliminarOrg } = useUiOrganizacion();
    const { setClearActivateOrganizacion } = useOrganizacionStore();


    const form = useForm({
        initialValues: {
            confirm_org: "",
        },
        validate: {
            confirm_org: isNotEmpty(
                "Debe especificar el nombre de la organización"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionEliminarOrg(0);
        setClearActivateOrganizacion();
        form.reset();
    }

    return (
        <Modal
            opened={isOpenModalEliminarOrg}
            onClose={handleCloseModal}
            title={<TitleSections title="Eliminar Organización" fw={700} />}
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
            <FormEliminarOrg form={form} />
        </Modal>
    );
};
