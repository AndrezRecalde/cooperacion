import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalTipo,
    onOpenModalTipo,
} from "../../store/admin/tipos/uiTipoSlice";

export const useUiTipo = () => {
    const { isOpenModalTipo } = useSelector((state) => state.uiTipo);
    const dispatch = useDispatch();

    const modalActionTipo = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalTipo());
        } else {
            dispatch(onCloseModalTipo());
        }
    };

    return {
        isOpenModalTipo,

        modalActionTipo
    };
};
