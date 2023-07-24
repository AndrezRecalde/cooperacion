import { Modal, useMantineTheme } from "@mantine/core";
import { TitleCard, FormActivarOrg } from "../../../components";
import { useOrganizacionStore, useUiOrganizacion } from "../../../hooks";

export const ModalActivateOrg = () => {
    const theme = useMantineTheme();
    const { isOpenModalOrgActivo, modalActivateOrg } = useUiOrganizacion();
    const { setClearActivateEstado } = useOrganizacionStore();

    const handleCloseModal = (e) => {
        e.preventDefault();
        modalActivateOrg(0);
        setClearActivateEstado();
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
            <FormActivarOrg />
        </Modal>
    );
};
