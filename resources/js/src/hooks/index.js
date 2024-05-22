/* Autenticacion */
import { useAuthStore } from "./auth/useAuthStore";

/* Dashboard */
import { useDashboardStore } from "./dashboard/useDashboardStore";

/* Usuario */
import { useUsuarioStore } from "./usuario/useUsuarioStore";
import { useUiUsuario } from "./usuario/useUiUsuario";

/* Tipos de Convenio */
import { useConvenioStore } from "./convenio/useConvenioStore";


/* Estados de un proyecto */
import { useEstadoStore } from "./estados/useEstadoStore";


/* UI del Mapa */
import { useUiMapa } from "./mapa/useUiMapa";
import { useMarkerStore } from "./marker/useMarkerStore";


/* Tipos de Modalidades de un Proyecto */
import { useModalidadStore } from "./modalidad/useModalidadStore";
import { useUiModalidad } from "./modalidad/useUiModalidad";

/* Objetivos de Desarrollo Sostenible */
import { useOdsStore } from "./ods/useOdsStore";


/* Organizaciones */
import { useUiOrganizacion } from "./organizacion/useUiOrganizacion";
import { useOrganizacionStore } from "./organizacion/useOrganizacionStore";


/* Proyecto */
import { useUiProyecto } from "./proyecto/useUiProyecto";
import { useProyectoStore } from "./proyecto/useProyectoStore";

/* Estados o Naciones */
import { useStateStore } from "./state/useStateStore";

/* Tipos de Organizacion */
import { useTipoStore } from "./tipo/useTipoStore";
import { useUiTipo } from "./tipo/useUiTipo";


/* Tipos de cooperacion */
import { useTipoCoopStore } from "./tipo_cooperacion/useTipoCoopStore";
import { useUiTipoCoop } from "./tipo_cooperacion/useUiTipoCoop";

/* Grupo de Atencion Prioritaria */
import { useGrupoAtencionStore } from "./grupo_atencion/useGrupoAtencionStore";

/* Periodos */
import { usePeriodoStore } from "./periodo/usePeriodoStore";

/* Referencias */
import { useInternacionalStore } from "./referencia/internacional/useInternacionalStore";
import { useUiInternacional } from "./referencia/internacional/useUiInternacional";

/* Institucion */
import { useInstitucionStore } from "./institucion/useInstitucionStore";

/* Roles */
import { useRoleStore } from "./role/useRoleStore";

/* Afiliacion */
import { useAfiliacionStore } from "./afiliacion/useAfiliacionStore";
import { useUiAfiliacion } from "./afiliacion/useUiAfiliacion";


/* ERROR */
import { useErrorException } from "./error/useErrorException";

export {
    useAuthStore,

    useDashboardStore,

    useUsuarioStore,
    useUiUsuario,

    useConvenioStore,

    useEstadoStore,

    useUiMapa,
    useMarkerStore,

    useModalidadStore,
    useUiModalidad,

    useOdsStore,

    useUiOrganizacion,
    useOrganizacionStore,

    useUiProyecto,
    useProyectoStore,

    useStateStore,

    useTipoStore,
    useUiTipo,

    useTipoCoopStore,
    useUiTipoCoop,

    useGrupoAtencionStore,

    usePeriodoStore,

    useInternacionalStore,
    useUiInternacional,

    useInstitucionStore,

    useRoleStore,

    useAfiliacionStore,
    useUiAfiliacion,

    useErrorException
}
