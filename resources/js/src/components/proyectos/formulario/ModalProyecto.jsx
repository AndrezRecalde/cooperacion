import { Modal, useMantineTheme } from "@mantine/core";
import { DivTitle } from "../../elements/DivTitle";
import { useUiProyecto } from "../../../hooks/proyecto/useUiProyecto";
import { FormStepper } from "./stepper/FormStepper";
import { usePeriodoStore } from "../../../hooks/periodo/usePeriodoStore";
import { useOrganizacionStore } from "../../../hooks/organizacion/useOrganizacionStore";
import { useStateStore } from "../../../hooks/state/useStateStore";
import { useTipoCoopStore } from "../../../hooks/tipo_cooperacion/useTipoCoopStore";
import { useOdsStore } from "../../../hooks/ods/useOdsStore";
import { useModalidadStore } from "../../../hooks/modalidad/useModalidadStore";
import { useEstadoStore } from "../../../hooks/estados/useEstadoStore";
import { useProyectoStore } from "../../../hooks/proyecto/useProyectoStore";
import { useGrupoAtencionStore } from "../../../hooks/grupo_atencion/useGrupoAtencionStore";
import { useEffect } from "react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

export const ModalProyecto = () => {
     const theme = useMantineTheme();

     const { startLoadPeriodos } = usePeriodoStore();
     const { startLoadOrgActivas, startClearOrganizaciones } = useOrganizacionStore();
     const { starClearStates, startLoadCantones, startLoadParroquias, startLoadRecintos, } = useStateStore();
     const { starLoadTiposCoopActivos, startClearTiposCoop } = useTipoCoopStore();
     const { starLoadObjetivos, startClearObjetivos } = useOdsStore();
     const { startLoadModalidadesActivas, startClearModalidades } = useModalidadStore();
     const { startLoadEstadosActivos, startClearEstados } = useEstadoStore();
     const { activateProyecto, setClearActivateProyecto } = useProyectoStore();
     const { isOpenModalProyecto, modalActionProyecto } = useUiProyecto();
     const { startLoadGruposAtencion } = useGrupoAtencionStore();


     const form = useForm({
         initialValues: {
             periodo_id: "",
             organizacion_id: "",
             nombre_proyecto: "",
             objetivo_general: "",
             canton_id: "",
             parroquia_id: "",
             recinto_id: "",
             grupo_atencion_id: [],
             grupo_beneficiado: "",
             total_beneficiados: "",
             odsostenible_id: [],
             cooperacion_id: "",
             modalidad_id: "",
             monto: "",
             estado_id: ""
         },
         validate: {
             organizacion_id: isNotEmpty("Por favor ingresa la organización"),
             nombre_proyecto: hasLength({ min: 5 }, "Por favor ingrese el nombre de proyecto"),
             cooperacion_id: isNotEmpty("Por favor ingrese el tipo de cooperación"),
             objetivo_general: hasLength({ min: 10}, "El objetivo general debe ser más amplio"),

             canton_id: isNotEmpty("Por favor elija el cantón"),
             parroquia_id: isNotEmpty("Por favor elija la parroquia"),
             recinto_id: isNotEmpty("Por favor elija el recinto"),
             grupo_atencion_id: isNotEmpty("Por favor seleccione un grupo de atención"),
             grupo_beneficiado: isNotEmpty("Por favor ingrese el grupo beneficiado"),
             total_beneficiados: isNotEmpty("Por favor ingrese el total de beneficiados"),

             odsostenible_id: isNotEmpty("Por favor ingrese el Objetivo Sostenible"),
             modalidad_id: isNotEmpty("Por favor ingrese la modalidad de cooperación"),
             monto: isNotEmpty("Por favor ingrese el monto del proyecto"),
             estado_id: isNotEmpty("Por favor el estado en el que se encuentra el proyecto")
         }
     });

     const { canton_id, parroquia_id } = form.values;

     useEffect(() => {
         startLoadPeriodos();
         startLoadOrgActivas();
         startLoadCantones();
         startLoadGruposAtencion();
         starLoadTiposCoopActivos();
         starLoadObjetivos();
         startLoadModalidadesActivas();
         startLoadEstadosActivos();
         /* return () => {
             startClearOrganizaciones();
             starClearStates();
             startClearTiposCoop();
             startClearObjetivos();
             startClearModalidades();
             startClearEstados();
           } */
     }, []);

     useEffect(() => {
       setClearActivateProyecto();
       form.setFieldValue("parroquia_id", activateProyecto?.parroquia_id ?? "");
       startLoadParroquias(canton_id);
     }, [canton_id]);

     useEffect(() => {
       form.setFieldValue("recinto_id", activateProyecto?.recinto_id ?? "");
       startLoadRecintos(parroquia_id);
     }, [parroquia_id]);

     useEffect(() => {
       if(activateProyecto !== null) {
         form.setValues({
             ...activateProyecto,
             monto: parseFloat(activateProyecto.monto),
             grupo_atencion_id: activateProyecto.grupos.map( grupo => grupo.id),
             odsostenible_id: activateProyecto.odsostenibles.map( ods => ods.id)
         });
         return;
       }
     }, [activateProyecto]);

     const handleCloseModal = () => {
        form.reset();
        modalActionProyecto(0);
     }


    return (
        <Modal
            opened={isOpenModalProyecto}
            onClose={handleCloseModal}
            title={<DivTitle title="Proyecto" fw={700} fz="sm" />}
            overlayProps={{
                color:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            size="xl"
            closeOnClickOutside={false}
            closeOnEscape={false}
            radius="md"
        >
            <FormStepper form={form} />
        </Modal>
    );
};
