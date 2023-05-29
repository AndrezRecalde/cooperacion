import { useCallback, useMemo } from "react";
import {
    Button,
    ActionIcon,
    Tooltip,
    Card,
    Group,
    Table,
    Text,
    Box,
} from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useAfiliacionStore } from "../../../hooks/afiliacion/useAfiliacionStore";
import { useUiAfiliacion } from "../../../hooks/afiliacion/useUiAfiliacion";
import { ActivateAfiButton } from "../contactar/ActivateAfilButton";
import { IconFile, IconTrash } from "@tabler/icons-react";

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
                        <Tooltip withArrow position="right" label="Cambiar estado">
                            <ActivateAfiButton
                                cell={cell}
                                handleActivar={handleActivar}
                            />
                        </Tooltip>
                        <Tooltip withArrow position="right" label="Eliminar">
                            <ActionIcon
                                color="red.8"
                                onClick={() => handleDelete(cell.row.original.id)}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ),
            },
            {
                accessorKey: "entidad",
                header: "Entidad",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "nombres",
                header: "Contacto",
                size: 160,
                wrap: true,
            },
            {
                accessorKey: "cargo",
                header: "Cargo",
                size: 80,
            },
            {
                accessorKey: "telefono",
                header: "Telefono",
                size: 80,
                wrap: true,
            },
            {
                accessorKey: "email",
                header: "E-mail",
                size: 80,
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

    return (
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
            data={afiliaciones}
            enableColumnOrdering
            renderDetailPanel={({ row }) => (
                <>
                    <Card
                        withBorder
                        radius="md"
                        mb="lg"
                        shadow="sm"
                        key={"Card_1" + 1}
                    >
                        <Card.Section withBorder inheritPadding py="lg">
                            <Group position="apart">
                                <Tooltip
                                    color="teal"
                                    label="Razón social"
                                    transitionProps={{
                                        transition: "slide-up",
                                        duration: 300,
                                    }}
                                >
                                    <Text fz="md">
                                        {row.original.razon_social}
                                    </Text>
                                </Tooltip>
                                <Tooltip
                                    color="indigo"
                                    label="Sitio Web"
                                    transitionProps={{
                                        transition: "slide-up",
                                        duration: 300,
                                    }}
                                >
                                    <Box
                                        component="a"
                                        target="_blank"
                                        href={
                                            "https://" + row.original.sitio_web
                                        }
                                    >
                                        <Text fz="md">
                                            {row.original.sitio_web}
                                        </Text>
                                    </Box>
                                </Tooltip>
                            </Group>
                        </Card.Section>
                        <Card.Section>
                            <Table withBorder withColumnBorders>
                                <thead>
                                    <tr>
                                        <th>Telefono Entidad</th>
                                        <th>Dirección Entidad</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={row.original.id}>
                                        <td>{row.original.telefono_org}</td>
                                        <td>{row.original.direccion_org}</td>
                                        <td>{row.original.descripcion_org}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table withBorder withColumnBorders>
                                <thead>
                                    <tr>
                                        <th>Archivo 1</th>
                                        <th>Archivo 2</th>
                                        <th>Archivo 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={"prefix_" + row.original.id}>
                                        {row.original.archivos.map(
                                            (archivo, index) => {
                                                return (
                                                    <td key={index}>
                                                        <Button
                                                            leftIcon={
                                                                <IconFile />
                                                            }
                                                            variant="white"
                                                            onClick={(e) =>
                                                                handleViewArchivo(
                                                                    e,
                                                                    archivo.id
                                                                )
                                                            }
                                                        >
                                                            Archivo
                                                        </Button>
                                                    </td>
                                                );
                                            }
                                        )}
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Section>
                    </Card>
                </>
            )}
        />
    );
};
