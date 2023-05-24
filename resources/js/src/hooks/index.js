/* Tipos de Convenio */
import { useConvenioStore } from "./convenio/useConvenioStore";


/* Estados de un proyecto */
import { useEstadoStore } from "./estados/useEstadoStore";


/* UI del Mapa */
import { useUiMapa } from "./mapa/useUiMapa";
import { useMarkerStore } from "./marker/useMarkerStore";


/* Tipos de Modalidades de un Proyecto */
import { useModalidadStore } from "./modalidad/useModalidadStore";


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


/* Tipos de cooperacion */
import { useTipoCoopStore } from "./tipo_cooperacion/useTipoCoopStore";


export {
    useConvenioStore,

    useEstadoStore,

    useUiMapa,
    useMarkerStore,

    useModalidadStore,

    useOdsStore,

    useUiOrganizacion,
    useOrganizacionStore,

    useUiProyecto,
    useProyectoStore,

    useStateStore,

    useTipoStore,

    useTipoCoopStore
}
