import { ActionIcon } from "@mantine/core";
import {
    IconAlertCircleFilled,
    IconDiscountCheckFilled,
} from "@tabler/icons-react";

export const ActivateButton = ({ cell, handleActivar }) => {
    const handleActivate = (e) => {
        e.preventDefault();
        handleActivar(cell.row.original);
    };
    return (
        <>
            <ActionIcon
                radius="xl"
                onClick={(e) => handleActivate(e)}
                color={cell.row.original.activo === 1 ? "teal" : "orange.5"}
            >
                {cell.row.original.activo === 1 ? (
                    <IconDiscountCheckFilled />
                ) : (
                    <IconAlertCircleFilled />
                )}
            </ActionIcon>
        </>
    );
};
