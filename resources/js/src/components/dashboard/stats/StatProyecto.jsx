import {
    Group,
    Paper,
    SimpleGrid,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import {
    IconFolderCheck,
    IconFolders,
    IconFoldersOff,
} from "@tabler/icons-react";
import { useDashboardStore } from "../../../hooks";

const useStyles = createStyles((theme) => ({
    root: {
        /*padding: `calc(${theme.spacing.xl} * 1.5)`, */
        marginTop: rem(5),
        marginBottom: rem(25),
    },

    value: {
        fontSize: rem(25),
        fontWeight: 700,
        lineHeight: 0.5,
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
                : theme.colors.teal[5],
    },

    title: {
        fontWeight: 700,
        textTransform: "uppercase",
    },
}));

const icons = {
    proyectos: IconFolders,
    p_proceso: IconFolderCheck,
    p_finalizados: IconFoldersOff,
};

export const StatProyecto = ({ proyectoData }) => {
    const { classes } = useStyles();
    const { totalProyectos } = useDashboardStore();

    const valores = {
        total_proyectos: totalProyectos
            ?.map((item) => item.total)
            .reduce((prev, curr) => prev + curr, 0),
        proyectos_proceso: totalProyectos?.filter(item => item.id === 2).map(tot => tot.total),
        proyectos_finalizados: totalProyectos?.filter(item => item.id === 3).map(tot => tot.total),
    };

    const stats = proyectoData.map((stat) => {
        const Icon = icons[stat.icon];
        const totales = valores[stat.value];
        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
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
                            stroke={1.9}
                        />
                    </Group>

                    <Group align="flex-end" spacing="xs" mt={25}>
                        <Text className={classes.value}>{totales}</Text>
                    </Group>
                </div>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid
                cols={3}
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
