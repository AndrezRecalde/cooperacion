import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { AppRouter } from "./routes/AppRouter";
import { useState } from "react";

export const App = () => {
    const [colorScheme, setColorScheme] = useState("light");
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <Provider store={store}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{
                        colorScheme,
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                        fontFamilyMonospace: "Monaco, Courier, monospace",
                        headings: { fontFamily: "Greycliff CF, sans-serif" },
                    }}
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </MantineProvider>
            </ColorSchemeProvider>
        </Provider>
    );
};
