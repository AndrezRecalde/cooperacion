import { ActionIcon, Button, Grid, Tooltip } from "@mantine/core";
import { IconEdit, IconPencilPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useMemo, useCallback } from "react";
import { useInternacionalStore } from "../../../hooks/referencia/internacional/useInternacionalStore";
import { useUiInternacional } from "../../../hooks/referencia/internacional/useUiInternacional";

export const TableRefInter = () => {
    const { isLoading, referencias, setActivateRefInter } =
        useInternacionalStore();

    const { modalActionRefInter } = useUiInternacional();

    const columns = useMemo(
        () => [
            {
                accessorKey: "latitud",
                header: "Latitud",
                size: 100,
                wrap: true,
            },
            {
                accessorKey: "longitud",
                header: "Latitud",
                size: 100,
                wrap: true,
            },
            {
                accessorKey: "state",
                header: "Estado",
                size: 80,
                wrap: true,
            },
            {
                accessorKey: "pais",
                header: "Pais",
                size: 80,
                wrap: true,
            },
        ],
        [referencias]
    );

    const handleEditar = useCallback(
        (selected) => {
            setActivateRefInter(selected);
            modalActionRefInter(1);
        },
        [referencias]
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
            data={referencias}
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
                    onClick={() => modalActionRefInter(1)}
                    variant="outline"
                    radius="md"
                    leftIcon={<IconPencilPlus />}
                >
                    Agregar Referencia
                </Button>
            )}
        />
    );
};
