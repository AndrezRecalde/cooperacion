import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../../api/gricApi";
import {
    onAddReferencia,
    onReferencias,
    onSetActivateReferencia,
    onUpdateReferencia,
} from "../../../store/admin/referencia/internacional/internacionalSlice";
import Swal from "sweetalert2";

export const useInternacionalStore = () => {
    const { isLoading, referencias, activateReferencia, errores } = useSelector(
        (state) => state.internacional
    );

    const dispatch = useDispatch();

    const startLoadRefInter = async () => {
        try {
            const { data } = await gricApi.get(
                "/admin/referencias/internacionales"
            );
            const { referencias } = data;
            dispatch(onReferencias(referencias));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddRefInter = async (referencia) => {
        try {
            if (referencia.id) {
                const { data } = await gricApi.put(
                    `/admin/update/referencia/internacional/${referencia.id}`,
                    referencia
                );
                dispatch(onUpdateReferencia({ ...referencia }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadRefInter();
                return;
            }
            const { data } = await gricApi.post(
                "/admin/create/referencia/internacional",
                referencia
            );
            dispatch(onAddReferencia({ ...referencia }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1200,
            });
            startLoadRefInter();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivateRefInter = (referencia) => {
        dispatch(onSetActivateReferencia({ ...referencia }));
    };

    const setClearActivateRefInter = () => {
        dispatch(onSetActivateReferencia(null));
    };

    return {
        isLoading,
        referencias,
        activateReferencia,
        errores,

        startLoadRefInter,
        startAddRefInter,
        setActivateRefInter,
        setClearActivateRefInter,
    };
};
