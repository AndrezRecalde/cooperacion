import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onClearEstados, onEstados } from "../../store/admin/estados/estadoSlice";
import Swal from "sweetalert2";

export const useEstadoStore = () => {
    const { estados, activateEstado, errores } = useSelector(
        (state) => state.estado
    );
    const dispatch = useDispatch();

    const startLoadEstadosActivos = async () => {
        try {
            const { data } = await gricApi.get("/estados/activos");
            const { estados } = data;
            dispatch(onEstados(estados));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startClearEstados = () => {
        dispatch(onClearEstados());
    }

    return {
        estados,
        activateEstado,
        errores,

        startLoadEstadosActivos,
        startClearEstados
    };
};
