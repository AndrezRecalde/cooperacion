import { useCallback, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Badge, useMantineTheme } from "@mantine/core";
import { useUiUsuario, useUsuarioStore } from "../../../hooks";
import {
    ActivateUserButton,
    BtnAdd,
    MenuActionsAdmin,
} from "../../../components";

export const TableUsuarios = () => {
    const theme = useMantineTheme();
    const { modalActionUsuario, modalActivateUsuario } = useUiUsuario();

    const {
        isLoading,
        usuarios,
        startShowForEdit,
        setActivateEstado,
        startDeleteUsuario,
        setClearActivateUsuario,
    } = useUsuarioStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "activo",
                header: "Activo",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                enableColumnFilter: false,
                size: 40,
                Cell: ({ cell }) => (
                    <ActivateUserButton
                        cell={cell}
                        handleActivar={handleActivar}
                    />
                ),
            },
            {
                accessorKey: "nombres",
                header: "Nombres",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "dni",
                header: "Cédula",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 120,
            },
            {
                accessorKey: "role",
                Cell: ({ cell }) => (
                    <Badge
                        color={
                            cell.getValue() === "Administrador"
                                ? "indigo"
                                : cell.getValue() === "Director"
                                ? "orange"
                                : cell.getValue() === "Asistente"
                                ? "teal"
                                : "red"
                        }
                        radius="sm"
                        variant={
                            theme.colorScheme === "dark" ? "light" : "outline"
                        }
                    >
                        {cell.getValue()}
                    </Badge>
                ),
                header: "Role",
                size: 120,
            },
        ],
        [usuarios, theme]
    );

    const handleActivar = useCallback(
        (selected) => {
            setActivateEstado(selected);
            modalActivateUsuario(1);
        },
        [usuarios]
    );

    const handleEdit = useCallback(
        (selected) => {
            startShowForEdit(selected);
            modalActionUsuario(1);
        },
        [usuarios]
    );

    const handleDelete = useCallback(
        (selected) => {
            startDeleteUsuario(selected);
        },
        [usuarios]
    );

    const handleOpen = (e) => {
        e.preventDefault();
        setClearActivateUsuario();
        modalActionUsuario(1);
    };

    const table = useMantineReactTable({
        columns,
        data: usuarios,
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
            <BtnAdd title="Agregar Usuario" handleAdd={handleOpen} />
        ),
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};
