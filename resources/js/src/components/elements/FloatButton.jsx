import { Button } from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import { useUiMapa } from "../../hooks";

export const FloatButton = () => {
    const { drawerMenu } = useUiMapa();

    return (
        <Button
            className="floatBtn"
            variant="light"
            color="teal.7"
            rightIcon={<IconClick />}
            onClick={() => drawerMenu(1)}
        >
            Búsqueda por Filtros
        </Button>
    );
};
