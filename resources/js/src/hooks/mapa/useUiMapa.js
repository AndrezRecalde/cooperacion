import { useDispatch, useSelector } from "react-redux";
import {
    onCloseDrawerMenu,
    onCloseDrawerOrg,
    onCloseDrawerProyectos,
    onCloseModalChart,
    onCloseModalInformation,
    onCloseModalMarker,
    onOpenDrawerMenu,
    onOpenDrawerOrg,
    onOpenDrawerProyectos,
    onOpenModalChart,
    onOpenModalInformation,
    onOpenModalMarker,
} from "../../store/mapa/ui/uiMapaSlice";

export const useUiMapa = () => {
    const { isOpenDrawerMenu, isOpenDrawerOrg, isOpenModalMarker, isOpenDrawerProyectos, isOpenModalInformation, isOpenModalChart } =
        useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const drawerMenu = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenDrawerMenu());
        } else if (behavior === 0) {
            dispatch(onCloseDrawerMenu());
        }
    };

    const drawerOrg = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenDrawerOrg());
        } else if (behavior === 0) {
            dispatch(onCloseDrawerOrg());
        }
    };

    const openModalMarker = (behavior) => {
        if(behavior === 1) {
            dispatch(onOpenModalMarker());
        }else {
            dispatch(onCloseModalMarker());
        }
    }

    const drawerActionProyectos = (behavior) => {
        if(behavior === 1){
            dispatch(onOpenDrawerProyectos());
        } else {
            dispatch(onCloseDrawerProyectos());
        }
    }

    const modalActionInformation = (behavior) => {
        if(behavior){
            dispatch(onOpenModalInformation());
        } else {
            dispatch(onCloseModalInformation());
        }
    }

    const modalActionChart = (behavior) => {
        if(behavior) {
            dispatch(onOpenModalChart());
        } else {
            dispatch(onCloseModalChart());
        }
    }


    return {
        isOpenDrawerMenu,
        isOpenDrawerOrg,
        isOpenModalMarker,
        isOpenDrawerProyectos,
        isOpenModalInformation,
        isOpenModalChart,

        drawerMenu,
        drawerOrg,
        openModalMarker,
        drawerActionProyectos,
        modalActionInformation,
        modalActionChart
    };
};
