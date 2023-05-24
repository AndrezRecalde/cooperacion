import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onClearInstituciones, onLoadInstituciones } from "../../store/admin/institucion/institucionSlice";
import Swal from "sweetalert2";

export const useInstitucionStore = () => {
    const { instituciones } = useSelector((state) => state.institucion);
    const dispatch = useDispatch();

    const startLoadInstituciones = async () => {
        try {
            const { data } = await gricApi.get("/instituciones");
            const { instituciones } = data;
            dispatch(onLoadInstituciones(instituciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const clearInstituciones = () => {
        dispatch(onClearInstituciones());
    }

    return {
        instituciones,

        startLoadInstituciones,
        clearInstituciones
    };
};
