import { Button, Tooltip } from "@mantine/core";
import { IconChartPieFilled } from "@tabler/icons-react";
import { useUiMapa } from "../../hooks";

export const FloatChartBtn = () => {

    const { modalActionChart } = useUiMapa();

    return (
        <Tooltip
            label="Proyectos por Objetivos"
            color="teal.7"
            position="left-start"
            transitionProps={{ transition: "pop-bottom-left", duration: 300 }}
            withArrow
            arrowPosition="center"
        >
            <Button
                color="teal"
                variant="light"
                className="btnChart"
                onClick={() => modalActionChart(1)}
            >
                <IconChartPieFilled stroke={5} />
            </Button>
        </Tooltip>
    );
};
