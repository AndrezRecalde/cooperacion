import { useDispatch, useSelector } from "react-redux"
import { onCloseModalInternacional, onOpenModalInternacional } from "../../../store/admin/referencia/internacional/uiInternacionalSlice";

export const useUiInternacional = () => {

 const { isOpenModalInternacional } = useSelector(state => state.uiInternacional);
 const dispatch = useDispatch();

 const modalActionRefInter = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalInternacional());
    }else {
        dispatch(onCloseModalInternacional());
    }
 }

  return {
    isOpenModalInternacional,

    modalActionRefInter
  }
}
