import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddTipo,
    onClearTipos,
    onSetActivateTipo,
    onTipos,
    onUpdateTipo,
} from "../../store/admin/tipos/tipoSlice";
import Swal from "sweetalert2";

export const useTipoStore = () => {
    const { isLoading, tipos, activateTipo, errores } = useSelector(
        (state) => state.tipo
    );
    const dispatch = useDispatch();

    const startLoadTipos = async () => {
        try {
            const { data } = await gricApi.get("tipos/organizacion");
            const { tipos } = data;
            dispatch(onTipos(tipos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddTipo = async (tipo) => {
        try {
            if (tipo.id) {
                const { data } = await gricApi.put(
                    `/admin/update/tipo/${tipo.id}`,
                    tipo
                );
                dispatch(onUpdateTipo({ ...tipo }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadTipos();
                return;
            }
            const { data } = await gricApi.post("/admin/create/tipo", tipo);
            dispatch(onAddTipo({ ...tipo }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1200,
            });
            startLoadTipos();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startDeleteTipo = async (tipo) => {
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
                        `/admin/delete/tipo/${tipo.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteTipo(tipo));
                    starLoadTiposCoopAdmin();
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

    const setActivateTipo = (tipo) => {
        dispatch(onSetActivateTipo({ ...tipo }));
    };

    const setClearActivateTipo = () => {
        dispatch(onSetActivateTipo(null));
    };

    const startClearTipos = () => {
        dispatch(onClearTipos());
    };

    return {
        isLoading,
        tipos,
        activateTipo,
        errores,

        startLoadTipos,
        startAddTipo,
        setActivateTipo,
        startDeleteTipo,
        setClearActivateTipo,
        startClearTipos,
    };
};
