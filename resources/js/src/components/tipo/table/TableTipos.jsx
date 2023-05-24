import { MantineReactTable } from "mantine-react-table";
import { IconTrash, IconEdit, IconPencilPlus } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { Button, ActionIcon, Tooltip, Grid } from "@mantine/core";
import { useTipoStore } from "../../../hooks";
import { useUiTipo } from "../../../hooks/tipo/useUiTipo";

export const TableTipos = () => {
    const { isLoading, tipos, setActivateTipo } = useTipoStore();
    const { modalActionTipo } = useUiTipo();

    const columns = useMemo(
        () => [
            {
                accessorKey: "tipo",
                header: "Organizacion",
                size: 160,
                wrap: true,
            },
        ],
        [tipos]
    );

    const handleEditar = useCallback(
        (selected) => {
            setActivateTipo(selected);
            modalActionTipo(1);
        },
        [tipos]
    );

    return (
        <MantineReactTable
            displayColumnDefOptions={{
                "mrt-row-actions": {
                    mantineTableHeadCellProps: {
                        align: "center",
                    },
                    header: "Acciones",
                    size: 100,
                },
            }}
            state={{ showProgressBars: isLoading }}
            columns={columns}
            data={tipos}
            enableRowNumbers
            rowNumberMode="original"
            enableColumnOrdering
            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row, table }) => (
                <Grid justify="center" key={row.id}>
                    <Grid.Col span={4}>
                        <Tooltip withArrow position="left" label="Editar">
                            <ActionIcon
                                onClick={() => handleEditar(row.original)}
                                color="blue"
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Tooltip>
                    </Grid.Col>
                </Grid>
            )}
            renderTopToolbarCustomActions={() => (
                <Button
                    color="teal"
                    onClick={() => modalActionTipo(1)}
                    variant="outline"
                    radius="md"
                    leftIcon={<IconPencilPlus />}
                >
                    Agregar Tipo de Organizacion
                </Button>
            )}
        />
    );
};
