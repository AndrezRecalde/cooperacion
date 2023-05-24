import { Group, Text, createStyles, Badge, Flex } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        /* '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      }, */
    },
}));

export function UserButton({ icon, ...others }) {
    const { classes } = useStyles();

    return (
        <div className={classes.user} {...others}>
            <Group>
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={700}>
                        Cooperación Internacional
                    </Text>

                    <Badge radius="sm" color="teal">
                        <Text tt="uppercase" fw={700}>GADPE</Text>
                    </Badge>
                </div>

                {(
                    <Flex justify="center" align="center" direction="row">
                        {icon}
                    </Flex>
                ) || <IconChevronRight size="0.9rem" stroke={1.5} />}
            </Group>
        </div>
    );
}
