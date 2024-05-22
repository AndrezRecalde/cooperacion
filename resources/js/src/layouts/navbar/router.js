import {
    IconUsers,
    IconFolderCheck,
    IconWorldCheck,
    IconChartPie,
    IconBinaryTree2,
    IconListCheck,
    IconListDetails,
    IconNotebook,
    IconMapPinShare
} from "@tabler/icons-react";

export const tabs = {
    system: [
        {
            label: "Dashboard",
            icon: IconChartPie,
            initiallyOpened: true,
            links: [{ label: "Dashboard", link: "/" }],
        },

        {
            label: "Afiliaciones",
            icon: IconNotebook,
            initiallyOpened: true,
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
