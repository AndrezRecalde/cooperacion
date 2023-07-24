import { Group, Loader, Modal } from "@mantine/core";
import { useUiOrganizacion, useOrganizacionStore } from "../../hooks";
import { CardShowOrganizacion } from "../../components";

export const ModalShowOrganizacion = () => {
    const { isLoading, setClearActivateOrganizacion } = useOrganizacionStore();
    const { isOpenModalShowOrg, modalShowOrganizacion } = useUiOrganizacion();

    const handleCloseShowModal = () => {
        modalShowOrganizacion(0);
        setClearActivateOrganizacion();
    };

    return (
        <Modal
            opened={isOpenModalShowOrg}
            onClose={() => handleCloseShowModal()}
            withCloseButton={false}
            size="lg"
        >
            {isLoading ? (
                <Group position="center">
                    <Loader color="teal" size="xl" />
                </Group>
            ) : (
                <CardShowOrganizacion
                    handleCloseShowModal={handleCloseShowModal}
                />
            )}
        </Modal>
    );
};
