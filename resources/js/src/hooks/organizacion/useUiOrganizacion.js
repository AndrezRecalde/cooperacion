import { useDispatch, useSelector } from "react-redux"
import { onCloseModalOrg, onCloseModalOrgActivo, onCloseModalShowOrg, onOpenModalOrg, onOpenModalOrgActivo, onOpenModalShowOrg } from "../../store/admin/organizacion/uiOrganizacionSlice";

export const useUiOrganizacion = () => {
  const { isOpenModalAddOrg, isOpenModalShowOrg, isOpenModalOrgActivo } = useSelector(state => state.uiOrganizacion);
  const dispatch = useDispatch();

  const modalActionOrganizacion = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalOrg())
    }else {
        dispatch(onCloseModalOrg());
    }
  }

  const modalShowOrganizacion = (behavior) => {
    if(behavior === 1){
        dispatch(onOpenModalShowOrg());
    }else {
        dispatch(onCloseModalShowOrg());
    }
  }

  const modalActivateOrg = (behavior) => {
    if(behavior === 1) {
        dispatch(onOpenModalOrgActivo());
    } else {
        dispatch(onCloseModalOrgActivo());
    }
  }

  return {
    isOpenModalAddOrg,
    isOpenModalShowOrg,
    isOpenModalOrgActivo,

    modalActionOrganizacion,
    modalShowOrganizacion,
    modalActivateOrg
  }
}
