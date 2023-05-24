import { Modal, useMantineTheme } from "@mantine/core";
import { useUiOrganizacion } from "../../../hooks/organizacion/useUiOrganizacion";
import { FormActivarOrg } from "./form/FormActivarOrg";
import { TitleCard } from "../../elements/TitleCard";

export const ModalActivateOrg = () => {
    const theme = useMantineTheme();
    const { isOpenModalOrgActivo, modalActivateOrg } = useUiOrganizacion();

    return (
        <Modal
            opened={isOpenModalOrgActivo}
            onClose={() => modalActivateOrg(0)}
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
