import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalEliminarOrg,
    onCloseModalOrg,
    onCloseModalOrgActivo,
    onCloseModalShowOrg,
    onOpenModalEliminarOrg,
    onOpenModalOrg,
    onOpenModalOrgActivo,
    onOpenModalShowOrg,
} from "../../store/admin/organizacion/uiOrganizacionSlice";

export const useUiOrganizacion = () => {
    const {
        isOpenModalAddOrg,
        isOpenModalShowOrg,
        isOpenModalOrgActivo,
        isOpenModalEliminarOrg,
    } = useSelector((state) => state.uiOrganizacion);
    const dispatch = useDispatch();

    const modalActionOrganizacion = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalOrg());
        } else {
            dispatch(onCloseModalOrg());
        }
    };

    const modalShowOrganizacion = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalShowOrg());
        } else {
            dispatch(onCloseModalShowOrg());
        }
    };

    const modalActivateOrg = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalOrgActivo());
        } else {
            dispatch(onCloseModalOrgActivo());
        }
    };

    const modalActionEliminarOrg = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalEliminarOrg());
        } else {
            dispatch(onCloseModalEliminarOrg());
        }
    };

    return {
        isOpenModalAddOrg,
        isOpenModalShowOrg,
        isOpenModalOrgActivo,
        isOpenModalEliminarOrg,

        modalActionOrganizacion,
        modalShowOrganizacion,
        modalActivateOrg,
        modalActionEliminarOrg
    };
};
