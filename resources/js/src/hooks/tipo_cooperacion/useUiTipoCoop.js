import { useDispatch, useSelector } from "react-redux"
import { onCloseModalTipoCoop, onOpenModalTipoCoop } from "../../store/admin/tipo_cooperacion/uiTipoCoopSlice";

export const useUiTipoCoop = () => {

  const { isOpenModalTipoCoop } = useSelector(state => state.uiTipoCoop);
  const dispatch = useDispatch();

  const modalActionTipoCoop = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalTipoCoop());
    }else {
        dispatch(onCloseModalTipoCoop());
    }
  }

  return {
    isOpenModalTipoCoop,

    modalActionTipoCoop
  }
}
