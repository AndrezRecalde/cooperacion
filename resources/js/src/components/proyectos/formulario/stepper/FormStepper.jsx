import { useEffect, useState } from "react";
import { Badge, Button, Group, Stepper } from "@mantine/core";
import { EjeStepper, InfoStepper, UbicacionStepper } from "../../../../components";
import { useProyectoStore, useUiProyecto } from "../../../../hooks";
import {
    IconBrandTelegram,
    IconChevronsLeft,
    IconChevronsRight,
    IconInfoCircle,
} from "@tabler/icons-react";

export const FormStepper = ({ form }) => {
    const [active, setActive] = useState(0);
    const { startAddProyectos, activateProyecto } = useProyectoStore();
    const { modalActionProyecto } = useUiProyecto();

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

    const nextStep = () => {
        const { errors } = form.validate();
        switch (active) {
            case 0:
                if (
                    errors.hasOwnProperty("periodo_id") ||
                    errors.hasOwnProperty("organizacion_id") ||
                    errors.hasOwnProperty("nombre_proyecto") ||
                    errors.hasOwnProperty("cooperacion_id") ||
                    errors.hasOwnProperty("objetivo_general")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) =>
                        current < 3 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            case 1:
                if (
                    errors.hasOwnProperty("canton_id") ||
                    errors.hasOwnProperty("grupo_atencion_id") ||
                    errors.hasOwnProperty("beneficiados_directos")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) =>
                        current < 3 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            case 2:
                if (
                    errors.hasOwnProperty("odsostenible_id") ||
                    errors.hasOwnProperty("modalidad_id") ||
                    errors.hasOwnProperty("monto") ||
                    errors.hasOwnProperty("estado_id")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) =>
                        current < 3 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            default:
                break;
        }
    };

    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddProyectos(form.values);
        form.reset();
        modalActionProyecto(0);
    };

    return (
        <>
            <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                color="teal"
                p={10}
            >
                <Stepper.Step
                    label="Primer Paso"
                    description="Información del Proyecto"
                    allowStepSelect={active > 0}
                    allowStepClick={false}
                >
                    <InfoStepper form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Segundo Paso"
                    description="Ubicación del Proyecto"
                    allowStepSelect={active > 1}
                    allowStepClick={false}
                >
                    <UbicacionStepper form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Paso final"
                    description="Envíar formulario"
                    allowStepSelect={active > 0}
                    allowStepClick={false}
                >
                    <EjeStepper form={form} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Group position="center" mt="md">
                        Gracias por Completar el Formulario con la información
                        correspondiente, Por favor
                        <Badge
                            size="lg"
                            radius="xl"
                            color="teal"
                            leftSection={<IconInfoCircle size={18} />}
                        >
                            Presiona el botón "enviar formulario"
                        </Badge>{" "}
                        para finalizar con éxito.
                    </Group>
                </Stepper.Completed>
            </Stepper>
            {active === 3 ? (
                <Group position="center" mt="xl">
                    <Button
                        variant="default"
                        color="green"
                        onClick={prevStep}
                        leftIcon={<IconChevronsLeft size="1rem" />}
                    >
                        Regresar
                    </Button>
                    <Button
                        variant="gradient"
                        gradient={{ from: "teal", to: "lime", deg: 105 }}
                        color="green"
                        radius="md"
                        leftIcon={<IconBrandTelegram />}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Enviar Formulario
                    </Button>
                </Group>
            ) : (
                <Group position="center" mt="xl">
                    <Button
                        variant="default"
                        onClick={prevStep}
                        leftIcon={<IconChevronsLeft size="1rem" />}
                    >
                        Regresar
                    </Button>
                    <Button
                        color="teal"
                        onClick={nextStep}
                        rightIcon={<IconChevronsRight size="1rem" />}
                    >
                        Siguiente
                    </Button>
                </Group>
            )}
        </>
    );
};
