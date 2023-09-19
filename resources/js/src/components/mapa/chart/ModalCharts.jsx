import { Modal, useMantineTheme } from "@mantine/core";
import { useUiMapa } from "../../../hooks";
import { TitleSections, ViewGraphics } from "../../../components";

export const ModalCharts = () => {
    const theme = useMantineTheme();
    const { isOpenModalChart, modalActionChart } = useUiMapa();

    return (
        <Modal
            opened={isOpenModalChart}
            onClose={() => modalActionChart(0)}
            title={<TitleSections title="Gráfico de Distribución de Proyectos" fw={700} fz="sm" />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
        >
            <ViewGraphics />
        </Modal>
    );
};
