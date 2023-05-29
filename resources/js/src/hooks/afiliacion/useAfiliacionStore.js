import { useDispatch, useSelector } from "react-redux";
import {
    onAddAfiliacion,
    onAfiliaciones,
    onClearAfiliaciones,
    onErrores,
    onLoading,
    onRestartSend,
    onSending,
    onSetActivateAfiliacion,
    onUpdateAfiliaciones,
} from "../../store/admin/afiliacion/afiliacionSlice";
import gricApi from "../../api/gricApi";
import Swal from "sweetalert2";

export const useAfiliacionStore = () => {
    const { isLoading, isSend, afiliaciones, activeAfiliacion, errores } =
        useSelector((state) => state.afiliacion);

    const dispatch = useDispatch();

    const startLoadAfiliaciones = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/afiliaciones");
            const { afiliaciones } = data;
            dispatch(onAfiliaciones(afiliaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const starAddAfiliacion = async (afiliacion) => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.post(
                "/create/afiliacion",
                afiliacion,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(onAddAfiliacion({ ...afiliacion }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            dispatch(onSending());
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startUpdateContactado = async (afiliacion) => {
        try {
            const { data } = await gricApi.put(
                `/update/contactado/afiliacion/${afiliacion.id}`,
                afiliacion
            );
            dispatch(onUpdateAfiliaciones({ ...afiliacion }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadAfiliaciones();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startRestartSend = () => {
        dispatch(onRestartSend());
    };

    const setActivateAfiliacion = (afiliacion) => {
        dispatch(onSetActivateAfiliacion({ ...afiliacion }));
    };

    const startClearAfiliaciones = () => {
        dispatch(onClearAfiliaciones());
    };

    const archivoAfiliacion = async (id) => {
        try {
            const response = await gricApi.post(
                "/admin/archivos/afiliaciones",
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

    const startDeleteAfiliacion = (id) => {
        Swal.fire({
            icon: "warning",
            title: '¿Estas seguro de eliminar esta afiliación?',
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await gricApi.delete(
                        `/delete/afiliacion/${id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    startLoadAfiliaciones();
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

    return {
        isLoading,
        isSend,
        afiliaciones,
        activeAfiliacion,
        errores,

        startLoadAfiliaciones,
        starAddAfiliacion,
        startUpdateContactado,
        startRestartSend,
        setActivateAfiliacion,
        startClearAfiliaciones,
        archivoAfiliacion,
        startDeleteAfiliacion
    };
};
