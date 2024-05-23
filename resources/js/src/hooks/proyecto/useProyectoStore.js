import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddProyectos,
    onClearProyectos,
    onLoading,
    onProyectos,
    onSetActivateProyecto,
    onUpdateProyecto,
    onDeleteProyecto,
} from "../../store/admin/proyecto/proyectoSlice";
import Swal from "sweetalert2";

export const useProyectoStore = () => {
    const {
        isLoading,
        proyectos,
        activateProyecto,
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
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
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
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
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
                icon: "info",
                iconColor: "#008080",
                title: "Proyecto Creado",
                text: data.msg,
                showConfirmButton: true,
            });
            startLoadProyectosAdmin();
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
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
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
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
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteProyecto = async (proyecto) => {
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
                        text: error.response.data.msg
                            ? error.response.data.msg
                            : error.response.data.errores
                            ? Object.values(error.response.data.errores)
                            : error.message
                            ? error.message
                            : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const setActivateProyecto = (proyecto) => {
        dispatch(onSetActivateProyecto({ ...proyecto }));
    };

    const setClearActivateProyecto = () => {
        dispatch(onSetActivateProyecto(null));
    };

    const startClearProyectos = () => {
        dispatch(onClearProyectos());
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
            //console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    return {
        isLoading,
        proyectos,
        activateProyecto,
        errores,

        startLoadProyectosAdmin,
        startLoadProyectosActivos,
        startAddProyectos,
        startClearProyectos,
        startUpdateActivo,
        setActivateProyecto,
        setClearActivateProyecto,
        startShowForEdit,
        startDeleteProyecto,
        fichaProyecto,
    };
};
