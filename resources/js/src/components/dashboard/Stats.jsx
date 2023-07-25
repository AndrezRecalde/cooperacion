import {
    createStyles,
    Group,
    Paper,
    SimpleGrid,
    Text,
    rem,
    Loader,
} from "@mantine/core";
import {
    IconCoin,
    IconWorldStar,
    IconFolders,
    IconUserCircle,
} from "@tabler/icons-react";
import {
    useProyectoStore,
    useOrganizacionStore,
    useUsuarioStore,
} from "../../hooks";

const useStyles = createStyles((theme) => ({
    root: {
        /*padding: `calc(${theme.spacing.xl} * 1.5)`, */
        marginTop: rem(25),
        marginBottom: rem(30),
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
    },

    icon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.teal[5]
                : theme.colors.teal[7],
    },

    title: {
        fontWeight: 700,
        textTransform: "uppercase",
    },
}));

const icons = {
    proyectos: IconFolders,
    organizaciones: IconWorldStar,
    usuarios: IconUserCircle,
    monto_ejecutado: IconCoin,
};

export const Stats = ({ data }) => {
    const { classes } = useStyles();
    const { totalProyectos, montoEjecutado } = useProyectoStore();
    const { organizaciones } = useOrganizacionStore();

    const { usuarios } = useUsuarioStore();

    const valores = {
        total_usuarios: usuarios.length,
        total_proyectos: totalProyectos?.reduce(
            (prev, curr) => prev + curr.total,
            0
        ),
        total_organizaciones: organizaciones.length,
        monto_ejecutado: montoEjecutado + " USD",
    };

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const totales = valores[stat.value];
        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                {totales !== "null USD" ? (
                    <div>
                        <Group position="apart">
                            <Text
                                size="xs"
                                color="dimmed"
                                className={classes.title}
                            >
                                {stat.title}
                            </Text>
                            <Icon
                                className={classes.icon}
                                size="1.4rem"
                                stroke={1.5}
                            />
                        </Group>

                        <Group align="flex-end" spacing="xs" mt={25}>
                            <Text className={classes.value}>{totales}</Text>
                        </Group>
                    </div>
                ) : (
                    <Group position="center">
                        <Loader color="teal" size="xl" />
                    </Group>
                )}
            </Paper>
        );
    });
    return (
        <div className={classes.root}>
            <SimpleGrid
                cols={4}
                breakpoints={[
                    { maxWidth: "md", cols: 1 },
                    { maxWidth: "xs", cols: 1 },
                ]}
            >
                {stats}
            </SimpleGrid>
        </div>
    );
};
