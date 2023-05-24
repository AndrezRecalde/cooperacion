import { ActionIcon } from "@mantine/core";
import { IconBan, IconCircleCheckFilled } from "@tabler/icons-react";

export const ActivateButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                color={cell.row.original.activo === 1 ? "green" : "red"}
            >
                {cell.row.original.activo === 1 ? (
                    <IconCircleCheckFilled color="green" />
                ) : (
                    <IconBan color="red" />
                )}
            </ActionIcon>
        </>
    );
};
