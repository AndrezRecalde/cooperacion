import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Badge } from "@mantine/core";
import { useUiOrganizacion, useOrganizacionStore } from "../../../hooks";
import { ActionsOrganizacion, BtnAdd, DotButton } from "../../../components";
import Flag from "react-flagkit";

export const TableOrganizaciones = () => {
    const { modalActionOrganizacion, modalShowOrganizacion, modalActivateOrg } =
        useUiOrganizacion();
    const {
        isLoading,
        organizaciones,
        setActivateEstado,
        startShowOrganizacion,
        startShowForEdit,
        startDeleteOrganizacion,
        setClearActivateOrganizacion,
        setClearActivateEstado
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
                        leftSection={
                            <DotButton
                                cell={cell}
                                handleActivar={handleActivar}
                            />
                        }
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
            setActivateEstado(selected);
            modalActivateOrg(1);
        },
        [organizaciones]
    );

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

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateOrganizacion();
        setClearActivateEstado();
        modalActionOrganizacion(1);
    };

    const table = useMantineReactTable({
        columns,
        data: organizaciones,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <ActionsOrganizacion
                row={row}
                handleShow={handleShow}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        ),
        renderTopToolbarCustomActions: () => <BtnAdd title="Agregar Organización" handleAdd={handleOpen} />,
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};
