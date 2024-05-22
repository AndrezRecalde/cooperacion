/* Authentication */
import { AuthForm } from "./auth/AuthForm";

/* Elements */
import { DivHeader } from "./elements/DivHeader";
import { FloatAddButton } from "./elements/FloatAddButton";
import { FloatButton } from "./elements/FloatButton";
import { FloatOrgButton } from "./elements/FloatOrgButton";
import { InfoHeader } from "./elements/InfoHeader";
import { FloatChartBtn } from "./elements/FloatChartBtn";
import { BtnAdd } from "./elements/BtnAdd";
import { MenuActionsAdmin } from "./elements/action/MenuActionsAdmin";
import { TitleSections } from "./elements/TitleSections";
import { AlertSection } from "./elements/AlertSection";
import { TitlePage } from "./elements/TitlePage";
import { Logo } from "./elements/Logo";
import { BtnSubmit } from "./elements/BtnServices";
import { LoaderCustom } from "./elements/LoaderCustom";

/* Dashboard */
import { ChartObjetivos } from "./dashboard/charts/ChartObjetivos";
import { ChartTipos } from "./dashboard/charts/ChartTipos";
import { ChartModalidad } from "./dashboard/charts/ChartModalidad";
import { StatMontoEjecutado } from "./dashboard/stats/StatMontoEjecutado";
import { StatMontoPartida } from "./dashboard/stats/StatMontoPartida";
import { StatProyecto } from "./dashboard/stats/StatProyecto";
import { StatOrganizacion } from "./dashboard/stats/StatOrganizacion";

/* Mapa */
import { DrawerMenu } from "./mapa/menu/DrawerMenu";
import { CardOrganizacion } from "./mapa/organizacion/CardOrganizacion";
import { DrawerOrg } from "./mapa/organizacion/DrawerOrg";
import { DrawerProyecto } from "./mapa/proyecto/DrawerProyecto";
import { ModalInformation } from "./mapa/proyecto/ModalInformation";
import { ModalCharts } from "./mapa/chart/ModalCharts";
import { ViewGraphics } from "./mapa/chart/ViewGraphics";


/* Organizaciones */
import { ModalActivateOrg } from "./organizaciones/activar/ModalActivateOrg";
import { FormActivarOrg } from "./organizaciones/activar/form/FormActivarOrg";
import { CardShowOrganizacion } from "./organizaciones/card/CardShowOrganizacion";
import { ChartShowOrganizacion } from "./organizaciones/chart/ChartShowOrganizacion";
import { DotButton } from "./organizaciones/table/DotButton";
import { TableOrganizaciones } from "./organizaciones/table/TableOrganizaciones";
import { ActionsOrganizacion } from "./organizaciones/table/action/ActionsOrganizacion";
import { DetailPanelOrganizacion } from "./organizaciones/table/panel/DetailPanelOrganizacion";

import { FormOrganizacion } from "./organizaciones/FormOrganizacion";
import { ModalOrganizacion } from "./organizaciones/ModalOrganizacion";
import { ModalShowOrganizacion } from "./organizaciones/ModalShowOrganizacion";

import { ModalEliminarOrg } from "./organizaciones/eliminar/ModalEliminarOrg";
import { FormEliminarOrg } from "./organizaciones/eliminar/FormEliminarOrg";

/* Proyectos */
import { TableProyectos } from "./proyectos/table/TableProyectos";
import { ActionsProyecto } from "./proyectos/table/action/ActionsProyecto";
import { DetailPanelProyecto } from "./proyectos/table/panel/DetailPanelProyecto";

import { ActivateButton } from "./proyectos/activar/ActivateButton";
import { ModalActivateProyecto } from "./proyectos/activar/ModalActivateProyecto";
import { FormActivar } from "./proyectos/activar/form/FormActivar";

import { FormEliminar } from "./proyectos/eliminar/FormEliminar";
import { ModalEliminarProyecto } from "./proyectos/eliminar/ModalEliminarProyecto";

import { ModalProyecto } from "./proyectos/formulario/ModalProyecto";
import { FormStepper } from "./proyectos/formulario/stepper/FormStepper";
import { EjeStepper } from "./proyectos/formulario/stepper/eje/EjeStepper";
import { InfoStepper } from "./proyectos/formulario/stepper/informacion/InfoStepper";
import { UbicacionStepper } from "./proyectos/formulario/stepper/ubicacion/UbicacionStepper";

/* Usuarios */
import { UserButton } from "./user/UserButton";
import { ModalUsuario } from "./user/ModalUsuario";
import { FormUsuario } from "./user/form/FormUsuario";
import { TableUsuarios } from "./user/table/TableUsuarios";
import { ModalActivateUser } from "./user/activar/ModalActivateUser";
import { FormActivarUsuario } from "./user/activar/form/FormActivarUsuario";
import { ActivateUserButton } from "./user/activar/ActivateUserButton";

/* Modalidades */
import { ModalModalidad } from "./modalidades/ModalModalidad";
import { FormModalidad } from "./modalidades/form/FormModalidad";
import { TableModalidades } from "./modalidades/table/TableModalidades";

/* Referencias Internacionales */
import { ModalRefInter } from "./referencias/ModalRefInter";
import { FormRefInter } from "./referencias/form/FormRefInter";
import { TableRefInter } from "./referencias/table/TableRefInter";

/* Tipos */
import { ModalTipo } from "./tipo/ModalTipo";
import { FormTipo } from "./tipo/form/FormTipo";
import { TableTipos } from "./tipo/table/TableTipos";

/* Tipos de cooperacion */
import { ModalTipoCoop } from "./tipos_cooperaciones/ModalTipoCoop";
import { FormTipoCoop } from "./tipos_cooperaciones/form/FormTipoCoop";
import { TableTiposCoop } from "./tipos_cooperaciones/table/TableTiposCoop";


/* Afiliacion */
import { ActivateAfilButton } from "./afiliacion/contactar/ActivateAfilButton";
import { FormContactar } from "./afiliacion/form/FormContactar";
import { FormAfiliacion } from "./afiliacion/form/FormAfiliacion";
import { DetailPanelAfiliacion } from "./afiliacion/table/panel/DetailPanelAfiliacion";
import { ModalContactado } from "./afiliacion/contactar/ModalContactado";
import { TableAfiliaciones } from "./afiliacion/table/TableAfiliaciones";

export {
    DivHeader,
    FloatAddButton,
    FloatButton,
    FloatOrgButton,
    InfoHeader,
    FloatChartBtn,
    BtnAdd,
    MenuActionsAdmin,
    TitleSections,
    AlertSection,
    TitlePage,
    Logo,
    BtnSubmit,
    LoaderCustom,

    ChartObjetivos,
    ChartTipos,
    ChartModalidad,
    StatMontoEjecutado,
    StatMontoPartida,
    StatProyecto,
    StatOrganizacion,

    DrawerMenu,
    CardOrganizacion,
    DrawerOrg,
    DrawerProyecto,
    ModalInformation,
    ModalCharts,
    ViewGraphics,

    ModalActivateOrg,
    FormActivarOrg,
    CardShowOrganizacion,
    ChartShowOrganizacion,
    DotButton,
    TableOrganizaciones,
    ActionsOrganizacion,
    DetailPanelOrganizacion,
    FormOrganizacion,
    ModalOrganizacion,
    ModalShowOrganizacion,
    ModalEliminarOrg,
    FormEliminarOrg,

    TableProyectos,
    ActionsProyecto,
    DetailPanelProyecto,
    ActivateButton,
    ModalActivateProyecto,
    FormActivar,
    FormEliminar,
    ModalEliminarProyecto,
    ModalProyecto,
    FormStepper,
    EjeStepper,
    InfoStepper,
    UbicacionStepper,


    UserButton,
    ModalUsuario,
    FormUsuario,
    TableUsuarios,
    ModalActivateUser,
    FormActivarUsuario,
    ActivateUserButton,

    ModalModalidad,
    FormModalidad,
    TableModalidades,

    ModalRefInter,
    FormRefInter,
    TableRefInter,

    ModalTipo,
    FormTipo,
    TableTipos,

    ModalTipoCoop,
    FormTipoCoop,
    TableTiposCoop,

    AuthForm,

    ActivateAfilButton,
    FormContactar,
    FormAfiliacion,
    DetailPanelAfiliacion,
    ModalContactado,
    TableAfiliaciones
};
