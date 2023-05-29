import { Button, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useUiProyecto } from "../../hooks/proyecto/useUiProyecto";

export const FloatAddButton = () => {
    const { modalActionProyecto } = useUiProyecto();

    return (
        <Tooltip
            label="Agregar Proyecto"
            color="teal"
            position="left-start"
            transitionProps={{ transition: 'pop-bottom-left', duration: 300 }}
            withArrow
            arrowPosition="center"
        >
            <Button
                color="teal"
                variant="light"
                className="fab"
                onClick={() => modalActionProyecto(1) }
            >
                <IconPlus stroke={5}/>
            </Button>
        </Tooltip>
    );
};
