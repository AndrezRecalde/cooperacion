import { useDispatch, useSelector } from "react-redux";
import { onClearTiposCoop, onDeleteTipoCooperacion, onLoading, onTiposCooperacion } from "../../store/admin/tipo_cooperacion/tipoCooperacionSlice";
import { onUpdateTipoCooperacion } from "../../store/admin/tipo_cooperacion/tipoCooperacionSlice";
import { onAddTipoCooperacion } from "../../store/admin/tipo_cooperacion/tipoCooperacionSlice";
import { onSetActivateTipoCoop } from "../../store/admin/tipo_cooperacion/tipoCooperacionSlice";
import Swal from "sweetalert2";
import gricApi from "../../api/gricApi";



export const useTipoCoopStore = () => {
    const { isLoading, tiposCopperaciones, activateTipoCoop, errores } = useSelector(
        (state) => state.tipoCooperacion
    );
    const dispatch = useDispatch();

    const starLoadTiposCoopActivos = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/cooperaciones/activas");
            const { cooperaciones } = data;
            dispatch(onTiposCooperacion(cooperaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const starLoadTiposCoopAdmin = async() => {
        try {
            const { data} = await gricApi.get("/admin/cooperaciones");
            const { cooperaciones } = data;
            dispatch(onTiposCooperacion(cooperaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startAddTipoCoop = async(tipoCoop) => {
        try {
            if(tipoCoop.id){
                const { data } = await gricApi.put(`/admin/update/cooperacion/${tipoCoop.id}`, tipoCoop);
                dispatch(onUpdateTipoCooperacion({...tipoCoop}));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                starLoadTiposCoopAdmin();
                return;
            }
            const { data } = await gricApi.post("/admin/create/cooperacion", tipoCoop);
            dispatch(onAddTipoCooperacion({ ...tipoCoop }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1200,
            });
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

    const startDeleteTipoCoop = async(tipoCoop) => {
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
                        `/admin/delete/cooperacion/${tipoCoop.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteTipoCooperacion(tipoCoop));
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
    }

    const setActivateTipoCoop = (tipoCoop) => {
        dispatch(onSetActivateTipoCoop({ ... tipoCoop }));
    }

    const setClearActivateTipoCoop = () => {
        dispatch(onSetActivateTipoCoop(null));
    }

    const startClearTiposCoop = () => {
        dispatch(onClearTiposCoop());
    }
    return {
        isLoading,
        tiposCopperaciones,
        activateTipoCoop,
        errores,

        starLoadTiposCoopActivos,
        startClearTiposCoop,
        starLoadTiposCoopAdmin,
        startAddTipoCoop,
        startDeleteTipoCoop,
        setActivateTipoCoop,
        setClearActivateTipoCoop
    };
};
