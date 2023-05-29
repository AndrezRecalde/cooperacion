import { ActionIcon } from "@mantine/core";
import { IconBan, IconCircleCheckFilled } from "@tabler/icons-react";

export const ActivateButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                color={cell.row.original.activo === 1 ? "green.8" : "red.8"}
            >
                {cell.row.original.activo === 1 ? (
                    <IconCircleCheckFilled  />
                ) : (
                    <IconBan />
                )}
            </ActionIcon>
        </>
    );
};
