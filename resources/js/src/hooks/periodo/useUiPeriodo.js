import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalPeriodo,
    onOpenModalPeriodo,
} from "../../store/admin/periodo/uiPeriodoSlice";

export const useUiPeriodo = () => {
    const { isOpenModalPeriodo } = useSelector((state) => state.uiPeriodo);

    const dispatch = useDispatch();

    const modalActionPeriodo = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalPeriodo());
        } else {
            dispatch(onCloseModalPeriodo());
        }
    };

    return {
        isOpenModalPeriodo,

        modalActionPeriodo,
    };
};
