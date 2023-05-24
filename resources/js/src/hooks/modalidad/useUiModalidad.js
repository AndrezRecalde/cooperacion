import { useDispatch, useSelector } from "react-redux"
import { onCloseModalModalidad, onOpenModalModalidad } from "../../store/admin/modalidad/uiModalidadSlice";

export const useUiModalidad = () => {

  const { isOpenModalidad } = useSelector(state => state.uiModalidad);

  const dispatch = useDispatch();

  const modalActionModalidad = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalModalidad());
    }else {
        dispatch(onCloseModalModalidad());
    }
  }

  return {
    isOpenModalidad,

    modalActionModalidad
  }
}
