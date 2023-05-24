import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalProyecto,
    onCloseModalProyectoActivo,
    onCloseModalProyectoDelete,
    onOpenModalProyecto,
    onOpenModalProyectoActivo,
    onOpenModalProyectoDelete,
} from "../../store/admin/proyecto/uiProyecto";

export const useUiProyecto = () => {
    const { isOpenModalProyecto, isOpenModalProyectoActivo, isOpenModalDeleteProyecto } = useSelector(
        (state) => state.uiProyecto
    );

    const dispatch = useDispatch();

    const modalActionProyecto = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalProyecto());
        } else {
            dispatch(onCloseModalProyecto());
        }
    };

    const modalActionActivo = (behavior) => {
        if(behavior === 1) {
            dispatch(onOpenModalProyectoActivo());
        } else {
            dispatch(onCloseModalProyectoActivo());
        }
    }

    const modalActionDelete = (behavior) => {
        if(behavior === 1) {
            dispatch(onOpenModalProyectoDelete());
        } else {
            dispatch(onCloseModalProyectoDelete());
        }
    }

    return {
        isOpenModalProyecto,
        isOpenModalProyectoActivo,
        isOpenModalDeleteProyecto,

        modalActionProyecto,
        modalActionActivo,
        modalActionDelete
    };
};
