import { useDispatch, useSelector } from "react-redux"
import gricApi from "../../api/gricApi";
import { onClearObjetivos, onObjetivos } from "../../store/admin/ods/odsSlice";
import Swal from "sweetalert2";

export const useOdsStore = () => {
  const { objetivos, activateObjetivo, errores } = useSelector(state => state.ods)
  const dispatch = useDispatch();

  const starLoadObjetivos = async () => {
    try {
        const { data } = await gricApi.get("/odsostenibles");
        const { odsostenibles } = data;
        dispatch(onObjetivos(odsostenibles));
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response ? error.response.data.msg : error,
            confirmButtonColor: "#c81d11",
        });
    }
  }

  const startClearObjetivos = () => {
    dispatch(onClearObjetivos());
  }

  return {
    objetivos,
    activateObjetivo,
    errores,

    starLoadObjetivos,
    startClearObjetivos
  }
}
