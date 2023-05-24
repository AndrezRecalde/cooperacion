import { ActionIcon, Button, Grid, Tooltip } from "@mantine/core";
import { IconEdit, IconPencilPlus, IconTrash } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useTipoCoopStore } from "../../../hooks/tipo_cooperacion/useTipoCoopStore";
import { useMemo, useCallback } from "react";
import { useUiTipoCoop } from "../../../hooks/tipo_cooperacion/useUiTipoCoop";

export const TableTiposCoop = () => {
    const { isLoading, tiposCopperaciones, setActivateTipoCoop, startDeleteTipoCoop } = useTipoCoopStore();

    const { modalActionTipoCoop } = useUiTipoCoop();

    const columns = useMemo(
        () => [
            {
                accessorKey: "tipo_cooperacion",
                header: "Tipos de Cooperacion",
                size: 160,
                wrap: true,
            },
            {
                accessorFn: (row) => row.activo === 1 ? "Si" : "No",
                header: "Activo",
                size: 80,
                wrap: true,
            },
        ],
        [tiposCopperaciones]
    );

    const handleEditar = useCallback(
        (selected) => {
            setActivateTipoCoop(selected);
            modalActionTipoCoop(1);
        },
        [tiposCopperaciones]
    );

    const handleDelete = useCallback(
      (selected) => {
        startDeleteTipoCoop(selected);
      },
      [tiposCopperaciones],
    )


    return (
        <>
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
                data={tiposCopperaciones}
                enableRowNumbers
                rowNumberMode="original"
                enableColumnOrdering
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <Grid justify="center" key={row.id}>
                        <Grid.Col span={2}>
                            <Tooltip withArrow position="left" label="Editar">
                                <ActionIcon
                                    onClick={() => handleEditar(row.original)}
                                    color="blue"
                                >
                                    <IconEdit />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                        {/* <Grid.Col span={4}>
                            <Tooltip
                                withArrow
                                position="right"
                                label="Eliminar"
                            >
                                <ActionIcon
                                    color="red"
                                    onClick={() => handleDelete(row.original)}
                                >
                                    <IconTrash />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col> */}
                    </Grid>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="teal"
                        onClick={() => modalActionTipoCoop(1)}
                        variant="outline"
                        radius="md"
                        leftIcon={<IconPencilPlus />}
                    >
                        Agregar Tipo de Cooperación
                    </Button>
                )}
            />
        </>
    );
};
