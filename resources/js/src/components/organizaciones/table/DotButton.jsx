import { ActionIcon, rem } from "@mantine/core";
import { IconPointFilled } from "@tabler/icons-react";

export const DotButton = ({ cell, handleActivar }) => {
    return (
        <>
            <ActionIcon
                onClick={() => handleActivar(cell.row.original)}
                size="xs"
                color={
                    cell.row.original.convenio_id === 1
                        ? "blue"
                        : cell.row.original.convenio_id === 2
                        ? "teal"
                        : "red"
                }
                radius="xl"
                variant="subtle"
            >
                <IconPointFilled size={rem(30)} />
            </ActionIcon>
        </>
    );
};
