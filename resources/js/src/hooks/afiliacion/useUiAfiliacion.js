import { useDispatch, useSelector } from "react-redux"
import { onCloseModalAfiActivo, onOpenModalAfiActivo } from "../../store/admin/afiliacion/uiAfiliacionSlice";

export const useUiAfiliacion = () => {

   const { isOpenModalAfiActivo } = useSelector(state => state.uiAfiliacion);
   const dispatch = useDispatch();

   const modalActivateAfiliacion = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalAfiActivo());
    }else{
        dispatch(onCloseModalAfiActivo());
    }
   }


  return {
    isOpenModalAfiActivo,

    modalActivateAfiliacion
  }
}
