import { ActionIcon, Badge, Button, Grid, Text, Tooltip, useMantineTheme } from "@mantine/core";
import {
    IconEdit,
    IconEyeCheck,
    IconPencilPlus,
    IconTrash,
} from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { useCallback, useMemo } from "react";
import { useUiUsuario } from "../../../hooks/usuario/useUiUsuario";
import { useUsuarioStore } from "../../../hooks/usuario/useUsuarioStore";
import { ActivateButton } from "../activar/ActivateButton";

export const TableUsuarios = () => {
    const theme = useMantineTheme();
    const { modalActionUsuario, modalActivateUsuario } = useUiUsuario();

    const {
        isLoading,
        usuarios,
        startShowForEdit,
        setActivateEstado,
        startDeleteUsuario,
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
                    <ActivateButton cell={cell} handleActivar={handleActivar} />
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
                Cell: ({cell}) => (
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
                        variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
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
                data={usuarios}
                enableColumnOrdering
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <Grid justify="center" key={row.id}>
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
                        onClick={() => modalActionUsuario(1)}
                        variant="outline"
                        radius="md"
                        leftIcon={<IconPencilPlus />}
                    >
                        Agregar Usuarios
                    </Button>
                )}
            />
        </>
    );
};
