import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { MainHeader, NavbarSegmented } from "../../layouts";

export const HomePage = ({ children }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={<NavbarSegmented opened={opened} />}
            header={<MainHeader opened={opened} setOpened={setOpened} />}
        >
            {children}
        </AppShell>
    );
};
