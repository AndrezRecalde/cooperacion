import { Group, Loader, Modal } from "@mantine/core";
import { useUiOrganizacion } from "../../hooks/organizacion/useUiOrganizacion";
import { useOrganizacionStore } from "../../hooks/organizacion/useOrganizacionStore";
import { CardShowOrganizacion } from "./card/CardShowOrganizacion";

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
