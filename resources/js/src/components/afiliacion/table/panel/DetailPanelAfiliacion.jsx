import { Box, Button, Card, Group, Table, Title, Tooltip } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

export const DetailPanelAfiliacion = ({ row, handleViewArchivo }) => {
    return (
        <Card withBorder radius="md" mb="lg" shadow="sm" key={"Card_1" + 1}>
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
                        <Title fz="sm">{row.original.razon_social}</Title>
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
                            href={"https://" + row.original.sitio_web}
                        >
                            <Title fz="sm">{row.original.sitio_web}</Title>
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
                            {row.original.archivos.map((archivo, index) => {
                                return (
                                    <td key={index}>
                                        <Button
                                            leftIcon={<IconFile />}
                                            variant="white"
                                            onClick={(e) =>
                                                handleViewArchivo(e, archivo.id)
                                            }
                                        >
                                            Archivo
                                        </Button>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </Table>
            </Card.Section>
        </Card>
    );
};
