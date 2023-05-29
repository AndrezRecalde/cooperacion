import { ActionIcon } from "@mantine/core";
import { IconAlertCircle, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateButton = ({ cell, handleActivar }) => {

    const handleActivate = (e) => {
        e.preventDefault();
        handleActivar(cell.row.original)
    }
    return (
        <>
            <ActionIcon
                onClick={(e) => handleActivate(e)}
                color={cell.row.original.activo === 1 ? "teal" : "red.8"}
            >
                {cell.row.original.activo === 1 ? (
                    <IconDiscountCheckFilled />
                ) : (
                    <IconAlertCircle />
                )}
            </ActionIcon>
        </>
    );
};
