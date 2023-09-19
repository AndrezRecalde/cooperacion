import { useEffect, useState } from "react";
import {
    createStyles,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    rem,
} from "@mantine/core";
import {
    IconLogout,
    IconSettings,
    IconChevronDown,
} from "@tabler/icons-react";

import { useAuthStore } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    mainSection: {
        padding: theme.spacing.sm,
    },

    user: {
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: "background-color 100ms ease",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[1],
        },

        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
}));

export function User() {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { startProfile, startLogout } = useAuthStore();
    let usuario = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        startProfile();
    }, []);

    const navigate = useNavigate();

    const iniciales = () => {
        let n = usuario?.nombres?.slice(0,1);
        let a = usuario?.apellidos?.slice(0,1);
        return n + a;
    }

    const changePassword = () => {
        navigate("/admin/change-password");
    }

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            offset={-1}
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                >
                    <Group spacing={7}>
                        <Avatar radius="xl" color="teal" alt={usuario?.apellidos} >{iniciales()}</Avatar>
                        <div style={{ flex: 1 }}>
                            <Text
                                weight={500}
                                size="sm"
                                sx={{ lineHeight: 1 }}
                                mr={3}
                            >
                                {usuario?.nombres + " " + usuario?.apellidos}
                            </Text>
                            <Text fz="xs" c="dimmed" mr={3}>
                                {usuario?.email}
                            </Text>
                        </div>
                        <IconChevronDown size={rem(14)} stroke={1.8} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Configuración</Menu.Label>
                <Menu.Item onClick={changePassword} icon={<IconSettings size="1rem" stroke={1.8} />}>
                    Cambiar contraseña
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Desconectarse</Menu.Label>
                <Menu.Item
                    onClick={startLogout}
                    icon={
                        <IconLogout
                            size="1rem"
                            stroke={1.8}
                            color={theme.colors.red[6]}
                        />
                    }
                >
                    Cerrar Sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
