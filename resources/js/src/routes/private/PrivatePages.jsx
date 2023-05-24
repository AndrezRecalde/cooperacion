import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { OrganizacionesPage } from "../../pages/organizaciones/OrganizacionesPage";
import { ProyectosPage } from "../../pages/proyectos/ProyectosPage";
import { HomePage } from "../../pages/home/HomePage";
import { UsuariosPage } from "../../pages/usuarios/UsuariosPage";
import { TiposCoopPage } from "../../pages/tipos_coop/TiposCoopPage";
import { ModalidadesPage } from "../../pages/modalidades/ModalidadesPage";
import { AfiliacionAdmin } from "../../pages/afiliacion/AfiliacionAdmin";
import { PasswordPage } from "../../pages/usuarios/PasswordPage";
import { TipoPage } from "../../pages/tipos/TipoPage";
import { InternacionalPage } from "../../pages/referencias/internacional/InternacionalPage";

export const PrivatePages = () => {
    return (
            <HomePage>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route
                        path="/admin/organizaciones"
                        element={<OrganizacionesPage />}
                    />
                    <Route path="/admin/proyectos" element={<ProyectosPage />} />

                    <Route path="/admin/usuarios" element={<UsuariosPage />} />

                    <Route path="/admin/tipos/cooperaciones" element={<TiposCoopPage />} />

                    <Route path="/admin/tipos/modalidades" element={<ModalidadesPage />} />

                    <Route path="/admin/afiliados" element={<AfiliacionAdmin />} />

                    <Route path="/admin/change-password" element={<PasswordPage />} />

                    <Route path="/admin/tipos/organizaciones" element={<TipoPage />} />

                    <Route path="/admin/referencias/internacionales" element={<InternacionalPage />} />



                </Routes>
            </HomePage>
    );
};
