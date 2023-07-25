import { useMemo, useCallback } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useUiModalidad, useModalidadStore } from "../../../hooks";
import { BtnAdd, MenuActionsAdmin } from "../../../components";

export const TableModalidades = () => {
    const {
        isLoading,
        modalidades,
        setActivateModalidad,
        startDeleteModalidad,
        setClearActivateModalidad
    } = useModalidadStore();

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
                accessorFn: (row) => (row.activo === 1 ? "Si" : "No"),
                header: "Activo",
                size: 80,
                wrap: true,
            },
        ],
        [modalidades]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateModalidad(selected);
            modalActionModalidad(1);
        },
        [modalidades]
    );

    const handleDelele = useCallback(
        (selected) => {
            startDeleteModalidad(selected);
        },
        [modalidades]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateModalidad();
        modalActionModalidad(1);
    };

    const table = useMantineReactTable({
        columns,
        data: modalidades,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        rowNumberMode: "original",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <MenuActionsAdmin
                row={row}
                handleEdit={handleEdit}
                handleDelele={handleDelele}
            />
        ),
        renderTopToolbarCustomActions: () => (
            <BtnAdd title="Agregar Modalidad" handleAdd={handleOpen} />
        ),
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};
