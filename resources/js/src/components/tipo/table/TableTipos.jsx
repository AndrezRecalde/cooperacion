import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useTipoStore, useUiTipo } from "../../../hooks";
import { BtnAdd, MenuActionsAdmin } from "../../../components";

export const TableTipos = () => {
    const { isLoading, tipos, startDeleteTipo, setActivateTipo, setClearActivateTipo } =
        useTipoStore();
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

    const handleEdit = useCallback(
        (selected) => {
            setActivateTipo(selected);
            modalActionTipo(1);
        },
        [tipos]
    );

    const handleDelete = useCallback(
        (selected) => {
            startDeleteTipo(selected);
        },
        [tipos]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateTipo();
        modalActionTipo(1);

    }

    const table = useMantineReactTable({
        columns,
        data: tipos,
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
            <BtnAdd title="Agregar Tipo de Organización" handleAdd={handleOpen} />
        ),
    });

    return <MantineReactTable table={table} />;
};
