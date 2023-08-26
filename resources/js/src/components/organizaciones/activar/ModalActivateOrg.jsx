import { Modal, useMantineTheme } from "@mantine/core";
import { TitleCard, FormActivarOrg } from "../../../components";
import { useOrganizacionStore, useUiOrganizacion } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const ModalActivateOrg = () => {
    const theme = useMantineTheme();
    const { isOpenModalOrgActivo, modalActivateOrg } = useUiOrganizacion();
    const { setClearActivateOrganizacion } = useOrganizacionStore();

    const form = useForm({
        initialValues: {
            convenio_id: null
        },
        validate: {
           convenio_id: isNotEmpty("Por favor seleccione el tipo de convenio")
        }
    });

    const handleCloseModal = (e) => {
        e.preventDefault();
        modalActivateOrg(0);
        setClearActivateOrganizacion();
    }

    return (
        <Modal
            opened={isOpenModalOrgActivo}
            onClose={(e) => handleCloseModal(e)}
            title={<TitleCard title="Activar Organización" />}
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
            <FormActivarOrg form={form} />
        </Modal>
    );
};
