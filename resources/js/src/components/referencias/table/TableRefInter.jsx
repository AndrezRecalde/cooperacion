import { useMemo, useCallback } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useInternacionalStore, useUiInternacional } from "../../../hooks";
import { BtnAdd, MenuActionsAdmin } from "../../../components";

export const TableRefInter = () => {
    const {
        isLoading,
        referencias,
        setActivateRefInter,
        setClearActivateRefInter,
    } = useInternacionalStore();

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

    const handleEdit = useCallback(
        (selected) => {
            setActivateRefInter(selected);
            modalActionRefInter(1);
        },
        [referencias]
    );

    const handleDelete = useCallback(() => {
        console.log("clic");
    }, [referencias]);

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateRefInter();
        modalActionRefInter(1);
    };

    const table = useMantineReactTable({
        columns,
        data: referencias,
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
            <BtnAdd title="Agregar Referencia" handleAdd={handleOpen} />
        ),
    });

    return <MantineReactTable table={table} />;
};
