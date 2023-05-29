import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddProyectos,
    onClearGraficos,
    onClearMontos,
    onClearProyectos,
    onClearTotales,
    onErrores,
    onLoading,
    onProyectos,
    onSetActivateEstado,
    onSetActivateProyecto,
    onSetGraficoProyectosOds,
    onSetGraficoProyectosTipos,
    onSetMontoEjecutado,
    onSetTotalProyectos,
    onUpdateProyecto,
} from "../../store/admin/proyecto/proyectoSlice";
import Swal from "sweetalert2";
import { onDeleteProyecto } from "../../store/admin/proyecto/proyectoSlice";

export const useProyectoStore = () => {
    const {
        isLoading,
        proyectos,
        activateProyecto,
        activateEstado,
        totalProyectos,
        totalProyectosActivos,
        montoEjecutado,
        graficoProyectosOds,
        graficoProyectosTipos,
        errores,
    } = useSelector((state) => state.proyecto);
    const dispatch = useDispatch();

    const startLoadProyectosAdmin = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/admin/proyectos");
            const { proyectos } = data;
            dispatch(onProyectos(proyectos));
        } catch (error) {
            //console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadProyectosActivos = async () => {
        try {
            const { data } = await gricApi.get("/proyectos/activos");
            const { proyectos } = data;
            dispatch(onProyectos(proyectos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddProyectos = async (proyecto) => {
        try {
            if (proyecto.id) {
                const { data } = await gricApi.put(
                    `/admin/update/proyecto/${proyecto.id}`,
                    proyecto
                );
                dispatch(onUpdateProyecto({ ...proyecto }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadProyectosAdmin();
                return;
            }
            const { data } = await gricApi.post("/create/proyecto", proyecto);
            dispatch(onAddProyectos({ ...proyecto }));
            Swal.fire({
                icon: "success",
                title: "Solicitud de proyecto envíada correctamente",
                showConfirmButton: false,
                timer: 1200,
            });
            startLoadProyectosAdmin();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startUpdateActivo = async (proyecto) => {
        try {
            const { data } = await gricApi.put(
                `/admin/update/proyecto/activo/${proyecto.id}`,
                proyecto
            );
            dispatch(onUpdateProyecto({ ...proyecto }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadProyectosAdmin();
            setClearActivateEstado();
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: error.response.data ? error.response.data.msg : error,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    const startShowForEdit = async ({ id }) => {
        try {
            const { data } = await gricApi.get(
                `/admin/show/edit/proyecto/${id}`
            );
            const { proyecto } = data;
            dispatch(onSetActivateProyecto({ ...proyecto }));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDelete = async (proyecto) => {
        Swal.fire({
            icon: "warning",
            title: "Estas seguro de eliminar?",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await gricApi.delete(
                        `/admin/delete/proyecto/${proyecto.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteProyecto(proyecto));
                    //startLoadProyectosAdmin();
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

    const setTotalProyectos = async () => {
        try {
            const { data } = await gricApi.get("/total/proyectos");

            if(data.msg){
                dispatch(onErrores(data.msg));
            } else {
                const { totalProyectos } = data;
                dispatch(onSetTotalProyectos(totalProyectos));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setMontoEjecutado = async () => {
        try {
            const { data } = await gricApi.get("/proyectos/monto");
            const { montoEjecutado } = data;
            dispatch(onSetMontoEjecutado(montoEjecutado));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setGraficoProyectosOds = async () => {
        try {
            const { data } = await gricApi.get("/grafico/proyectos/ods");

            if (data.msg) {
                dispatch(onErrores(data.msg));
            } else {
                const { proyectosOds } = data;
                dispatch(onSetGraficoProyectosOds(proyectosOds));
            }
        } catch (error) {
            //console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setGraficoProyectosTipos = async () => {
        try {
            const { data } = await gricApi.get("/grafico/proyectos/tipos");

            if (data.msg) {
                dispatch(onErrores(data.msg));
            } else {
                const { proyectosTipos } = data;
                dispatch(onSetGraficoProyectosTipos(proyectosTipos));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivateProyecto = (proyecto) => {
        dispatch(onSetActivateProyecto({ ...proyecto }));
    };

    const setActivateEstado = (proyecto) => {
        dispatch(onSetActivateEstado({ ...proyecto }));
    }

    const setClearActivateProyecto = () => {
        dispatch(onSetActivateProyecto(null));
    };

    const setClearActivateEstado = () => {
        dispatch(onSetActivateEstado(null));
    }

    const startClearProyectos = () => {
        dispatch(onClearProyectos());
    };

    const startClearTotales = () => {
        dispatch(onClearTotales());
    };

    const startClearMontos = () => {
        dispatch(onClearMontos());
    };

    const startClearGraficos = () => {
        dispatch(onClearGraficos());
    };

    const fichaProyecto = async (id) => {
        try {
            const response = await gricApi.post(
                "/admin/pdf/proyecto",
                { id },

                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" })
            );
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
        isLoading,
        proyectos,
        totalProyectos,
        totalProyectosActivos,
        montoEjecutado,
        graficoProyectosOds,
        graficoProyectosTipos,
        activateProyecto,
        activateEstado,
        errores,

        startLoadProyectosAdmin,
        startLoadProyectosActivos,
        startAddProyectos,
        startClearProyectos,
        startUpdateActivo,
        setTotalProyectos,
        setActivateProyecto,
        setActivateEstado,
        setClearActivateProyecto,
        setClearActivateEstado,
        startShowForEdit,
        startClearTotales,
        setMontoEjecutado,
        startClearMontos,
        startDelete,
        setGraficoProyectosOds,
        setGraficoProyectosTipos,
        startClearGraficos,
        fichaProyecto,
    };
};
