import { MantineReactTable } from "mantine-react-table";
import {
    IconTrash,
    IconEdit,
    IconEyeCheck,
    IconPencilPlus,
} from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { Button, ActionIcon, Tooltip, Grid, Badge } from "@mantine/core";
import { useUiOrganizacion } from "../../../hooks/organizacion/useUiOrganizacion";
import { useOrganizacionStore } from "../../../hooks/organizacion/useOrganizacionStore";
import { DotButton } from "./DotButton";
import Flag from "react-flagkit";


export const TableOrganizaciones = () => {
    const {  modalActionOrganizacion, modalShowOrganizacion, modalActivateOrg } =
        useUiOrganizacion();
    const {
        isLoading,
        organizaciones,
        setActivateOrganizacion,
        startShowOrganizacion,
        startShowForEdit,
        startDeleteOrganizacion,
    } = useOrganizacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "code",
                header: "Bandera",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                enableColumnFilter: false,
                size: 40,
                Cell: ({ cell }) => (
                    <Flag country={cell.getValue()} size={30} />
                ),
            },
            {
                accessorKey: "nombre_organizacion",
                header: "Organizacion",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "pais",
                header: "Pais",
                size: 120,
            },
            {
                accessorKey: "convenio",
                header: "Convenio",
                Cell: ({ cell }) => (
                    <Badge
                        pl={0}
                        variant="outline"
                        size="md"
                        color={
                            cell.row.original.convenio_id === 1
                                ? "blue"
                                : cell.row.original.convenio_id === 2
                                ? "teal"
                                : "red"
                        }
                        radius="md"
                        leftSection={<DotButton cell={cell} handleActivar={handleActivar} />}
                    >
                        {cell.getValue()}
                    </Badge>
                ),
            },
        ],
        [organizaciones]
    );

    const handleActivar = useCallback(
      (selected) => {
        setActivateOrganizacion(selected);
        modalActivateOrg(1);
      },
      [organizaciones],
    )


    const handleShow = useCallback(
        (idSelected) => {
            startShowOrganizacion(idSelected);
            modalShowOrganizacion(1);
        },
        [organizaciones]
    );

    const handleEdit = useCallback(
        (selected) => {
            startShowForEdit(selected);
            modalActionOrganizacion(1);
        },
        [organizaciones]
    );

    const handleDelete = useCallback(
        (selected) => {
            startDeleteOrganizacion(selected);
        },
        [organizaciones]
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
                data={organizaciones}
                enableColumnOrdering
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <Grid justify="center" key={row.id}>
                        <Grid.Col span={4}>
                            <Tooltip withArrow position="left" label="Ver">
                                <ActionIcon
                                    onClick={() => handleShow(row.original.id)}
                                    color="teal"
                                >
                                    <IconEyeCheck />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Tooltip withArrow position="left" label="Editar">
                                <ActionIcon
                                    onClick={() => handleEdit(row.original)}
                                    color="blue"
                                >
                                    <IconEdit />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span={4}>
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
                        </Grid.Col>
                    </Grid>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="teal"
                        onClick={() => modalActionOrganizacion(1)}
                        variant="outline"
                        radius="md"
                        leftIcon={<IconPencilPlus />}
                    >
                        Agregar Organizacion
                    </Button>
                )}
            />
        </>
    );
};
