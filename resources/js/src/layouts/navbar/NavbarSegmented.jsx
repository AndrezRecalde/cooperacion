import { useEffect, useState } from "react";
import {
    Navbar,
    SegmentedControl,
    Text,
    createStyles,
    getStylesRef,
    rem,
    ScrollArea,
} from "@mantine/core";
import {
    IconUsers,
    IconLogout,
    IconBuildingBank,
    IconFolderCheck,
    IconWorldCheck,
    IconChartPie,
    IconBinaryTree2,
    IconListCheck,
    IconListDetails,
    IconNotebook,
} from "@tabler/icons-react";
import { UserButton } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks/auth/useAuthStore";
import { IconMapPinShare } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        paddingTop: 0,
    },

    title: {
        textTransform: "uppercase",
        letterSpacing: rem(-0.25),
    },

    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,

            [`& .${getStylesRef("icon")}`]: {
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
            [`& .${getStylesRef("icon")}`]: {
                color: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                }).color,
            },
        },
    },

    footer: {
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
        paddingTop: theme.spacing.md,
    },
}));

const tabs = {
    system: [
        { link: "/", label: "Dashboard", icon: IconChartPie },
        { link: "/admin/afiliados", label: "Afiliaciones", icon: IconNotebook },
        {
            link: "/admin/organizaciones",
            label: "Organizaciones",
            icon: IconWorldCheck,
        },
        { link: "/admin/proyectos", label: "Proyectos", icon: IconFolderCheck },
    ],
    settings: [
        { link: "/admin/usuarios", label: "Usuarios", icon: IconUsers },
        { link: "/admin/tipos/cooperaciones", label: "Tipos Cooperacion", icon: IconBinaryTree2 },
        { link: "/admin/tipos/modalidades", label: "Modalidades", icon: IconListCheck },
        { link: "/admin/tipos/organizaciones", label: "Tipos de Organización", icon: IconListDetails },
        { link: "/admin/referencias/internacionales", label: "Referencias Internacionales", icon: IconMapPinShare },

    ],
};

export function NavbarSegmented({ opened }) {
    const { classes, cx } = useStyles();
    const currentLocation = useLocation();
    const [section, setSection] = useState(Object.keys(tabs)[0]);
    const [active, setActive] = useState(tabs.system[0].label);

    const { startLogout } = useAuthStore();

    const capitalize = (word) => {
       if(word === ""){
            let path = word + "dashboard";
            return path[0].toUpperCase() + path.slice(1);
       }
        return word[0].toUpperCase() + word.slice(1);
    };

    useEffect(() => {
        let param = currentLocation.pathname.substring(1);
        setActive(capitalize(param));
    }, []);

    const links = tabs[section].map((item) => (
        <Text
            component={Link}
            variant="link"
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            to={item.link}
            key={item.label}
            onClick={() => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Text>
    ));

    return (
        <Navbar
            height="auto"
            width={{ sm: 300, lg: 300 }}
            p="md"
            className={classes.navbar}
            hiddenBreakpoint="sm"
            hidden={!opened}
        >
            <Navbar.Section>
                <UserButton
                    icon={<IconBuildingBank size="1.5rem" stroke={2} />}
                />

                <SegmentedControl
                    value={section}
                    onChange={(value) => setSection(value)}
                    transitionTimingFunction="ease"
                    fullWidth
                    data={[
                        { label: "Sistema", value: "system" },
                        { label: "Configuración", value: "settings" },
                    ]}
                />
            </Navbar.Section>

            <Navbar.Section grow mt="xl" component={ScrollArea}>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a
                    href="#"
                    className={classes.link}
                    onClick={startLogout}
                >
                    <IconLogout
                        className={classes.linkIcon}
                        stroke={1.8}
                        color="red"
                    />
                    <span>Salir</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}
