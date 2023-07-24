import { Badge, Card, Group, List, Table, Tooltip } from "@mantine/core";

export const DetailPanelProyecto = ({ row }) => {
    return (
        <Card withBorder radius="sm" mb="sm" shadow="sm" key={row.original.id}>
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
                        <Badge size="lg" color="teal" radius="xs">
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
                        <Badge radius="xs" size="lg" color="indigo">
                            {row.original.monto} USD
                        </Badge>
                    </Tooltip>
                </Group>
            </Card.Section>
            <Card.Section>
                <Table horizontalSpacing="lg" withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Intervención en</th>
                            <th>Grupo(s) de atención</th>
                            <th>Beneficiados Directos</th>
                            <th>Beneficiados Indirectos</th>
                            <th>Objetivos Sostenibles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={row.original.id}>
                            <td>
                                {row.original.cantones?.map((canton) => (
                                    <List key={canton.id}>
                                        <List.Item>
                                            {canton.nombre_canton}
                                        </List.Item>
                                    </List>
                                ))}
                            </td>
                            <td>
                                {row.original.grupos?.map((grupo) => (
                                    <List key={grupo.id}>
                                        <List.Item>{grupo.grupo}</List.Item>
                                    </List>
                                ))}
                            </td>
                            <td>{row.original.beneficiados_directos}</td>
                            <td>{row.original.beneficiados_indirectos}</td>
                            <td>
                                {row.original.odsostenibles?.map((ods) => (
                                    <List key={ods.id}>
                                        <List.Item>
                                            {ods.objetivo_ods}
                                        </List.Item>
                                    </List>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Section>
        </Card>
    );
};
