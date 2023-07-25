import { useCallback, useMemo } from "react";
import {
    ActionIcon,
    Group,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconTrash } from "@tabler/icons-react";
import { ActivateAfilButton, DetailPanelAfiliacion } from "../../../components";
import { useAfiliacionStore, useUiAfiliacion } from "../../../hooks";

export const TableAfiliaciones = () => {
    const { modalActivateAfiliacion } = useUiAfiliacion();

    const {
        isLoading,
        afiliaciones,
        setActivateAfiliacion,
        archivoAfiliacion,
        startDeleteAfiliacion,
    } = useAfiliacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "contactado",
                header: "¿Contactado?",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                enableColumnFilter: false,
                size: 40,
                Cell: ({ cell }) => (
                    <Group>
                        <ActivateAfilButton
                            cell={cell}
                            handleActivar={handleActivar}
                        />
                        <ActionIcon
                            color="red.8"
                            onClick={() => handleDelete(cell.row.original.id)}
                        >
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                ),
            },
            {
                accessorKey: "entidad",
                header: "Entidad",
                wrap: true,
            },
            {
                accessorKey: "nombres",
                header: "Contacto",
                wrap: true,
            },
            {
                accessorKey: "cargo",
                header: "Cargo",
            },
            {
                accessorKey: "telefono",
                header: "Telefono",
                wrap: true,
            },
            {
                accessorKey: "email",
                header: "E-mail",
                wrap: true,
            },
        ],
        [afiliaciones]
    );

    const handleActivar = useCallback(
        (selected) => {
            setActivateAfiliacion(selected);
            modalActivateAfiliacion(1);
        },
        [afiliaciones]
    );

    const handleViewArchivo = useCallback(
        (e, selected) => {
            e.preventDefault();
            archivoAfiliacion(selected);
        },
        [afiliaciones]
    );

    const handleDelete = useCallback(
        (selected) => {
            startDeleteAfiliacion(selected);
        },
        [afiliaciones]
    );


    const table = useMantineReactTable({
        columns,
        data: afiliaciones,
        enableColumnOrdering: true,
        positionActionsColumn: "last",
        state: { showProgressBars: isLoading },
        renderDetailPanel: ({ row }) => (
            <DetailPanelAfiliacion row={row} handleViewArchivo={handleViewArchivo} />
        ),
    });

    return (
        <MantineReactTable
            table={table}
        />
    );
};
