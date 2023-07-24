import { useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { DivTitle, FormStepper } from "../../../components";
import {
    useUiProyecto,
    usePeriodoStore,
    useOrganizacionStore,
    useStateStore,
    useTipoCoopStore,
    useOdsStore,
    useModalidadStore,
    useEstadoStore,
    useProyectoStore,
    useGrupoAtencionStore,
} from "../../../hooks";

export const ModalProyecto = () => {
    const theme = useMantineTheme();
    const { startLoadPeriodos } = usePeriodoStore();
    const { startLoadOrgActivas } = useOrganizacionStore();
    const { startLoadCantones } = useStateStore();
    const { starLoadTiposCoopActivos } = useTipoCoopStore();
    const { starLoadObjetivos } = useOdsStore();
    const { startLoadModalidadesActivas } = useModalidadStore();
    const { startLoadEstadosActivos } = useEstadoStore();
    const { activateProyecto } = useProyectoStore();
    const { isOpenModalProyecto, modalActionProyecto } = useUiProyecto();
    const { startLoadGruposAtencion } = useGrupoAtencionStore();

    const form = useForm({
        initialValues: {
            periodo_id: "",
            organizacion_id: "",
            nombre_proyecto: "",
            objetivo_general: "",
            canton_id: [],
            grupo_atencion_id: [],
            beneficiados_directos: "",
            beneficiados_indirectos: "",
            odsostenible_id: [],
            cooperacion_id: "",
            modalidad_id: "",
            monto: "",
            estado_id: "",
        },
        validate: {
            organizacion_id: isNotEmpty("Por favor ingresa la organización"),
            nombre_proyecto: hasLength(
                { min: 5 },
                "Por favor ingrese el nombre de proyecto"
            ),
            cooperacion_id: isNotEmpty(
                "Por favor ingrese el tipo de cooperación"
            ),
            objetivo_general: hasLength(
                { min: 10 },
                "El objetivo general debe ser más amplio"
            ),

            canton_id: isNotEmpty("Por favor elija el cantón"),
            grupo_atencion_id: isNotEmpty(
                "Por favor seleccione un grupo de atención"
            ),
            beneficiados_directos: isNotEmpty(
                "Por favor ingrese el grupo beneficiado"
            ),
            beneficiados_indirectos: isNotEmpty(
                "Por favor ingrese el total de beneficiados"
            ),

            odsostenible_id: isNotEmpty(
                "Por favor ingrese el Objetivo Sostenible"
            ),
            modalidad_id: isNotEmpty(
                "Por favor ingrese la modalidad de cooperación"
            ),
            monto: isNotEmpty("Por favor ingrese el monto del proyecto"),
            estado_id: isNotEmpty(
                "Por favor el estado en el que se encuentra el proyecto"
            ),
        },
    });

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
        if (activateProyecto !== null) {
            form.setValues({
                ...activateProyecto,
                monto: parseFloat(activateProyecto.monto),
                canton_id: activateProyecto.cantones.map((canton) => canton.id),
                grupo_atencion_id: activateProyecto.grupos.map(
                    (grupo) => grupo.id
                ),
                odsostenible_id: activateProyecto.odsostenibles.map(
                    (ods) => ods.id
                ),
            });
            return;
        }
    }, [activateProyecto]);

    const handleCloseModal = () => {
        form.reset();
        modalActionProyecto(0);
    };

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
