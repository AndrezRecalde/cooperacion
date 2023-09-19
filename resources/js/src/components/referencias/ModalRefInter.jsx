import { Modal, useMantineTheme } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TitleSections, FormRefInter } from "../../components";
import { useUiInternacional } from "../../hooks";

export const ModalRefInter = () => {
    const theme = useMantineTheme();

    const { isOpenModalInternacional, modalActionRefInter } =
        useUiInternacional();

    const form = useForm({
        initialValues: {
            latitud: "",
            longitud: "",
            country_id: "",
            state_id: ""
        },
        validate: {
            latitud: isNotEmpty("Latitud es obligatoria"),
            longitud: isNotEmpty("Longitud es obligatoria"),
            state_id: isNotEmpty("Seleccione un estado")
        }
    });

    const handleCloseModal = () => {
        form.reset();
        modalActionRefInter(0);
    }

    return (
        <Modal
            opened={isOpenModalInternacional}
            onClose={handleCloseModal}
            title={<TitleSections title="Referencias Internacionales" />}
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
            <FormRefInter form={form} />
        </Modal>
    );
};
