import { Button } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";

export const BtnAdd = ({ title, handleAdd }) => {
    return (
        <Button
            color="teal.7"
            onClick={(e) => handleAdd(e)}
            variant="light"
            radius="sm"
            leftIcon={<IconPencilPlus />}
        >
            {title}
        </Button>
    );
};
