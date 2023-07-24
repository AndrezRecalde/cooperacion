import { Button, Tooltip } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useUiMapa } from "../../hooks";

export const FloatOrgButton = () => {
    const { drawerOrg } = useUiMapa();
    return (
        <Tooltip
            label="Ver Organizaciones"
            color="teal"
            position="left-start"
            transitionProps={{ transition: 'pop-bottom-left', duration: 300 }}
            withArrow
            arrowPosition="center"
        >
            <Button
                color="teal"
                variant="light"
                className="btnOrg"
                onClick={() => drawerOrg(1)}
            >
                <IconWorld />
            </Button>
        </Tooltip>
    );
};
