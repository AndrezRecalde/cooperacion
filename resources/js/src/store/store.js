import { configureStore } from "@reduxjs/toolkit";
import { uiMapaSlice } from "./mapa/ui/uiMapaSlice";
import { uiOrganizacionSlice } from "./admin/organizacion/uiOrganizacionSlice";
import { organizacionSlice } from "./admin/organizacion/organizacionSlice";
import { stateSlice } from "./state/stateSlice";
import { uiProyecto } from "./admin/proyecto/uiProyecto";
import { tipoCooperacionSlice } from "./admin/tipo_cooperacion/tipoCooperacionSlice";
import { odsSlice } from "./admin/ods/odsSlice";
import { modalidadSlice } from "./admin/modalidad/modalidadSlice";
import { estadoSlice } from "./admin/estados/estadoSlice";
import { proyectoSlice } from "./admin/proyecto/proyectoSlice";
import { tipoSlice } from "./admin/tipos/tipoSlice";
import { markerSlice } from "./mapa/marker/markerSlice";
import { convenioSlice } from "./admin/convenio/convenioSlice";
import { authSlice } from "./auth/authSlice";
import { usuarioSlice } from "./admin/usuario/usuarioSlice";
import { uiUsuarioSlice } from "./admin/usuario/uiUsuarioSlice";
import { roleSlice } from "./admin/role/roleSlice";
import { institucionSlice } from "./admin/institucion/institucionSlice";
import { grupoAtencionSlice } from "./admin/grupo_atencion/grupoAtencionSlice";
import { uiTipoCoopSlice } from "./admin/tipo_cooperacion/uiTipoCoopSlice";
import { uiModalidadSlice } from "./admin/modalidad/uiModalidadSlice";
import { afiliacionSlice } from "./admin/afiliacion/afiliacionSlice";
import { uiAfiliacionSlice } from "./admin/afiliacion/uiAfiliacionSlice";
import { periodoSlice } from "./admin/periodo/periodoSlice";
import { uiPeriodoSlice } from "./admin/periodo/uiPeriodoSlice";
import { uiTipoSlice } from "./admin/tipos/uiTipoSlice";
import { internacionalSlice } from "./admin/referencia/internacional/internacionalSlice";
import { uiInternacionalSlice } from "./admin/referencia/internacional/uiInternacionalSlice";
import { dashboardSlice } from "./admin/dashboard/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        dashboard: dashboardSlice.reducer,
        usuario: usuarioSlice.reducer,
        uiUsuario: uiUsuarioSlice.reducer,
        ui: uiMapaSlice.reducer,
        state: stateSlice.reducer,
        uiOrganizacion: uiOrganizacionSlice.reducer,
        organizacion: organizacionSlice.reducer,
        uiProyecto: uiProyecto.reducer,
        proyecto : proyectoSlice.reducer,
        tipoCooperacion: tipoCooperacionSlice.reducer,
        uiTipoCoop: uiTipoCoopSlice.reducer,
        ods: odsSlice.reducer,
        modalidad: modalidadSlice.reducer,
        uiModalidad: uiModalidadSlice.reducer,
        estado: estadoSlice.reducer,
        tipo: tipoSlice.reducer,
        uiTipo: uiTipoSlice.reducer,
        marker: markerSlice.reducer,
        convenio: convenioSlice.reducer,
        role: roleSlice.reducer,
        institucion: institucionSlice.reducer,
        grupoAtencion: grupoAtencionSlice.reducer,
        afiliacion: afiliacionSlice.reducer,
        uiAfiliacion: uiAfiliacionSlice.reducer,
        periodo: periodoSlice.reducer,
        uiPeriodo: uiPeriodoSlice.reducer,
        internacional: internacionalSlice.reducer,
        uiInternacional: uiInternacionalSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
