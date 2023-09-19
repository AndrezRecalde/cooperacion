import { useDispatch, useSelector } from "react-redux";
import {
    onClearDashboard,
    onLoading,
    onLoadingErrores,
    onLoadingProyectosModalidad,
    onLoadingProyectosOds,
    onLoadingProyectosTipos,
    onLoadingTotalMontos,
    onLoadingTotalOrg,
    onLoadingTotalProyectos,
} from "../../store/admin/dashboard/dashboardSlice";
import Swal from "sweetalert2";
import gricApi from "../../api/gricApi";

export const useDashboardStore = () => {
    const {
        isLoading,
        totalOrganizaciones,
        totalProyectos,
        totalProyectosModalidades,
        totalProyectosOds,
        totalProyectosTipos,
        totalMontos,
        errores,
    } = useSelector((state) => state.dashboard);

    const dispatch = useDispatch();

    const startLoadingTotalOrganizaciones = async () => {
        try {
            const { data } = await gricApi.get("/admin/total/organizaciones");
            const { totalOrganizaciones } = data;
            dispatch(onLoadingTotalOrg(totalOrganizaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadingTotalProyectos = async () => {
        try {
            const { data } = await gricApi.get("/admin/total/proyectos");
            const { totalProyectos } = data;
            dispatch(onLoadingTotalProyectos(totalProyectos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadingProyectosModalidad = async () => {
        try {
            const { data } = await gricApi.get(
                "/admin/total/proyectos/modalidades"
            );
            if (data.status === "success") {
                const { proyectosModalidad } = data;
                dispatch(onLoadingProyectosModalidad(proyectosModalidad));
            } else {
                dispatch(onLoadingErrores(data.msg));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadingProyectosOds = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/total/proyectos/ods");
            if (data.status === "success") {
                const { proyectosOds } = data;
                dispatch(onLoadingProyectosOds(proyectosOds));
            } else {
                dispatch(onLoadingErrores(data.msg));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadingProyectosTipos = async () => {
        try {
            const { data } = await gricApi.get("/total/proyectos/tipos");
            if (data.status === "success") {
                const { proyectosTipos } = data;
                dispatch(onLoadingProyectosTipos(proyectosTipos));
            } else {
                dispatch(onLoadingErrores(data.msg));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadingMontos = async () => {
        try {
            const { data } = await gricApi.get("/total/proyectos/montos");
            const { montos } = data;
            dispatch(onLoadingTotalMontos(montos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.msg
                    ? error.response.data.errores
                    : Object.values(error.response.data.errores),
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearDashboard = () => {
        dispatch(onClearDashboard());
    }

    return {
        isLoading,
        totalOrganizaciones,
        totalProyectos,
        totalProyectosModalidades,
        totalProyectosOds,
        totalProyectosTipos,
        totalMontos,
        errores,

        startLoadingTotalOrganizaciones,
        startLoadingTotalProyectos,
        startLoadingProyectosModalidad,
        startLoadingProyectosOds,
        startLoadingProyectosTipos,
        startLoadingMontos,
        startClearDashboard
    };
};
