import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddOrganizacion,
    onClearOrganizaciones,
    onClearTotalesOrg,
    onErrores,
    onLoading,
    onOrganizaciones,
    onSetActivateOrganizacion,
    onSetTotalOrganizaciones,
    onUpdateOrganizacion,
} from "../../store/admin/organizacion/organizacionSlice";
import Swal from "sweetalert2";

export const useOrganizacionStore = () => {
    const {
        errores,
        isLoading,
        organizaciones,
        totalOrganizaciones,
        activateOrganizacion,
    } = useSelector((state) => state.organizacion);
    const dispatch = useDispatch();

    const starLoadOrganizaciones = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/organizaciones");
            const { organizaciones } = data;
            dispatch(onOrganizaciones(organizaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadOrgActivas = async () => {
        try {
            const { data } = await gricApi.get("/organizaciones/activas");
            const { organizaciones } = data;
            dispatch(onOrganizaciones(organizaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startShowOrganizacion = async (id) => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get(`/show/organizacion/${id}`);
            const { organizacion } = data;
            dispatch(onSetActivateOrganizacion(organizacion));
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddOrganizacion = async (organizacion) => {
        try {
            if (organizacion.id) {
                const { data } = await gricApi.put(
                    `/admin/update/organizacion/${organizacion.id}`,
                    organizacion
                );
                dispatch(onUpdateOrganizacion({ ...organizacion }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                starLoadOrganizaciones();
                return;
            }
            const { data } = await gricApi.post(
                "/admin/create/organizacion",
                organizacion
            );
            dispatch(onAddOrganizacion({ ...organizacion }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            starLoadOrganizaciones();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startShowForEdit = async ({ id }) => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get(
                `/admin/show/edit/organizacion/${id}`
            );
            const { organizacion } = data;
            dispatch(onSetActivateOrganizacion({ ...organizacion }));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteOrganizacion = async (organizacion) => {
        Swal.fire({
            icon: "warning",
            title: `Estas seguro de eliminar ${organizacion.nombre_organizacion}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await gricApi.delete(
                        `/admin/delete/organizacion/${organizacion.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    starLoadOrganizaciones();
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response ? error.response.data.msg : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const setActivateOrganizacion = (organizacion) => {
        dispatch(
            onSetActivateOrganizacion({
                ...organizacion,
            })
        );
    };

    const startTotalOrganizaciones = async () => {
        try {
            const { data } = await gricApi.get("/total/organizaciones");

            if (data.msg) {
                dispatch(onErrores(data.msg));
            } else {
                const { totalOrganizaciones } = data;
                dispatch(onSetTotalOrganizaciones(totalOrganizaciones));
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setClearTotalesOrg = () => {
        dispatch(onClearTotalesOrg());
    };

    const setClearActivateOrganizacion = () => {
        dispatch(onSetActivateOrganizacion(null));
    };

    const startClearOrganizaciones = () => {
        dispatch(onClearOrganizaciones());
    };

    const startUpdateConvenioOrg = async (organizacion) => {
        console.log(organizacion);
        try {
            const { data } = await gricApi.put(
                `/admin/update/organizacion/convenio/${organizacion.id}`,
                organizacion
            );
            dispatch(onUpdateOrganizacion({ ...organizacion }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            starLoadOrganizaciones();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const exportExcelOrganizaciones = async () => {
        try {
            const response = await gricApi.get(
                "/admin/export/excel/organizaciones",
                { responseType: "blob" }
            );
            console.log(response)
            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8",
                })
            );
            console.log(url)
            window.open(url, "_blank");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    return {
        errores,
        isLoading,
        organizaciones,
        totalOrganizaciones,
        activateOrganizacion,

        starLoadOrganizaciones,
        startLoadOrgActivas,
        startShowOrganizacion,
        startAddOrganizacion,
        startShowForEdit,
        startDeleteOrganizacion,
        setActivateOrganizacion,
        setClearActivateOrganizacion,
        startClearOrganizaciones,
        startTotalOrganizaciones,
        setClearTotalesOrg,
        startUpdateConvenioOrg,
        exportExcelOrganizaciones
    };
};
