import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useUiProyecto, useProyectoStore } from "../../../hooks";
import { ActivateButton, ActionsProyecto, DetailPanelProyecto, BtnAdd } from "../../../components";

export const TableProyectos = () => {
    const { modalActionProyecto, modalActionActivo, modalActionDelete } =
        useUiProyecto();
    const {
        isLoading,
        proyectos,
        startShowForEdit,
        setActivateProyecto,
        setActivateEstado,
        fichaProyecto,
        setClearActivateProyecto,
        setClearActivateEstado,
    } = useProyectoStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "activo",
                header: "Activo",
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                enableColumnFilter: false,
                size: 40,
                Cell: ({ cell }) => (
                    <ActivateButton cell={cell} handleActivar={handleActivar} />
                ),
            },
            {
                accessorKey: "nombre_proyecto",
                header: "Proyecto",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "nombre_organizacion",
                header: "Organizacion",
                size: 120,
            },
            {
                accessorKey: "tipo_cooperacion",
                header: "Tipo Cooperacion",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    row.periodo ? row.periodo : "Sin periodo",
                header: "Período",
                size: 80,
            },
        ],
        [proyectos]
    );

    const handleActivar = useCallback(
        (selected) => {
            setActivateEstado(selected);
            modalActionActivo(1);
        },
        [proyectos]
    );

    const handleEdit = useCallback(
        (selected) => {
            startShowForEdit(selected);
            modalActionProyecto(1);
        },
        [proyectos]
    );

    const handleDelete = useCallback(
        (selected) => {
            setActivateProyecto(selected);
            modalActionDelete(1);
        },
        [proyectos]
    );

    const handleCertificate = useCallback(
        (id) => {
            fichaProyecto(id);
        },
        [proyectos]
    );

    const handleOpenForm = (e) => {
        e.preventDefault();
        setClearActivateProyecto();
        setClearActivateEstado();
        modalActionProyecto(1);
    };

    const table = useMantineReactTable({
        columns,
        data: proyectos,
        enableColumnOrdering: true,
        enableRowActions: true,
        positionActionsColumn: "last",
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <ActionsProyecto
                row={row}
                handleCertificate={handleCertificate}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        ),

        renderTopToolbarCustomActions: () => (
            <BtnAdd title="Agregar Proyecto" handleAdd={handleOpenForm} />
        ),
        renderDetailPanel: ({ row }) => (
            <DetailPanelProyecto row={row} />
        ),
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};
