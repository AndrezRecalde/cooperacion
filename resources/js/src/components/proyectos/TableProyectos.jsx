import { MantineReactTable } from "mantine-react-table";
import { useProyectoStore } from "../../hooks/proyecto/useProyectoStore";
import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Grid,
    Group,
    List,
    Table,
    Tooltip,
} from "@mantine/core";
import {
    IconFileCertificate,
    IconPencil,
    IconPencilPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useUiProyecto } from "../../hooks/proyecto/useUiProyecto";
import { useCallback, useMemo } from "react";
import { ActivateButton } from "./activar/ActivateButton";

export const TableProyectos = () => {
    const { modalActionProyecto, modalActionActivo, modalActionDelete } =
        useUiProyecto();
    const { isLoading, proyectos, startShowForEdit, setActivateProyecto, setActivateEstado, fichaProyecto, setClearActivateProyecto } =
        useProyectoStore();

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
                accessorFn: (row) => row.periodo ? row.periodo : "Sin periodo",
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
      [proyectos],
    );

    const handleOpenForm = (e) => {
        e.preventDefault();
        setClearActivateProyecto();
        modalActionProyecto(1)
    }


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
                columns={columns}
                data={proyectos}
                enableColumnOrdering
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => (
                    <Grid justify="center" key={row.id}>
                        <Grid.Col span={4}>
                            <Tooltip withArrow position="left" label="Editar">
                                <ActionIcon
                                    onClick={() => handleEdit(row.original)}
                                    color="teal"
                                >
                                    <IconPencil />
                                </ActionIcon>
                            </Tooltip>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Tooltip
                                withArrow
                                position="left"
                                label="Ver Documento"
                            >
                                <ActionIcon
                                    onClick={() => handleCertificate(row.original.id)}
                                    color="blue"
                                >
                                    <IconFileCertificate />
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
                        onClick={(e) => handleOpenForm(e)}
                        variant="outline"
                        radius="md"
                        leftIcon={<IconPencilPlus />}
                    >
                        Agregar Proyecto
                    </Button>
                )}
                renderDetailPanel={({ row }) => (
                    <>
                        <Card
                            withBorder
                            radius="md"
                            mb="sm"
                            shadow="sm"
                            key={row.original.id}
                        >
                            <Card.Section withBorder inheritPadding py="lg">
                                <Group position="apart">
                                    <Tooltip
                                        color="teal"
                                        label="Modalidad"
                                        transitionProps={{
                                            transition: "slide-up",
                                            duration: 300,
                                        }}
                                    >
                                        <Badge
                                            size="lg"
                                            color="teal"
                                            radius="xs"
                                        >
                                            {row.original.modalidad}
                                        </Badge>
                                    </Tooltip>
                                    <Tooltip
                                        color="indigo"
                                        label="Monto del proyecto"
                                        transitionProps={{
                                            transition: "slide-up",
                                            duration: 300,
                                        }}
                                    >
                                        <Badge
                                            radius="xs"
                                            size="lg"
                                            color="indigo"
                                        >
                                            {row.original.monto} USD
                                        </Badge>
                                    </Tooltip>
                                </Group>
                            </Card.Section>
                            <Card.Section>
                                <Table horizontalSpacing="lg" withBorder withColumnBorders>
                                    <thead>
                                        <tr>
                                            <th>Cantón</th>
                                            <th>Parroquia</th>
                                            <th>Grupo de atención</th>
                                            <th>Grupo Beneficiado</th>
                                            <th>Total Beneficiados</th>
                                            <th>Objetivos Sostenibles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={row.original.id}>
                                            <td>{row.original.canton}</td>
                                            <td>{row.original.parroquia}</td>
                                            <td>
                                                {row.original.grupos?.map(
                                                    (grupo) => (
                                                        <List key={grupo.id}>
                                                            <List.Item>
                                                                {grupo.grupo}
                                                            </List.Item>
                                                        </List>
                                                    )
                                                )}
                                            </td>
                                            <td>
                                                {row.original.grupo_beneficiado}
                                            </td>
                                            <td>
                                                {
                                                    row.original
                                                        .total_beneficiados
                                                }
                                            </td>
                                            <td>
                                                {row.original.odsostenibles?.map(
                                                    (ods) => (
                                                        <List key={ods.id}>
                                                            <List.Item>
                                                                {
                                                                    ods.objetivo_ods
                                                                }
                                                            </List.Item>
                                                        </List>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Section>
                        </Card>
                    </>
                )}
                state={{ showProgressBars: isLoading }}
            />
        </>
    );
};
