import { useDispatch, useSelector } from "react-redux"
import gricApi from "../../api/gricApi";
import { onLoadGruposAtencion } from "../../store/admin/grupo_atencion/grupoAtencionSlice";
import Swal from "sweetalert2";

export const useGrupoAtencionStore = () => {

  const { grupos_atencion } = useSelector(state => state.grupoAtencion);

  const dispatch = useDispatch();

  const startLoadGruposAtencion = async () => {
    try {
        const { data } = await gricApi.get("/grupos/atencion");
        const { grupos_atencion } = data;
        dispatch(onLoadGruposAtencion(grupos_atencion));
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

  return {
    grupos_atencion,

    startLoadGruposAtencion
  }
}
