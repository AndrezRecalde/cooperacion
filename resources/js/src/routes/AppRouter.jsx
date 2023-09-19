import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { MapaPage } from "../pages/mapa/MapaPage";
import { AuthenticationPage } from "../pages/auth/AuthenticationPage";
import { PrivateRoute } from "./private/PrivateRoute";
import { PrivatePages } from "./private/PrivatePages";
import { useAuthStore } from "../hooks";
import { PublicRoute } from "./public/PublicRoute";
import { AfiliacionPage } from "../pages/afiliacion/AfiliacionPage";

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore();
    const token = localStorage.getItem("atf_token");

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <Routes>
            <Route path="/cooperacion" element={<MapaPage />} />

            <Route path="/afiliacion" element={<AfiliacionPage />} />


            <Route
                path="/auth/login/*"
                element={
                    <PublicRoute token={token}>
                        <Routes>
                            <Route path="/*" element={<AuthenticationPage />} />
                        </Routes>
                    </PublicRoute>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoute token={token}>
                        <PrivatePages />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
