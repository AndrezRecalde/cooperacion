import { useMemo, useCallback } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useTipoCoopStore, useUiTipoCoop } from "../../../hooks";
import { BtnAdd, MenuActionsAdmin } from "../../../components";

export const TableTiposCoop = () => {
    const {
        isLoading,
        tiposCopperaciones,
        setActivateTipoCoop,
        startDeleteTipoCoop,
        setClearActivateTipoCoop
    } = useTipoCoopStore();

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
                accessorFn: (row) => (row.activo === 1 ? "Si" : "No"),
                header: "Activo",
                size: 80,
                wrap: true,
            },
        ],
        [tiposCopperaciones]
    );

    const handleEdit = useCallback(
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
        [tiposCopperaciones]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateTipoCoop();
        modalActionTipoCoop(1);

    }

    const table = useMantineReactTable({
        columns,
        data: tiposCopperaciones,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        rowNumberMode: "original",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <MenuActionsAdmin
                row={row}
                handleEdit={handleEdit}
                handleDelele={handleDelete}
            />
        ),
        renderTopToolbarCustomActions: () => (
            <BtnAdd title="Agregar Tipo de Cooperación" handleAdd={handleOpen} />
        ),
    });

    return (
        <>
            <MantineReactTable
              table={table}
            />
        </>
    );
};
