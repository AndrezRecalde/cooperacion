import { ActionIcon } from "@mantine/core";
import { IconAlertCircle, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateAfiButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                color={cell.row.original.contactado === 1 ? "indigo.7" : "yellow.6"}
            >
                {cell.row.original.contactado === 1 ? (
                    <IconDiscountCheckFilled />
                ) : (
                    <IconAlertCircle />
                )}
            </ActionIcon>
        </>
    );
};
