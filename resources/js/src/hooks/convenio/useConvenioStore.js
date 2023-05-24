import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onClearConvenios, onLoadConvenios } from "../../store/admin/convenio/convenioSlice";
import Swal from "sweetalert2";

export const useConvenioStore = () => {
    const { convenios } = useSelector((state) => state.convenio);

    const dispatch = useDispatch();

    const startLoadConvenios = async () => {
        try {
            const { data } = await gricApi.get("/convenios");
            const { convenios } = data;
            dispatch(onLoadConvenios(convenios));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startClearConvenios = () => {
        dispatch(onClearConvenios());
    }

    return {
        convenios,

        startLoadConvenios,
        startClearConvenios
    };
};
