import {
    createStyles,
    ThemeIcon,
    Text,
    Group,
    Badge,
    Paper,
    rem,
} from "@mantine/core";
import { IconReportMoney } from "@tabler/icons-react";
import { useDashboardStore } from "../../../hooks";

const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
    },

    icon: {
        position: "absolute",
        top: `calc(-${ICON_SIZE} / 3)`,
        left: `calc(50% - ${ICON_SIZE} / 2)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

export const StatMontoPartida = () => {
    const { classes } = useStyles();
    const { totalMontos } = useDashboardStore();
    return (
        <Paper
            radius="md"
            withBorder
            className={classes.card}
            mt={`calc(${ICON_SIZE} / 3)`}
        >
            <ThemeIcon
                className={classes.icon}
                size={ICON_SIZE}
                radius={ICON_SIZE}
                color="yellow.5"
            >
                <IconReportMoney size="2rem" stroke={1.5} />
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title}>
                Monto Contrapartida
            </Text>
            <Text c="dimmed" ta="center" fw={700} fz="lg">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMontos?.contrapartida)}
            </Text>

            <Group position="center" mt="md">
                {/* <Text fz="sm">20 / 36 km</Text> */}
                <Badge color="yellow.7" radius="md" size="md">
                    Monto de contrapartes de entidades
                </Badge>
            </Group>
        </Paper>
    );
};
