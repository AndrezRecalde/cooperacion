import { useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { TitleSections, FormStepper } from "../../../components";
import {
    useUiProyecto,
    usePeriodoStore,
    useOrganizacionStore,
    useStateStore,
    useTipoCoopStore,
    useOdsStore,
    useModalidadStore,
    useEstadoStore,
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
            monto: 0,
            contrapartida: 0,
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
            odsostenible_id: isNotEmpty(
                "Por favor ingrese el Objetivo Sostenible"
            ),
            modalidad_id: isNotEmpty(
                "Por favor ingrese la modalidad de cooperación"
            ),
            /* monto: isNotEmpty("Por favor ingrese el monto del proyecto"),
            contrapartida: isNotEmpty(
                "Por favor ingrese el monto de la contrapartida"
            ), */
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

    const handleCloseModal = () => {
        form.reset();
        modalActionProyecto(0);
    };

    return (
        <Modal
            opened={isOpenModalProyecto}
            onClose={handleCloseModal}
            title={<TitleSections title="Proyecto" fw={700} fz="sm" />}
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
