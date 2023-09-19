import { useState } from "react";
import {
    Navbar,
    SegmentedControl,
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
import { useAuthStore } from "../../hooks";
import { IconMapPinShare } from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";

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
                : theme.colors.gray[7],
        marginRight: theme.spacing.md,
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
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

const tabs = {
    system: [
        {
            label: "Dashboard",
            icon: IconChartPie,
            links: [{ label: "Dashboard", link: "/" }],
        },

        {
            label: "Afiliaciones",
            icon: IconNotebook,
            links: [{ label: "Ver afiliaciones", link: "/admin/afiliados" }],
        },

        {
            label: "Organizaciones",
            icon: IconWorldCheck,
            initiallyOpened: true,
            links: [
                { label: "Ver organizaciones", link: "/admin/organizaciones" },
            ],
        },

        {
            label: "Proyectos",
            icon: IconFolderCheck,
            initiallyOpened: true,
            links: [{ label: "Ver proyectos", link: "/admin/proyectos" }],
        },
    ],
    settings: [
        {
            label: "Usuarios",
            icon: IconUsers,
            links: [{ label: "Ver usuarios", link: "/admin/usuarios" }],
        },
        {
            label: "Tipos Cooperacion",
            icon: IconBinaryTree2,
            links: [
                { label: "Ver Tipos Coop", link: "/admin/tipos/cooperaciones" },
            ],
        },
        {
            label: "Modalidades",
            icon: IconListCheck,
            links: [
                { label: "Ver Modalidades", link: "/admin/tipos/modalidades" },
            ],
        },
        {
            label: "Tipos de Organización",
            icon: IconListDetails,
            links: [
                { label: "Ver Tipos Org", link: "/admin/tipos/organizaciones" },
            ],
        },
        {
            label: "Geolocalización",
            icon: IconMapPinShare,
            links: [
                {
                    label: "Ver Referencias",
                    link: "/admin/referencias/internacionales",
                },
            ],
        },
    ],
};

export function NavbarSegmented({ opened }) {
    const { classes } = useStyles();
    const [section, setSection] = useState(Object.keys(tabs)[0]);

    const { startLogout } = useAuthStore();

    const links = tabs[section].map((item) => (
        <LinksGroup {...item} key={item.label} />
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
                <a href="#" className={classes.link} onClick={startLogout}>
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
