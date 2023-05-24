import { ActionIcon, Button, Grid, Tooltip } from "@mantine/core";
import { IconEdit, IconPencilPlus } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useMemo, useCallback } from "react";
import { useUiModalidad } from "../../../hooks/modalidad/useUiModalidad";
import { useModalidadStore } from "../../../hooks/modalidad/useModalidadStore";

export const TableModalidades = () => {

    const { isLoading, modalidades, setActivateModalidad, startDeleteModalidad } = useModalidadStore();

    const { modalActionModalidad } = useUiModalidad();

    const columns = useMemo(
        () => [
            {
                accessorKey: "tipo_modalidad",
                header: "Tipos de Modalidad",
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
        [modalidades]
    );

    const handleEditar = useCallback(
      (selected) => {
        setActivateModalidad(selected);
        modalActionModalidad(1);
      },
      [modalidades],
    );

    const handleDelele = useCallback(
      (selected) => {
        startDeleteModalidad();
      },
      [modalidades],
    );



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
                data={modalidades}
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
                        onClick={() => modalActionModalidad(1)}
                        variant="outline"
                        radius="md"
                        leftIcon={<IconPencilPlus />}
                    >
                        Agregar Modalidad
                    </Button>
                )}
            />
        </>
    );
};
