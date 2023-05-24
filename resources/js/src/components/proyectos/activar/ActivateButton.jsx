import { ActionIcon } from "@mantine/core";
import { IconAlertCircle, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                color={cell.row.original.activo === 1 ? "green" : "red"}
            >
                {cell.row.original.activo === 1 ? (
                    <IconDiscountCheckFilled color="green" />
                ) : (
                    <IconAlertCircle color="red" />
                )}
            </ActionIcon>
        </>
    );
};
