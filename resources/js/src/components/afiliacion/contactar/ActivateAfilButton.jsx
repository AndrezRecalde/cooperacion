import { ActionIcon } from "@mantine/core";
import { IconAlertCircle, IconDiscountCheckFilled } from "@tabler/icons-react";

export const ActivateAfiButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                color={cell.row.original.contactado === 1 ? "blue" : "red"}
            >
                {cell.row.original.contactado === 1 ? (
                    <IconDiscountCheckFilled color="blue" />
                ) : (
                    <IconAlertCircle color="red" />
                )}
            </ActionIcon>
        </>
    );
};
